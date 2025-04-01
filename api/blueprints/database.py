from flask import Blueprint, request, Response
database = Blueprint('database', __name__)

@database.route('/project')
def GET_UPDATE_PROJECT_DATA():
    project = request.args.get('open')
    pass

@database.route('/project/upload')
def UPLOAD_PROJECT_DATA():
    pass

@database.route('/project/delete')
def GET_PROJECT_DATA():
    project = request.args.get('open')
    pass

