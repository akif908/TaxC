from app import create_app
from models import db
from models.feedback import Feedback
from models.user import User

app = create_app()

with app.app_context():
    print("Checking database content...")
    
    # Check Users
    users = User.query.all()
    print(f"Total Users: {len(users)}")
    for u in users:
        print(f" - User: {u.email} (ID: {u.id}, Role: {u.role})")
        
    # Check Feedback
    feedbacks = Feedback.query.all()
    print(f"\nTotal Feedback: {len(feedbacks)}")
    for f in feedbacks:
        print(f" - Feedback ID: {f.id}, User ID: {f.user_id}, Subject: {f.subject}, Status: {f.status}")
        try:
            print(f"   Serialized: {f.to_dict()}")
        except Exception as e:
            print(f"   ERROR serializing: {e}")
        
    if len(feedbacks) == 0:
        print("\nWARNING: No feedback found in database!")
    else:
        print("\nSUCCESS: Feedback records exist.")
