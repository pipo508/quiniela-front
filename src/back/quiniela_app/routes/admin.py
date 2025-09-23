# quiniela_app/routes/admin.py
# Contiene los endpoints de administración (protegidos).

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from quiniela_app import db
from quiniela_app.models import Solicitud, Quiniela
from quiniela_app.schemas import SolicitudSchema, QuinielaSchema

bp_admin = Blueprint('admin', __name__)

solicitud_schema = SolicitudSchema()
solicitudes_schema = SolicitudSchema(many=True)
quiniela_schema = QuinielaSchema()
quinielas_schema = QuinielaSchema(many=True)

@bp_admin.route('/solicitudes', methods=['GET'])
@jwt_required()
def get_solicitudes():
    solicitudes = Solicitud.query.all()
    return jsonify(solicitudes_schema.dump(solicitudes))

@bp_admin.route('/solicitudes/<int:id>/aprobar', methods=['POST'])
@jwt_required()
def aprobar_solicitud(id):
    solicitud = Solicitud.query.get_or_404(id)
    if solicitud.estado != 'pendiente':
        return jsonify({"mensaje": "La solicitud ya ha sido procesada."}), 400

    # Crear nueva quiniela
    nueva_quiniela = Quiniela(nombre=solicitud.nombre_quiniela)
    db.session.add(nueva_quiniela)
    
    # Actualizar estado de la solicitud
    solicitud.estado = 'aprobada'
    db.session.commit()

    # Aquí se podría enviar un email de confirmación

    return jsonify({"mensaje": f"Solicitud {id} aprobada y quiniela '{nueva_quiniela.nombre}' creada.", "quiniela": quiniela_schema.dump(nueva_quiniela)}), 201

@bp_admin.route('/solicitudes/<int:id>/rechazar', methods=['POST'])
@jwt_required()
def rechazar_solicitud(id):
    solicitud = Solicitud.query.get_or_404(id)
    if solicitud.estado != 'pendiente':
        return jsonify({"mensaje": "La solicitud ya ha sido procesada."}), 400

    solicitud.estado = 'rechazada'
    db.session.commit()

    # Aquí se podría enviar un email de notificación

    return jsonify({"mensaje": f"Solicitud {id} rechazada."})

# CRUD Quinielas

@bp_admin.route('/quinielas', methods=['POST'])
@jwt_required()
def create_quiniela():
    data = request.get_json()
    errors = quiniela_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    
    nombre = data['nombre']
    if Quiniela.query.filter_by(nombre=nombre).first():
        return jsonify({"mensaje": f"La quiniela '{nombre}' ya existe."}), 400

    nueva_quiniela = Quiniela(nombre=nombre)
    db.session.add(nueva_quiniela)
    db.session.commit()
    return jsonify(quiniela_schema.dump(nueva_quiniela)), 201

@bp_admin.route('/quinielas', methods=['GET'])
@jwt_required()
def get_quinielas():
    quinielas = Quiniela.query.all()
    return jsonify(quinielas_schema.dump(quinielas))

@bp_admin.route('/quinielas/<int:id>', methods=['GET'])
@jwt_required()
def get_quiniela(id):
    quiniela = Quiniela.query.get_or_404(id)
    return jsonify(quiniela_schema.dump(quiniela))

@bp_admin.route('/quinielas/<int:id>', methods=['PUT'])
@jwt_required()
def update_quiniela(id):
    quiniela = Quiniela.query.get_or_404(id)
    data = request.get_json()
    errors = quiniela_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    quiniela.nombre = data.get('nombre', quiniela.nombre)
    quiniela.activa = data.get('activa', quiniela.activa)
    db.session.commit()
    return jsonify(quiniela_schema.dump(quiniela))

@bp_admin.route('/quinielas/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_quiniela(id):
    quiniela = Quiniela.query.get_or_404(id)
    db.session.delete(quiniela)
    db.session.commit()
    return jsonify({"mensaje": f"Quiniela con id {id} eliminada."})
