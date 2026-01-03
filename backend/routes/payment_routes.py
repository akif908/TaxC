"""
Payment processing routes
"""
from flask import Blueprint, request, jsonify, session
from models import db
from models.payment import Payment
from models.tax_submission import TaxSubmission
from utils.decorators import login_required
from decimal import Decimal
from datetime import datetime

payment_bp = Blueprint('payment', __name__, url_prefix='/api/payment')

@payment_bp.route('/process', methods=['POST'])
@login_required
def process_payment():
    """
    Simulate payment processing
    Expects: submission_id, payment_method
    Returns: payment record with transaction_id
    """
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        if not data or 'submission_id' not in data:
            return jsonify({'error': 'submission_id is required'}), 400
        
        submission_id = data['submission_id']
        payment_method = data.get('payment_method', 'online')
        
        # Verify submission exists and belongs to user
        submission = TaxSubmission.query.filter_by(id=submission_id, user_id=user_id).first()
        if not submission:
            return jsonify({'error': 'Tax submission not found'}), 404
        
        # Check if payment already exists for this submission
        existing_payment = Payment.query.filter_by(submission_id=submission_id).first()
        if existing_payment:
            return jsonify({'error': 'Payment already exists for this submission'}), 409
        
        # Create payment record
        payment = Payment(
            user_id=user_id,
            submission_id=submission_id,
            amount=submission.tax_amount,
            transaction_id=Payment.generate_transaction_id(),
            payment_method=payment_method,
            status='completed'  # Simulated payment always succeeds
        )
        
        db.session.add(payment)
        
        # Update submission status
        submission.status = 'paid'
        
        db.session.commit()
        
        return jsonify({
            'message': 'Payment processed successfully',
            'payment': payment.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Payment processing failed: {str(e)}'}), 500

@payment_bp.route('/history', methods=['GET'])
@login_required
def get_payment_history():
    """Get payment history for current user"""
    try:
        user_id = session['user_id']
        payments = Payment.query.filter_by(user_id=user_id).order_by(Payment.paid_at.desc()).all()
        
        # Include submission details
        payment_list = []
        for payment in payments:
            payment_dict = payment.to_dict()
            if payment.submission:
                payment_dict['submission'] = payment.submission.to_dict()
            payment_list.append(payment_dict)
        
        return jsonify({'payments': payment_list}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get payment history: {str(e)}'}), 500

@payment_bp.route('/<int:payment_id>', methods=['GET'])
@login_required
def get_payment(payment_id):
    """Get specific payment details"""
    try:
        user_id = session['user_id']
        payment = Payment.query.filter_by(id=payment_id, user_id=user_id).first()
        
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
        
        payment_dict = payment.to_dict()
        if payment.submission:
            payment_dict['submission'] = payment.submission.to_dict()
        
        return jsonify({'payment': payment_dict}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get payment: {str(e)}'}), 500
