"""
Feedback routes
Handles feedback submission and management
"""
from flask import Blueprint, request, jsonify, session
from models.feedback import Feedback
from models.user import User
from models import db

feedback_bp = Blueprint('feedback', __name__)

def require_auth(f):
    """Decorator to require authentication"""
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

def require_admin(f):
    """Decorator to require admin role"""
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401
        user = User.query.get(session['user_id'])
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated_function

@feedback_bp.route('/api/feedback', methods=['POST'])
@require_auth
def submit_feedback():
    """Submit user feedback"""
    try:
        data = request.json
        user_id = session.get('user_id')
        print(f"DEBUG: Submitting feedback for user {user_id}")
        
        if not data.get('subject') or not data.get('message'):
            return jsonify({'error': 'Subject and message are required'}), 400
        
        feedback = Feedback(
            user_id=user_id,
            subject=data['subject'],
            message=data['message'],
            status='pending'
        )
        
        db.session.add(feedback)
        db.session.commit()
        print(f"DEBUG: Feedback saved with ID: {feedback.id}")
        
        return jsonify({
            'message': 'Feedback submitted successfully',
            'feedback': feedback.to_dict()
        }), 201
        
    except Exception as e:
        print(f"DEBUG: Error submitting feedback: {str(e)}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@feedback_bp.route('/api/feedback', methods=['GET'])
@require_admin
def get_all_feedback():
    """Get all feedback (admin only)"""
    try:
        status_filter = request.args.get('status')
        print(f"DEBUG: Getting all feedback. Status filter: {status_filter}")
        
        query = Feedback.query
        if status_filter:
            query = query.filter_by(status=status_filter)
        
        feedbacks = query.order_by(Feedback.created_at.desc()).all()
        print(f"DEBUG: Found {len(feedbacks)} feedback items")
        
        return jsonify({
            'feedbacks': [f.to_dict() for f in feedbacks]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@feedback_bp.route('/api/feedback/<int:feedback_id>', methods=['PATCH'])
@require_admin
def update_feedback(feedback_id):
    """Update feedback status and notes (admin only)"""
    try:
        feedback = Feedback.query.get(feedback_id)
        if not feedback:
            return jsonify({'error': 'Feedback not found'}), 404
        
        data = request.json
        
        if 'status' in data:
            if data['status'] not in ['pending', 'reviewed', 'resolved']:
                return jsonify({'error': 'Invalid status'}), 400
            feedback.status = data['status']
        
        if 'admin_notes' in data:
            feedback.admin_notes = data['admin_notes']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Feedback updated successfully',
            'feedback': feedback.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@feedback_bp.route('/api/feedback/my', methods=['GET'])
@require_auth
def get_my_feedback():
    """Get current user's feedback submissions"""
    try:
        user_id = session.get('user_id')
        feedbacks = Feedback.query.filter_by(user_id=user_id).order_by(Feedback.created_at.desc()).all()
        
        return jsonify({
            'feedbacks': [f.to_dict() for f in feedbacks]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
