"""
Receipt generation and download routes
"""
from flask import Blueprint, send_file, jsonify, session
from models.payment import Payment
from models.user import User
from models.taxpayer_profile import TaxpayerProfile
from services.pdf_generator import PDFGenerator
from utils.decorators import login_required
import os

receipt_bp = Blueprint('receipt', __name__, url_prefix='/api/receipt')

@receipt_bp.route('/<int:payment_id>', methods=['GET'])
@login_required
def download_receipt(payment_id):
    """
    Generate and download PDF receipt for a payment
    """
    try:
        user_id = session['user_id']
        
        # Get payment and verify ownership
        payment = Payment.query.filter_by(id=payment_id, user_id=user_id).first()
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
        
        # Get related data
        user = User.query.get(user_id)
        profile = TaxpayerProfile.query.filter_by(user_id=user_id).first()
        submission = payment.submission
        
        if not submission:
            return jsonify({'error': 'Tax submission not found'}), 404
        
        # Generate PDF
        pdf_path = PDFGenerator.generate_receipt(payment, user, profile, submission)
        
        # Send file
        return send_file(
            pdf_path,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'tax_receipt_{payment.transaction_id}.pdf'
        )
        
    except Exception as e:
        return jsonify({'error': f'Failed to generate receipt: {str(e)}'}), 500
