from app import create_app
from models import db
from models.consultant import Consultant
from models.user import User

app = create_app()
with app.app_context():
    u = User.query.filter_by(role='consultant').first()
    c = Consultant.query.first()
    
    if u:
        print(f"✓ Found Consultant User: {u.email}")
    else:
        print("✗ Consultant User not found")
        
    if c:
        print(f"✓ Found Consultant Profile: {c.qualification}")
    else:
        print("✗ Consultant Profile not found")
