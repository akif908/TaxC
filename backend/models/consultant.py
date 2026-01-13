"""
Consultant-specific models for professional tax assistance
"""
from models import db
from datetime import datetime

class Consultant(db.Model):
    """Consultant profile model linked to user"""
    __tablename__ = 'consultants'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    qualification = db.Column(db.String(255))
    experience = db.Column(db.String(255))
    is_available = db.Column(db.Boolean, default=True)
    bio = db.Column(db.Text)
    
    # Relationship to user is handled via backref in User model or here
    # Adding it here for clarity if needed, but User model often handles relationships
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'qualification': self.qualification,
            'experience': self.experience,
            'is_available': self.is_available,
            'bio': self.bio
        }

class ConsultationRequest(db.Model):
    """Requests for consultation from users to consultants"""
    __tablename__ = 'consultation_requests'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    consultant_id = db.Column(db.Integer, db.ForeignKey('consultants.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # 'pending', 'accepted', 'rejected', 'completed'
    topic = db.Column(db.String(255))
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', foreign_keys=[user_id], backref='my_consultation_requests')
    consultant = db.relationship('Consultant', backref='all_requests')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'consultant_id': self.consultant_id,
            'status': self.status,
            'topic': self.topic,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class ConsultationMessage(db.Model):
    """Messages within a consultation session"""
    __tablename__ = 'consultation_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    consultation_id = db.Column(db.Integer, db.ForeignKey('consultation_requests.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    consultation = db.relationship('ConsultationRequest', backref='chat_messages')
    sender = db.relationship('User')

    def to_dict(self):
        return {
            'id': self.id,
            'consultation_id': self.consultation_id,
            'sender_id': self.sender_id,
            'message': self.message,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }
