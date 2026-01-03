import os
from flask import Blueprint, request, jsonify, session, send_from_directory
from werkzeug.utils import secure_filename
from models import db
from models.document import Document
from utils.decorators import login_required

# Define a secure upload folder. This should be configured properly.
# For this example, it's a directory named 'uploads' in the instance folder.
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif'}

document_bp = Blueprint('document', __name__, url_prefix='/api/documents')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@document_bp.route('/upload', methods=['POST'])
@login_required
def upload_document():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        
        # Ensure the upload folder exists
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
            
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        user_id = session['user_id']
        new_document = Document(filename=filename, path=file_path, user_id=user_id)
        db.session.add(new_document)
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully', 'document': new_document.to_dict()}), 201
    
    return jsonify({'error': 'File type not allowed'}), 400

@document_bp.route('/', methods=['GET'])
@login_required
def get_documents():
    user_id = session['user_id']
    documents = Document.query.filter_by(user_id=user_id).order_by(Document.uploaded_at.desc()).all()
    return jsonify({'documents': [doc.to_dict() for doc in documents]})

@document_bp.route('/<int:document_id>', methods=['GET'])
@login_required
def download_document(document_id):
    user_id = session['user_id']
    document = Document.query.get_or_404(document_id)

    if document.user_id != user_id:
        return jsonify({'error': 'Access forbidden'}), 403

    return send_from_directory(os.path.dirname(document.path), os.path.basename(document.path), as_attachment=True)

@document_bp.route('/<int:document_id>', methods=['DELETE'])
@login_required
def delete_document(document_id):
    user_id = session['user_id']
    document = Document.query.get_or_404(document_id)

    if document.user_id != user_id:
        return jsonify({'error': 'Access forbidden'}), 403
    
    try:
        os.remove(document.path)
    except OSError as e:
        # Log the error, but don't prevent DB deletion if file is already gone
        print(f"Error deleting file from filesystem: {e}")

    db.session.delete(document)
    db.session.commit()
    return jsonify({'message': 'Document deleted successfully'})
