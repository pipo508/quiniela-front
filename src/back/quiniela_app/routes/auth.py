# quiniela_app/routes/auth.py
# Contiene el endpoint de login para administradores.

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

bp_auth = Blueprint('auth', __name__)

@bp_auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)

    # TODO: Usar variables de entorno y hashes en la vida real
    if username != 'admin' or password != 'password':
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)
