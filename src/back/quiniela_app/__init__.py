# quiniela_app/__init__.py
# Inicializa la aplicación Flask y registra los Blueprints.

from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS

# Inicializar extensiones
db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
jwt = JWTManager()
mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Configurar CORS para permitir peticiones desde cualquier origen a /api/*
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Inicializar extensiones con la app
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)

    # Registrar Blueprints (grupos de rutas)
    from quiniela_app.routes.public import bp_public
    app.register_blueprint(bp_public, url_prefix='/api/public')
    from quiniela_app.routes.admin import bp_admin
    app.register_blueprint(bp_admin, url_prefix='/api/admin')
    
    from quiniela_app.routes.auth import bp_auth
    app.register_blueprint(bp_auth, url_prefix='/api/auth')

    return app
