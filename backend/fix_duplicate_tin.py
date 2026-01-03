from app import create_app
from models import db
from models.taxpayer_profile import TaxpayerProfile

app = create_app('development')

with app.app_context():
    print("Beginning database cleanup for TaxpayerProfile TIN field...")
    
    # Find profiles with empty string TIN
    profiles = TaxpayerProfile.query.filter_by(tin='').all()
    print(f"Found {len(profiles)} profiles with empty string TIN.")
    
    for profile in profiles:
        print(f"Updating profile for user ID {profile.user_id} (Name: {profile.name})...")
        profile.tin = None
    
    try:
        db.session.commit()
        print("Successfully converted empty strings to NULL in TIN field.")
    except Exception as e:
        db.session.rollback()
        print(f"Error during database update: {e}")
