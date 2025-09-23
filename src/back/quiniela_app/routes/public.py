# quiniela_app/routes/public.py
# Contiene los endpoints públicos para los jugadores.

from flask import Blueprint, jsonify, request, current_app
from quiniela_app import db
from quiniela_app.models import Solicitud, Quiniela
from quiniela_app.schemas import SolicitudSchema, QuinielaSchema
from quiniela_app.services.email_service import send_email

bp_public = Blueprint('public', __name__)

solicitud_schema = SolicitudSchema()
quiniela_schema = QuinielaSchema()
quinielas_schema = QuinielaSchema(many=True)

@bp_public.route('/solicitudes', methods=['POST'])
def crear_solicitud():
    data = request.get_json()
    errors = solicitud_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    nueva_solicitud = Solicitud(
        nombre_quiniela=data['nombre_quiniela'],
        nombre_solicitante=data['nombre_solicitante'],
        email_solicitante=data['email_solicitante']
    )
    db.session.add(nueva_solicitud)
    db.session.commit()

    # Notificar al admin (opcional)
    # send_email('Nueva Solicitud de Quiniela', 
    #            sender=current_app.config['MAIL_USERNAME'], 
    #            recipients=['admin@example.com'], 
    #            body=f'Se ha recibido una nueva solicitud para crear la quiniela "{data["nombre_quiniela"]}".')

    return jsonify(solicitud_schema.dump(nueva_solicitud)), 201

@bp_public.route('/quinielas', methods=['GET'])
def get_quinielas():
    quinielas = Quiniela.query.filter_by(activa=True).all()
    return jsonify(quinielas_schema.dump(quinielas))

@bp_public.route('/quinielas/<int:id>', methods=['GET'])
def get_quiniela_by_id(id):
    quiniela = Quiniela.query.get_or_404(id)
    if not quiniela.activa:
        return jsonify({"mensaje": "Esta quiniela no está activa."}), 404
    return jsonify(quiniela_schema.dump(quiniela))

@bp_public.route('/apuestas/enviar-ticket', methods=['POST'])
def enviar_ticket():
    data = request.get_json()
    # Aquí iría la lógica para procesar la apuesta, guardarla en BBDD, etc.
    
    # Datos del email
    destinatario = data.get('email_destinatario')
    asunto = "Tu Ticket de Apuesta para la Quiniela"
    cuerpo = "Hola,\n\nAdjuntamos tu ticket de apuesta.\n\nMucha suerte!"

    if not destinatario:
        return jsonify({"mensaje": "El email del destinatario es requerido."} ), 400

    try:
        send_email(asunto, sender=current_app.config['MAIL_USERNAME'], recipients=[destinatario], body=cuerpo)
        return jsonify({"mensaje": "Ticket de apuesta enviado a tu correo electrónico."} )
    except Exception as e:
        # Loggear el error e
        return jsonify({"mensaje": "Error al enviar el correo."} ), 500
