from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    """Initializes the database and registers models."""
    from models.user import User
    from models.tax_slab import TaxSlab
    from models.tax_submission import TaxSubmission
    from models.payment import Payment
    from models.feedback import Feedback
    from models.document import Document
    from models.taxpayer_profile import TaxpayerProfile

    with app.app_context():
        db.create_all()
