"""
Main Flask application entry point
"""
from flask import Flask, jsonify
from flask_cors import CORS
try:
    from flask_session import Session
except ImportError:
    Session = None
from config import config
from database import db, init_db
import os

def create_app(config_name='development'):
    """
    Application factory function
    Creates and configures the Flask application
    """
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize CORS with credentials support
    CORS(app, supports_credentials=True, origins=['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'])
    
    # Initialize Flask-Session if available; fall back to signed cookies otherwise
    if Session:
        Session(app)
    else:
        app.logger.warning("Flask-Session not installed; using default client-side sessions.")
    
    # Initialize SQLAlchemy
    db.init_app(app)

    # Initialize and create database tables
    init_db(app)
    print("✓ Database tables created successfully")
    
    # Register blueprints
    from auth.routes import auth_bp
    from routes.profile_routes import profile_bp
    from routes.tax_routes import tax_bp
    from routes.payment_routes import payment_bp
    from routes.receipt_routes import receipt_bp
    from routes.chatbot_routes import chatbot_bp
    from routes.admin_routes import admin_bp
    from routes.feedback import feedback_bp
    from routes.document_routes import document_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(tax_bp)
    app.register_blueprint(payment_bp)
    app.register_blueprint(receipt_bp)
    app.register_blueprint(chatbot_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(feedback_bp)
    app.register_blueprint(document_bp)
    
    # Health check route
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'Tax Payment API is running'}), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Route not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    with app.app_context():
        from models.tax_slab import TaxSlab
        from models.user import User
        # Seed default tax slabs if none exist
        if TaxSlab.query.count() == 0:
            default_slabs = [
                TaxSlab(min_income=0, max_income=300000, tax_rate=0),           # 0% for first 300K
                TaxSlab(min_income=300000, max_income=400000, tax_rate=5),      # 5% for 300K-400K
                TaxSlab(min_income=400000, max_income=500000, tax_rate=10),     # 10% for 400K-500K
                TaxSlab(min_income=500000, max_income=600000, tax_rate=15),     # 15% for 500K-600K
                TaxSlab(min_income=600000, max_income=3000000, tax_rate=20),    # 20% for 600K-3M
                TaxSlab(min_income=3000000, max_income=None, tax_rate=25),      # 25% for 3M+
            ]
            db.session.bulk_save_objects(default_slabs)
            db.session.commit()
            print("✓ Default tax slabs seeded successfully")
        
        # Create default admin user if none exists
        admin = User.query.filter_by(email='admin@tax.com').first()
        if not admin:
            admin = User(email='admin@tax.com', role='admin')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            print("✓ Default admin user created (admin@tax.com / admin123)")
    
    return app

if __name__ == '__main__':
    app = create_app('development')
    print("\n" + "="*50)
    print("🚀 Tax Payment Backend Server Starting...")
    print("="*50)
    print("📍 API Base URL: http://localhost:5000/api")
    print("🔐 Default Admin: admin@tax.com / admin123")
    print("="*50 + "\n")
    app.run(host='0.0.0.0', port=5000, debug=True)
