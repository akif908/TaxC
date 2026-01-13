"""
User model for authentication and user management
"""
from models import db
from datetime import datetime
import bcrypt

class User(db.Model):
    """User model for storing user authentication and profile information"""
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user', nullable=False)  # 'user', 'admin', or 'consultant'
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    profile = db.relationship('TaxpayerProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    submissions = db.relationship('TaxSubmission', backref='user', cascade='all, delete-orphan')
    payments = db.relationship('Payment', backref='user', cascade='all, delete-orphan')
    consultant = db.relationship('Consultant', backref='user', uselist=False, cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash password using bcrypt"""
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    def check_password(self, password):
        """Verify password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        """Convert user object to dictionary (excluding password)"""
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<User {self.email}>'
