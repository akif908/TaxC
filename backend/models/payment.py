"""
Payment model for storing payment transactions
"""
from models import db
from datetime import datetime
import uuid

class Payment(db.Model):
    """Model for payment transactions"""
    
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submission_id = db.Column(db.Integer, db.ForeignKey('tax_submissions.id'), nullable=False, unique=True)
    
    # Payment details
    amount = db.Column(db.Numeric(15, 2), nullable=False)
    transaction_id = db.Column(db.String(100), unique=True, nullable=False)
    payment_method = db.Column(db.String(50), default='online', nullable=False)  # online, cash, check
    status = db.Column(db.String(20), default='completed', nullable=False)  # completed, pending, failed
    
    # Timestamps
    paid_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    @staticmethod
    def generate_transaction_id():
        """Generate a unique transaction ID"""
        return f'TXN-{datetime.now().strftime("%Y%m%d")}-{uuid.uuid4().hex[:8].upper()}'
    
    def to_dict(self):
        """Convert payment to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'submission_id': self.submission_id,
            'amount': float(self.amount),
            'transaction_id': self.transaction_id,
            'payment_method': self.payment_method,
            'status': self.status,
            'paid_at': self.paid_at.isoformat() if self.paid_at else None
        }
    
    def __repr__(self):
        return f'<Payment {self.transaction_id}>'
