"""
Tax Submission model for storing tax return submissions
"""
from models import db
from datetime import datetime
import json

class TaxSubmission(db.Model):
    """Model for tax return submissions"""
    
    __tablename__ = 'tax_submissions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Income details stored as JSON
    income_details = db.Column(db.Text, nullable=False)  # JSON string with income breakdown
    
    # Tax calculation results
    total_income = db.Column(db.Numeric(15, 2), nullable=False)
    taxable_income = db.Column(db.Numeric(15, 2), nullable=False)
    tax_amount = db.Column(db.Numeric(15, 2), nullable=False)
    
    # Status tracking
    status = db.Column(db.String(20), default='pending', nullable=False)  # pending, paid, overdue
    
    # Timestamps
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    payment = db.relationship('Payment', backref='submission', uselist=False, cascade='all, delete-orphan')
    
    def set_income_details(self, details_dict):
        """Store income details as JSON string"""
        self.income_details = json.dumps(details_dict)
    
    def get_income_details(self):
        """Retrieve income details as dictionary"""
        return json.loads(self.income_details) if self.income_details else {}
    
    def to_dict(self):
        """Convert submission to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'income_details': self.get_income_details(),
            'total_income': float(self.total_income),
            'taxable_income': float(self.taxable_income),
            'tax_amount': float(self.tax_amount),
            'status': self.status,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }
    
    def __repr__(self):
        return f'<TaxSubmission {self.id} - User {self.user_id}>'
