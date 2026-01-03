"""
Tax Slab model for storing tax rate brackets
"""
from models import db
from datetime import datetime

class TaxSlab(db.Model):
    """Model for tax rate slabs/brackets"""
    
    __tablename__ = 'tax_slabs'
    
    id = db.Column(db.Integer, primary_key=True)
    min_income = db.Column(db.Numeric(15, 2), nullable=False)  # Minimum income for this slab
    max_income = db.Column(db.Numeric(15, 2), nullable=True)   # Maximum income (NULL for highest slab)
    tax_rate = db.Column(db.Numeric(5, 2), nullable=False)     # Tax rate as percentage
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert tax slab to dictionary"""
        return {
            'id': self.id,
            'min_income': float(self.min_income),
            'max_income': float(self.max_income) if self.max_income else None,
            'tax_rate': float(self.tax_rate),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        max_inc = f'{self.max_income}' if self.max_income else '∞'
        return f'<TaxSlab {self.min_income}-{max_inc} @ {self.tax_rate}%>'
