# quiniela_app/schemas.py
# Define los esquemas de Marshmallow para la validación y serialización de datos.

from . import ma
from .models import Quiniela, Solicitud

class QuinielaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Quiniela
        load_instance = True
        include_fk = True

class SolicitudSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Solicitud
        load_instance = True
        include_fk = True
