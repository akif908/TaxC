from flask import Blueprint, jsonify, session
from models import db
from models.tax_submission import TaxSubmission
from models.payment import Payment
from models.taxpayer_profile import TaxpayerProfile
from models.document import Document
from utils.decorators import login_required
from datetime import datetime

user_bp = Blueprint('user', __name__, url_prefix='/api/user')

@user_bp.route('/summary', methods=['GET'])
@login_required
def get_user_summary():
    """
    Get a summary of user's tax status for the dashboard
    """
    try:
        user_id = session['user_id']
        
        # 1. Filing Year
        filing_year = "2025-2026"
        
        # 2. Estimated Dues (Sum of pending submissions)
        pending_submissions = TaxSubmission.query.filter_by(user_id=user_id, status='pending').all()
        estimated_dues = sum(float(s.tax_amount) for s in pending_submissions)
        
        # 3. Potential Savings (Placeholder or from latest submission if available)
        # For now, let's see if we have any submissions with rebates. 
        # Since the current backend doesn't store rebates explicitly, we'll return 0 or a placeholder.
        # Once we enhance the backend calculator, we can populate this.
        potential_savings = 0.0
        
        # 4. Documentation Status (Milestones)
        # - Profile Created (25%)
        # - Tax Return Submitted (25%)
        # - Tax Paid (25%)
        # - Documents Uploaded (25%)
        
        doc_progress = 0
        
        profile = TaxpayerProfile.query.filter_by(user_id=user_id).first()
        if profile:
            doc_progress += 25
            
        submission = TaxSubmission.query.filter_by(user_id=user_id).first()
        if submission:
            doc_progress += 25
            
        paid_submission = TaxSubmission.query.filter_by(user_id=user_id, status='paid').first()
        if paid_submission:
            doc_progress += 25
            
        doc_count = Document.query.filter_by(user_id=user_id).count()
        if doc_count > 0:
            doc_progress += 25
            
        # 5. Due Date (Days until Dec 31, 2025)
        # Using current year from system context if possible, but let's assume 2025.
        now = datetime.utcnow()
        deadline = datetime(2025, 12, 31)
        days_remaining = (deadline - now).days
        if days_remaining < 0:
            days_remaining = 0
            
        return jsonify({
            'filing_year': filing_year,
            'estimated_dues': estimated_dues,
            'potential_savings': potential_savings,
            'documentation_status': doc_progress,
            'due_in_days': days_remaining,
            'deadline_date': '31 Dec, 2025'
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get user summary: {str(e)}'}), 500
