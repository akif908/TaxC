"""
Taxpayer Profile model for storing detailed taxpayer information
"""
from models import db
from datetime import datetime

class TaxpayerProfile(db.Model):
    """Model for storing taxpayer profile information"""
    
    __tablename__ = 'taxpayer_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    
    # Personal Information
    name = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    nid = db.Column(db.String(50), unique=True, nullable=False)  # National ID
    tin = db.Column(db.String(50), unique=True, nullable=True)   # Tax Identification Number
    address = db.Column(db.Text, nullable=False)
    
    # Employment Information
    occupation = db.Column(db.String(100), nullable=False)
    annual_income = db.Column(db.Numeric(15, 2), nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert profile object to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'phone': self.phone,
            'nid': self.nid,
            'tin': self.tin,
            'address': self.address,
            'occupation': self.occupation,
            'annual_income': float(self.annual_income) if self.annual_income else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<TaxpayerProfile {self.name}>'
