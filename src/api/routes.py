"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, send_file, send_from_directory
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash


from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
from datetime import timedelta
import os

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#la inicialización de JWTManager está en la carpeta app.py despues de la declaración del servidor Flask
# jwt = JWTManager()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Inicio de Sesion Successfully"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    try:
        #aqui obtenemos mediante el body los siguientes campos...
        fullname = request.json.get('fullname')
        email = request.json.get('email')
        password = request.json.get('password')
        username = request.json.get('username')
        

        #aqui verificamos si los campos esta vacios o tienes caracteres invalidos
        if not email or not password or not username or not fullname:
            return jsonify({"Error": "Email, password, username and fullname are required"}), 400
        
        #aqui verificamos la existencia del email en la base de datos, de no existi continua...
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"Error":"Email already exists."}), 409
        
        # password encriptada
        password_hash = generate_password_hash(password)

        #new user con password encrptada
        new_user = User(fullname=fullname, email=email, password=password_hash, username=username, is_active=True)
        db.session.add(new_user)
        db.session.commit()

        
        return jsonify({"message":"User created successfully", "user_create": new_user.serialize()}), 201
    except Exception as e:
        return jsonify({"Error": "Error in user creation:" + str(e)}), 500
    
@api.route('/login', methods=['POST'])
def get_token_login():
    try:
        #1ero chequeamos que en el body venga con la inf necesaria
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({"Error": "Email and Password are required"}), 400
        
        #buscamos el user con ese correo
        login_user = User.query.filter_by(email=request.json['email']).one()

        if not login_user:
            return jsonify({'Error': 'invalid email'}), 400
        
        # Obtener la contraseña desde la base de datos
        password_from_db = login_user.password

        # Verificar la contraseña
        true_or_false = check_password_hash(password_from_db, password)

        if true_or_false:
            expires = timedelta(days=1)
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({"access_token": access_token, "message": "Log In Successfully"}), 200
        else:
            return jsonify({"Error":"Invalid Password"}), 400
        
    except sqlalchemy.exc.SQLAlchemyError as e:
        # Manejar errores de la base de datos de manera específica
        return jsonify({"Error": "Database error", "message": str(e)}), 500
    except Exception as e:
        # Manejar otros errores internos del servidor
        return jsonify({"Error": "Internal Server Error", "message": str(e)}), 500


@api.route('/private')
@jwt_required() #Decorador para requerir autenticacion con jwt
def show_user():
    current_user_id = get_jwt_identity() #obtiene la id del user del token
    
    if current_user_id:
        users = User.query.all()
        user_list = []

        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email
            }
            user_list.append(user_dict)
        return jsonify(user_list), 200
    else:
        return jsonify({"Error": "Token invalid or not exits"}), 401
    

    """ #verificamos que el password sea correcto
        #password_from_db = login_user.password # si el login_user esta vacio, dara error y se va al except
        #true_or_false = bcrypt.check_password_hash(password_from_db, password)
        password_from_db = login_user.password
        hashed_password_hex = password_from_db
        hashed_password_bin = bytes.fromhex(hashed_password_hex[2:])

        true_or_false = check_password_hash(hashed_password_bin, password)
        
        if true_or_false:
            expires = timedelta(days=1)
            user_id = login_user.id
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({"access_token": access_token}), 200
        else:
            return {"error":"Clave incorrecta"}, 400
    except Exception as e:
        return jsonify({"error": "Error in user:" + str(e)}), 500 """