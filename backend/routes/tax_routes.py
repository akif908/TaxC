"""
Tax calculation and submission routes
"""
from flask import Blueprint, request, jsonify, session
from models import db
from models.tax_submission import TaxSubmission
from services.tax_calculator import TaxCalculator
from utils.decorators import login_required
from decimal import Decimal

tax_bp = Blueprint('tax', __name__, url_prefix='/api/tax')

@tax_bp.route('/calculate', methods=['POST'])
@login_required
def calculate_tax():
    """
    Calculate tax based on income
    Expects: annual_income
    Returns: tax calculation breakdown
    """
    try:
        data = request.get_json()
        
        if not data or 'annual_income' not in data:
            return jsonify({'error': 'annual_income is required'}), 400
        
        annual_income = float(data['annual_income'])
        
        if annual_income < 0:
            return jsonify({'error': 'Income cannot be negative'}), 400
        
        # Calculate tax using tax calculator service
        result = TaxCalculator.calculate_tax(annual_income)
        
        return jsonify(result), 200
        
    except ValueError:
        return jsonify({'error': 'Invalid income value'}), 400
    except Exception as e:
        return jsonify({'error': f'Tax calculation failed: {str(e)}'}), 500

@tax_bp.route('/submit', methods=['POST'])
@login_required
def submit_tax_form():
    """
    Submit tax form with income details
    Expects: income_details (dict), total_income
    Returns: submission record
    """
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        if not data or 'total_income' not in data:
            return jsonify({'error': 'total_income is required'}), 400
        
        total_income = float(data['total_income'])
        income_details = data.get('income_details', {})
        
        # Calculate tax
        tax_result = TaxCalculator.calculate_tax(total_income)
        
        # Create submission record
        submission = TaxSubmission(
            user_id=user_id,
            total_income=Decimal(str(total_income)),
            taxable_income=Decimal(str(total_income)),  # Can be modified for deductions
            tax_amount=Decimal(str(tax_result['tax_amount'])),
            status='pending'
        )
        submission.set_income_details(income_details)
        
        db.session.add(submission)
        db.session.commit()
        
        return jsonify({
            'message': 'Tax form submitted successfully',
            'submission': submission.to_dict(),
            'tax_calculation': tax_result
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Submission failed: {str(e)}'}), 500

@tax_bp.route('/submissions', methods=['GET'])
@login_required
def get_submissions():
    """Get all tax submissions for current user"""
    try:
        user_id = session['user_id']
        submissions = TaxSubmission.query.filter_by(user_id=user_id).order_by(TaxSubmission.submitted_at.desc()).all()
        
        return jsonify({
            'submissions': [s.to_dict() for s in submissions]
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get submissions: {str(e)}'}), 500

@tax_bp.route('/submissions/<int:submission_id>', methods=['GET'])
@login_required
def get_submission(submission_id):
    """Get specific tax submission"""
    try:
        user_id = session['user_id']
        submission = TaxSubmission.query.filter_by(id=submission_id, user_id=user_id).first()
        
        if not submission:
            return jsonify({'error': 'Submission not found'}), 404
        
        return jsonify({'submission': submission.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get submission: {str(e)}'}), 500

@tax_bp.route('/slabs', methods=['GET'])
def get_tax_slabs():
    """Get all tax slabs (public endpoint)"""
    try:
        slabs = TaxCalculator.get_all_slabs()
        return jsonify({'slabs': slabs}), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get tax slabs: {str(e)}'}), 500
