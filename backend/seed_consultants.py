from app import create_app
from models import db
from models.user import User
from models.consultant import Consultant

app = create_app()

consultants_data = [
    {
        "email": "consultant1@tax.com",
        "password": "password123",
        "qualification": "Chartered Accountant (CA)",
        "experience": "10+ years in Personal Tax Filing",
        "bio": "Specializing in high-net-worth individuals and complex tax structures."
    },
    {
        "email": "consultant2@tax.com",
        "password": "password123",
        "qualification": "Certified Management Accountant (CMA)",
        "experience": "7 years in Corporate Tax Strategy",
        "bio": "Helping businesses optimize their tax liabilities and stay compliant."
    },
    {
        "email": "consultant3@tax.com",
        "password": "password123",
        "qualification": "Senior Tax Consultant",
        "experience": "5 years in International Taxation",
        "bio": "Expert in dual-citizenship tax issues and foreign income reporting."
    },
    {
        "email": "consultant4@tax.com",
        "password": "password123",
        "qualification": "VAT & Income Tax Specialist",
        "experience": "8 years in Small Business Support",
        "bio": "passionate about helping entrepreneurs navigate the tax landscape."
    }
]

with app.app_context():
    for data in consultants_data:
        # Check if user exists
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            user = User(email=data['email'], role='consultant')
            user.set_password(data['password'])
            db.session.add(user)
            db.session.commit()
            
            # Create consultant profile
            consultant = Consultant(
                user_id=user.id,
                qualification=data['qualification'],
                experience=data['experience'],
                bio=data['bio'],
                is_available=True
            )
            db.session.add(consultant)
            db.session.commit()
            print(f"Created consultant: {data['email']}")
        else:
            print(f"Consultant already exists: {data['email']}")

print("Seeding completed.")
