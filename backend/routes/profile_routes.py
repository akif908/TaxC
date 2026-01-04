"""
Taxpayer profile management routes
"""
from flask import Blueprint, request, jsonify, session
from models import db
from models.taxpayer_profile import TaxpayerProfile
from utils.decorators import login_required

profile_bp = Blueprint('profile', __name__, url_prefix='/api/profile')

@profile_bp.route('', methods=['GET'])
@login_required
def get_profile():
    """Get current user's profile"""
    try:
        user_id = session['user_id']
        profile = TaxpayerProfile.query.filter_by(user_id=user_id).first()
        
        if not profile:
            return jsonify({'message': 'Profile not found'}), 404
        
        return jsonify({'profile': profile.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get profile: {str(e)}'}), 500

@profile_bp.route('', methods=['POST'])
@login_required
def create_profile():
    """Create new taxpayer profile"""
    try:
        user_id = session['user_id']
        
        # Check if profile already exists
        existing_profile = TaxpayerProfile.query.filter_by(user_id=user_id).first()
        if existing_profile:
            return jsonify({'error': 'Profile already exists. Use PUT to update.'}), 409
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'phone', 'nid', 'address', 'occupation']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new profile
        profile = TaxpayerProfile(
            user_id=user_id,
            name=data['name'],
            phone=data['phone'],
            nid=data['nid'],
            tin=data.get('tin'),
            address=data['address'],
            occupation=data['occupation'],
            annual_income=data.get('annual_income')
        )
        
        db.session.add(profile)
        db.session.commit()
        
        return jsonify({
            'message': 'Profile created successfully',
            'profile': profile.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to create profile: {str(e)}'}), 500

@profile_bp.route('', methods=['PUT'])
@login_required
def update_profile():
    """Update existing taxpayer profile"""
    try:
        user_id = session['user_id']
        profile = TaxpayerProfile.query.filter_by(user_id=user_id).first()
        
        if not profile:
            return jsonify({'error': 'Profile not found. Use POST to create.'}), 404
        
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            profile.name = data['name']
        if 'phone' in data:
            profile.phone = data['phone']
        if 'nid' in data:
            profile.nid = data['nid']
        if 'tin' in data:
            profile.tin = data['tin']
        if 'address' in data:
            profile.address = data['address']
        if 'occupation' in data:
            profile.occupation = data['occupation']
        if 'annual_income' in data:
            profile.annual_income = data['annual_income']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'profile': profile.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update profile: {str(e)}'}), 500

@profile_bp.route('', methods=['DELETE'])
@login_required
def delete_profile():
    """Delete taxpayer profile"""
    try:
        user_id = session['user_id']
        profile = TaxpayerProfile.query.filter_by(user_id=user_id).first()
        
        if not profile:
            return jsonify({'error': 'Profile not found'}), 404
        
        db.session.delete(profile)
        db.session.commit()
        
        return jsonify({'message': 'Profile deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to delete profile: {str(e)}'}), 500
