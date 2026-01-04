"""
Admin dashboard and management routes
"""
from flask import Blueprint, request, jsonify, session
from models import db
from models.user import User
from models.payment import Payment
from models.tax_submission import TaxSubmission
from models.tax_slab import TaxSlab
from models.taxpayer_profile import TaxpayerProfile
from utils.decorators import admin_required
from decimal import Decimal
from sqlalchemy import func

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/dashboard', methods=['GET'])
@admin_required
def get_dashboard_stats():
    """Get dashboard statistics"""
    try:
        # Count statistics
        total_users = User.query.filter_by(role='user').count()
        total_admin = User.query.filter_by(role='admin').count()
        total_payments = Payment.query.count()
        total_submissions = TaxSubmission.query.count()
        
        # Revenue statistics
        total_revenue = db.session.query(func.sum(Payment.amount)).scalar() or Decimal('0')
        pending_submissions = TaxSubmission.query.filter_by(status='pending').count()
        
        # Recent payments
        recent_payments = Payment.query.order_by(Payment.paid_at.desc()).limit(5).all()
        recent_payments_data = []
        for payment in recent_payments:
            payment_dict = payment.to_dict()
            user = User.query.get(payment.user_id)
            if user:
                payment_dict['user_email'] = user.email
            recent_payments_data.append(payment_dict)
        
        return jsonify({
            'stats': {
                'total_users': total_users,
                'total_admins': total_admin,
                'total_payments': total_payments,
                'total_submissions': total_submissions,
                'total_revenue': float(total_revenue),
                'pending_submissions': pending_submissions
            },
            'recent_payments': recent_payments_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get dashboard stats: {str(e)}'}), 500

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_all_users():
    """Get all users with optional filters"""
    try:
        # Get query parameters
        role = request.args.get('role')
        is_active = request.args.get('is_active')
        
        # Build query
        query = User.query
        
        if role:
            query = query.filter_by(role=role)
        if is_active is not None:
            query = query.filter_by(is_active=is_active.lower() == 'true')
        
        users = query.order_by(User.created_at.desc()).all()
        
        # Include profile information
        users_data = []
        for user in users:
            user_dict = user.to_dict()
            profile = TaxpayerProfile.query.filter_by(user_id=user.id).first()
            if profile:
                user_dict['profile'] = profile.to_dict()
            users_data.append(user_dict)
        
        return jsonify({'users': users_data}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get users: {str(e)}'}), 500

@admin_bp.route('/users/<int:user_id>/activate', methods=['PUT'])
@admin_required
def toggle_user_activation(user_id):
    """Activate or deactivate a user account"""
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Prevent admin from deactivating themselves
        if user.id == session['user_id']:
            return jsonify({'error': 'Cannot modify your own account'}), 400
        
        data = request.get_json()
        is_active = data.get('is_active', not user.is_active)
        
        user.is_active = is_active
        db.session.commit()
        
        status = 'activated' if is_active else 'deactivated'
        return jsonify({
            'message': f'User {status} successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update user: {str(e)}'}), 500

@admin_bp.route('/users/<int:user_id>/role', methods=['PUT'])
@admin_required
def change_user_role(user_id):
    """Change user role (user/admin)"""
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Prevent admin from changing their own role
        if user.id == session['user_id']:
            return jsonify({'error': 'Cannot modify your own role'}), 400
        
        data = request.get_json()
        new_role = data.get('role')
        
        if new_role not in ['user', 'admin']:
            return jsonify({'error': 'Invalid role. Must be "user" or "admin"'}), 400
        
        user.role = new_role
        db.session.commit()
        
        return jsonify({
            'message': f'User role changed to {new_role} successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to change role: {str(e)}'}), 500

@admin_bp.route('/users/<int:user_id>/reset-password', methods=['POST'])
@admin_required
def reset_user_password(user_id):
    """Reset user password"""
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        new_password = data.get('new_password')
        
        if not new_password or len(new_password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        
        user.set_password(new_password)
        db.session.commit()
        
        return jsonify({'message': 'Password reset successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to reset password: {str(e)}'}), 500

@admin_bp.route('/payments', methods=['GET'])
@admin_required
def get_all_payments():
    """Get all payments with user information"""
    try:
        payments = Payment.query.order_by(Payment.paid_at.desc()).all()
        
        payments_data = []
        for payment in payments:
            payment_dict = payment.to_dict()
            user = User.query.get(payment.user_id)
            if user:
                payment_dict['user_email'] = user.email
            if payment.submission:
                payment_dict['submission'] = payment.submission.to_dict()
            payments_data.append(payment_dict)
        
        return jsonify({'payments': payments_data}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get payments: {str(e)}'}), 500

@admin_bp.route('/slabs', methods=['GET'])
@admin_required
def get_slabs():
    """Get all tax slabs"""
    try:
        slabs = TaxSlab.query.order_by(TaxSlab.min_income).all()
        return jsonify({'slabs': [slab.to_dict() for slab in slabs]}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get tax slabs: {str(e)}'}), 500

@admin_bp.route('/slabs', methods=['POST'])
@admin_required
def create_slab():
    """Create new tax slab"""
    try:
        data = request.get_json()
        
        required = ['min_income', 'tax_rate']
        for field in required:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        slab = TaxSlab(
            min_income=Decimal(str(data['min_income'])),
            max_income=Decimal(str(data['max_income'])) if data.get('max_income') else None,
            tax_rate=Decimal(str(data['tax_rate']))
        )
        
        db.session.add(slab)
        db.session.commit()
        
        return jsonify({
            'message': 'Tax slab created successfully',
            'slab': slab.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to create tax slab: {str(e)}'}), 500

@admin_bp.route('/slabs/<int:slab_id>', methods=['PUT'])
@admin_required
def update_slab(slab_id):
    """Update existing tax slab"""
    try:
        slab = TaxSlab.query.get(slab_id)
        if not slab:
            return jsonify({'error': 'Tax slab not found'}), 404
        
        data = request.get_json()
        
        if 'min_income' in data:
            slab.min_income = Decimal(str(data['min_income']))
        if 'max_income' in data:
            slab.max_income = Decimal(str(data['max_income'])) if data['max_income'] else None
        if 'tax_rate' in data:
            slab.tax_rate = Decimal(str(data['tax_rate']))
        
        db.session.commit()
        
        return jsonify({
            'message': 'Tax slab updated successfully',
            'slab': slab.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update tax slab: {str(e)}'}), 500

@admin_bp.route('/slabs/<int:slab_id>', methods=['DELETE'])
@admin_required
def delete_slab(slab_id):
    """Delete tax slab"""
    try:
        slab = TaxSlab.query.get(slab_id)
        if not slab:
            return jsonify({'error': 'Tax slab not found'}), 404
        
        db.session.delete(slab)
        db.session.commit()
        
        return jsonify({'message': 'Tax slab deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to delete tax slab: {str(e)}'}), 500
