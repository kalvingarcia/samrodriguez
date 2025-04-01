from flask import Flask, request, Response
server = Flask(__name__)

@server.route("/auth", methods['PUT'])
def AUTH():
    if request.method == 'PUT':
        return Response() # return a token for the session
    pass

# make a blueprint for the media handling API
from blueprints.media import media
server.register_blueprint(media)

# make a blueprint for the MongoDB handling API
from blueprints.database import database
server.register_blueprint(database)