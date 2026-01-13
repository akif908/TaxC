"""
Consultant dashboard and management routes
"""
from flask import Blueprint, request, jsonify, session
from models import db
from models.user import User
from models.consultant import Consultant, ConsultationRequest, ConsultationMessage
from utils.decorators import consultant_required, login_required, admin_required
from datetime import datetime
from sqlalchemy import func

consultant_bp = Blueprint('consultant', __name__, url_prefix='/api/consultant')

@consultant_bp.route('/dashboard', methods=['GET'])
@consultant_required
def get_consultant_dashboard():
    """Get dashboard statistics for the consultant"""
    try:
        user_id = session['user_id']
        consultant = Consultant.query.filter_by(user_id=user_id).first()
        
        if not consultant:
            return jsonify({'error': 'Consultant profile not found'}), 404
            
        # Stats
        pending_requests = ConsultationRequest.query.filter_by(consultant_id=consultant.id, status='pending').count()
        active_consultations = ConsultationRequest.query.filter_by(consultant_id=consultant.id, status='accepted').count()
        completed_consultations = ConsultationRequest.query.filter_by(consultant_id=consultant.id, status='completed').count()
        
        # Monthly activity count (mocking for now based on total)
        total_activity = ConsultationRequest.query.filter_by(consultant_id=consultant.id).count()
        
        return jsonify({
            'stats': {
                'pending_requests': pending_requests,
                'active_consultations': active_consultations,
                'completed_consultations': completed_consultations,
                'total_activity': total_activity
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get dashboard stats: {str(e)}'}), 500

@consultant_bp.route('/requests', methods=['GET'])
@consultant_required
def get_requests():
    """Get all consultation requests for the consultant"""
    try:
        user_id = session['user_id']
        consultant = Consultant.query.filter_by(user_id=user_id).first()
        
        if not consultant:
            return jsonify({'error': 'Consultant profile not found'}), 404
            
        requests = ConsultationRequest.query.filter_by(consultant_id=consultant.id).order_by(ConsultationRequest.created_at.desc()).all()
        
        requests_data = []
        for req in requests:
            req_dict = req.to_dict()
            user = User.query.get(req.user_id)
            if user:
                req_dict['user_email'] = user.email
                # If there's a profile, add name; otherwise use email
                if user.profile and hasattr(user.profile, 'full_name'):
                    req_dict['user_name'] = user.profile.full_name
                else:
                    req_dict['user_name'] = user.email.split('@')[0]  # Fallback to email username
            requests_data.append(req_dict)
            
        return jsonify({'requests': requests_data}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get requests: {str(e)}'}), 500

@consultant_bp.route('/requests/<int:request_id>', methods=['PUT'])
@consultant_required
def update_request_status(request_id):
    """Update status of a consultation request (Accept/Reject/Complete)"""
    try:
        data = request.get_json()
        new_status = data.get('status')
        
        if new_status not in ['accepted', 'rejected', 'completed']:
            return jsonify({'error': 'Invalid status'}), 400
            
        req = ConsultationRequest.query.get(request_id)
        if not req:
            return jsonify({'error': 'Request not found'}), 404
            
        # Security: Ensure this request belongs to the consultant
        user_id = session['user_id']
        consultant = Consultant.query.filter_by(user_id=user_id).first()
        if req.consultant_id != consultant.id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        req.status = new_status
        db.session.commit()
        
        return jsonify({'message': f'Request status updated to {new_status}', 'request': req.to_dict()}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update request: {str(e)}'}), 500

@consultant_bp.route('/chat/<int:consultation_id>', methods=['GET'])
@login_required # Both user and consultant can access
def get_chat_messages(consultation_id):
    """Get chat history for a consultation"""
    try:
        req = ConsultationRequest.query.get(consultation_id)
        if not req:
            return jsonify({'error': 'Consultation not found'}), 404
            
        # Security: must be either the user or the consultant
        user_id = session['user_id']
        consultant = Consultant.query.filter_by(user_id=user_id).first()
        
        is_owner = (req.user_id == user_id)
        is_consultant = (consultant and req.consultant_id == consultant.id)
        
        if not (is_owner or is_consultant):
            return jsonify({'error': 'Unauthorized'}), 403
            
        messages = ConsultationMessage.query.filter_by(consultation_id=consultation_id).order_by(ConsultationMessage.timestamp.asc()).all()
        
        return jsonify({'messages': [m.to_dict() for m in messages]}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get messages: {str(e)}'}), 500

@consultant_bp.route('/chat/<int:consultation_id>', methods=['POST'])
@login_required
def send_message(consultation_id):
    """Send a message in a consultation"""
    try:
        data = request.get_json()
        text = data.get('message')
        
        if not text:
            return jsonify({'error': 'Message text required'}), 400
            
        req = ConsultationRequest.query.get(consultation_id)
        if not req:
            return jsonify({'error': 'Consultation not found'}), 404
            
        # Security
        user_id = session['user_id']
        consultant = Consultant.query.filter_by(user_id=user_id).first()
        is_owner = (req.user_id == user_id)
        is_consultant = (consultant and req.consultant_id == consultant.id)
        
        if not (is_owner or is_consultant):
            return jsonify({'error': 'Unauthorized'}), 403
            
        msg = ConsultationMessage(
            consultation_id=consultation_id,
            sender_id=user_id,
            message=text
        )
        
        db.session.add(msg)
        db.session.commit()
        
        return jsonify({'message': 'Message sent successfully', 'data': msg.to_dict()}), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to send message: {str(e)}'}), 500

@consultant_bp.route('/profile', methods=['GET'])
@consultant_required
def get_profile():
    """Get consultant profile information"""
    try:
        user_id = session['user_id']
        consultant = Consultant.query.filter_by(user_id=user_id).first()
        
        if not consultant:
            return jsonify({'error': 'Consultant profile not found'}), 404
            
        data = consultant.to_dict()
        user = User.query.get(user_id)
        data['email'] = user.email
        if user.profile and hasattr(user.profile, 'full_name'):
            data['full_name'] = user.profile.full_name
        else:
            data['full_name'] = user.email.split('@')[0]
            
        return jsonify({'profile': data}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get profile: {str(e)}'}), 500

@consultant_bp.route('/profile', methods=['PUT'])
@consultant_required
def update_profile():
    """Update consultant profile information"""
    try:
        user_id = session['user_id']
        consultant = Consultant.query.filter_by(user_id=user_id).first()
        
        if not consultant:
            return jsonify({'error': 'Consultant profile not found'}), 404
            
        data = request.get_json()
        
        if 'qualification' in data:
            consultant.qualification = data['qualification']
        if 'experience' in data:
            consultant.experience = data['experience']
        if 'is_available' in data:
            consultant.is_available = data['is_available']
        if 'bio' in data:
            consultant.bio = data['bio']
            
        db.session.commit()
        
        return jsonify({'message': 'Profile updated successfully', 'profile': consultant.to_dict()}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update profile: {str(e)}'}), 500

# Additional route for Users to list consultants
@consultant_bp.route('/list', methods=['GET'])
@login_required
def list_consultants():
    """List all available consultants for users"""
    try:
        consultants = Consultant.query.filter_by(is_available=True).all()
        
        data = []
        for c in consultants:
            c_dict = c.to_dict()
            user = User.query.get(c.user_id)
            if user:
                if user.profile and hasattr(user.profile, 'full_name'):
                    c_dict['full_name'] = user.profile.full_name
                else:
                    c_dict['full_name'] = user.email.split('@')[0]
            data.append(c_dict)
            
        return jsonify({'consultants': data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Additional route for Users to request consultation
@consultant_bp.route('/request', methods=['POST'])
@login_required
def request_consultation():
    """Users can request a consultation"""
    try:
        data = request.get_json()
        consultant_id = data.get('consultant_id')
        topic = data.get('topic')
        message = data.get('message')
        
        if not consultant_id:
            return jsonify({'error': 'consultant_id is required'}), 400
            
        user_id = session['user_id']
        
        req = ConsultationRequest(
            user_id=user_id,
            consultant_id=consultant_id,
            topic=topic,
            message=message
        )
        
        db.session.add(req)
        db.session.commit()
        
        return jsonify({'message': 'Consultation request sent', 'request': req.to_dict()}), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# User-side endpoint to get their consultation requests
@consultant_bp.route('/user/requests', methods=['GET'])
@login_required
def get_user_requests():
    """Get all consultation requests for the current user"""
    try:
        user_id = session['user_id']
        requests = ConsultationRequest.query.filter_by(user_id=user_id).order_by(ConsultationRequest.created_at.desc()).all()
        
        requests_data = []
        for req in requests:
            req_dict = req.to_dict()
            # Get consultant info
            consultant = Consultant.query.get(req.consultant_id)
            if consultant:
                user = User.query.get(consultant.user_id)
                if user:
                    req_dict['consultant_email'] = user.email
                    if user.profile and hasattr(user.profile, 'full_name'):
                        req_dict['consultant_name'] = user.profile.full_name
                    else:
                        req_dict['consultant_name'] = user.email.split('@')[0]
                    req_dict['consultant_qualification'] = consultant.qualification
            requests_data.append(req_dict)
            
        return jsonify({'requests': requests_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== ADMIN ENDPOINTS ====================
# Admin endpoints for monitoring consultants and sessions

@consultant_bp.route('/admin/consultants', methods=['GET'])
@admin_required
def admin_get_consultants():
    """Admin: Get all consultants with their statistics"""
    try:
        consultants = Consultant.query.all()
        
        consultants_data = []
        for c in consultants:
            c_dict = c.to_dict()
            user = User.query.get(c.user_id)
            
            if user:
                c_dict['email'] = user.email
                if user.profile and hasattr(user.profile, 'full_name'):
                    c_dict['full_name'] = user.profile.full_name
                else:
                    c_dict['full_name'] = user.email.split('@')[0]
            
            # Calculate statistics
            total_sessions = ConsultationRequest.query.filter_by(consultant_id=c.id).count()
            active_sessions = ConsultationRequest.query.filter_by(consultant_id=c.id, status='accepted').count()
            completed_sessions = ConsultationRequest.query.filter_by(consultant_id=c.id, status='completed').count()
            
            c_dict['total_sessions'] = total_sessions
            c_dict['active_sessions'] = active_sessions
            c_dict['completed_sessions'] = completed_sessions
            c_dict['completion_rate'] = (completed_sessions / total_sessions * 100) if total_sessions > 0 else 0
            
            consultants_data.append(c_dict)
            
        return jsonify({'consultants': consultants_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@consultant_bp.route('/admin/sessions', methods=['GET'])
@admin_required
def admin_get_sessions():
    """Admin: Get all consultation sessions with filters"""
    try:
        status_filter = request.args.get('status', None)
        
        query = ConsultationRequest.query
        if status_filter:
            query = query.filter_by(status=status_filter)
            
        sessions = query.order_by(ConsultationRequest.created_at.desc()).all()
        
        sessions_data = []
        for session in sessions:
            session_dict = session.to_dict()
            
            # Get user info
            user = User.query.get(session.user_id)
            if user:
                session_dict['user_email'] = user.email
                if user.profile and hasattr(user.profile, 'full_name'):
                    session_dict['user_name'] = user.profile.full_name
                else:
                    session_dict['user_name'] = user.email.split('@')[0]
            
            # Get consultant info
            consultant = Consultant.query.get(session.consultant_id)
            if consultant:
                cons_user = User.query.get(consultant.user_id)
                if cons_user:
                    session_dict['consultant_email'] = cons_user.email
                    if cons_user.profile and hasattr(cons_user.profile, 'full_name'):
                        session_dict['consultant_name'] = cons_user.profile.full_name
                    else:
                        session_dict['consultant_name'] = cons_user.email.split('@')[0]
                    session_dict['consultant_qualification'] = consultant.qualification
            
            # Get message count
            message_count = ConsultationMessage.query.filter_by(consultation_id=session.id).count()
            session_dict['message_count'] = message_count
            
            sessions_data.append(session_dict)
            
        return jsonify({'sessions': sessions_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@consultant_bp.route('/admin/chat/<int:session_id>', methods=['GET'])
@admin_required
def admin_get_chat(session_id):
    """Admin: View chat messages for a specific session (read-only)"""
    try:
        session = ConsultationRequest.query.get(session_id)
        if not session:
            return jsonify({'error': 'Session not found'}), 404
            
        # Get session details
        session_dict = session.to_dict()
        
        # Get user info
        user = User.query.get(session.user_id)
        if user:
            session_dict['user_email'] = user.email
            if user.profile and hasattr(user.profile, 'full_name'):
                session_dict['user_name'] = user.profile.full_name
            else:
                session_dict['user_name'] = user.email.split('@')[0]
        
        # Get consultant info
        consultant = Consultant.query.get(session.consultant_id)
        if consultant:
            cons_user = User.query.get(consultant.user_id)
            if cons_user:
                session_dict['consultant_email'] = cons_user.email
                if cons_user.profile and hasattr(cons_user.profile, 'full_name'):
                    session_dict['consultant_name'] = cons_user.profile.full_name
                else:
                    session_dict['consultant_name'] = cons_user.email.split('@')[0]
        
        # Get all messages
        messages = ConsultationMessage.query.filter_by(consultation_id=session_id).order_by(ConsultationMessage.timestamp.asc()).all()
        messages_data = []
        for msg in messages:
            msg_dict = msg.to_dict()
            # Add sender name
            sender = User.query.get(msg.sender_id)
            if sender:
                if sender.profile and hasattr(sender.profile, 'full_name'):
                    msg_dict['sender_name'] = sender.profile.full_name
                else:
                    msg_dict['sender_name'] = sender.email.split('@')[0]
            messages_data.append(msg_dict)
        
        return jsonify({
            'session': session_dict,
            'messages': messages_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
