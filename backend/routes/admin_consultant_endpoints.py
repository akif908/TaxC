
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
