from flask import Blueprint, request, Response
media = Blueprint('media', __name__)

@media.route('/media')
def GET_MEDIA_LIST_BY_PROJECT():
    project = request.args.get('project')
    pass

@media.route('/media/upload')
def UPLOAD_MEDIA():
    pass

# @media.route('/media/update')
# def UPDATE_MEDIA():
#     project = request.args.get('project')
#     file_name = request.args.get('name')
#     pass

@media.route('/media/delete')
def DELETE_MEDIA():
    project = request.args.get('project')
    file_name = request.args.get('name')
    pass