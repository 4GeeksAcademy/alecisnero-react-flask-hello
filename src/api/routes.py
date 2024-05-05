"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


""" @api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200 """

@api.route('/signup', methods=['POST'])
def get_users():
    try:
        #aqui obtenemos mediante el body los siguientes campos...
        email = request.json.get('email')
        password = request.json.get('password')
        username = request.json.get('username')
        fullname = request.json.get('fullname')

        #aqui verificamos si los campos esta vacios o tienes caracteres invalidos
        if not email or not password or not username or not fullname:
            return jsonify({"error": "Email, password, username and fullname are required"}), 400
        
        #aqui verificamos la existencia del email en la base de datos, de no existi continua...
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"Error":"Email already exists."}), 409
        
        # password encriptada
        password_hash = generate_password_hash(password).decode('utf-8')

        #new user con password encrptada
        new_user = User(email=email, password=password_hash, username=username, fullname=fullname)
        db.session.add(new_user)
        db.session.commit()

        ok_to_share = {
            "email": new_user.email,
            "username": new_user.username,
            "fullname": new_user.fullname,
            "id": new_user.id
        }
        return jsonify({"msg":"User created successfully", "user_create": ok_to_share}), 201
    except Exception as e:
        return jsonify({"error": "Error in user creation:" + str(e)}), 500