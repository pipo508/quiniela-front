# quiniela_app/models.py
# Define los modelos de la base de datos con SQLAlchemy.

from . import db
from datetime import datetime

class Solicitud(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_quiniela = db.Column(db.String(100), nullable=False)
    nombre_solicitante = db.Column(db.String(100), nullable=False)
    email_solicitante = db.Column(db.String(120), nullable=False)
    estado = db.Column(db.String(20), nullable=False, default='pendiente') # pendiente, aprobada, rechazada

    def __repr__(self):
        return f'<Solicitud {self.nombre_quiniela}>'

class Quiniela(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False, unique=True)
    fecha_creacion = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    activa = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<Quiniela {self.nombre}>'
