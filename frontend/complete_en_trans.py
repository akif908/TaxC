import json
import os

# Read the current translation_new.json which has landing
with open('src/locales/en/translation_new.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add the missing sections
data['feedback'] = {
    "title": "Feedback",
    "subtitle": "We value your feedback! Let us know how we can improve.",
    "subject_label": "Subject",
    "subject_placeholder": "Brief description of your feedback",
    "message_label": "Your Feedback",
    "message_placeholder": "Please share your thoughts, suggestions, or issues...",
    "submit_btn": "Submit Feedback",
    "submitting": "Submitting...",
    "fill_all": "Please fill in all fields",
    "success": "Thank you! Your feedback has been submitted successfully.",
    "error": "Failed to submit feedback. Please try again."
}

data['auth'] = {
    "login": {
        "title": "Login to TaxC",
        "email_label": "Email Address",
        "email_placeholder": "Enter your email",
        "password_label": "Password",
        "password_placeholder": "Enter your password",
        "login_btn": "Login",
        "logging_in": "Logging in...",
        "no_account": "Don't have an account?",
        "register_link": "Register here",
        "failed": "Login failed. Please check your credentials."
    },
    "register": {
        "title": "Create Account",
        "name_label": "Full Name",
        "name_placeholder": "Enter your full name",
        "email_label": "Email Address",
        "email_placeholder": "Enter your email",
        "password_label": "Password",
        "password_placeholder": "Create a password",
        "confirm_password_label": "Confirm Password",
        "confirm_password_placeholder": "Re-enter your password",
        "register_btn": "Create Account",
        "registering": "Creating account...",
        "have_account": "Already have an account?",
        "login_link": "Login here",
        "failed": "Registration failed. Please try again.",
        "password_mismatch": "Passwords do not match"
    }
}

data['tax_guide'] = {
    "title": "Bangladesh Income Tax Guide 2025-2026",
    "subtitle": "Your complete guide to understanding income tax in Bangladesh",
    "toc_title": "Table of Contents",
    "disclaimer_title": "Disclaimer",
    "disclaimer_text": "This guide is for informational purposes only and should not be considered as professional tax advice.",
    "sections": {
        "intro": {
            "title": "Introduction to Income Tax",
            "content": "Income tax is a direct tax levied by the government on individual and corporate income."
        },
        "who_pays": {
            "title": "Who Needs to Pay Income Tax?",
            "content": "All citizens and residents of Bangladesh earning above the minimum taxable limit must file income tax returns."
        },
        "categories": {
            "title": "Taxpayer Categories",
            "content": "Taxpayers are classified into different categories with varying tax-free limits."
        },
        "slabs": {
            "title": "Tax Slabs and Rates",
            "content": "Bangladesh follows a progressive tax system where tax rates increase with income levels."
        },
        "deductions": {
            "title": "Deductions and Rebates",
            "content": "Various deductions are available to reduce taxable income, including investment rebates."
        },
        "filing": {
            "title": "Filing Your Return",
            "content": "Returns must be filed annually by the specified deadline."
        },
        "penalties": {
            "title": "Penalties for Non-Compliance",
            "content": "Failure to file returns or pay taxes on time may result in penalties."
        }
    }
}

data['deadline_popup'] = {
    "title": "Tax Filing Reminder",
    "warning": "Tax Return Deadline Approaching!",
    "message": "Only {{days}} days left to file your income tax return for FY {{year}}.",
    "deadline_date": "Deadline: {{date}}",
    "file_now_btn": "File Now",
    "remind_later": "Remind Me Later",
    "dismiss": "Dismiss"
}

data['payment'] = {
    "title": "Payments 💳",
    "subtitle": "Manage your tax payments and view transaction history.",
    "make_payment": "Make a Payment",
    "amount_label": "Amount to Pay",
    "pay_btn": "Pay Now",
    "processing": "Processing...",
    "secure_msg": "Secure payment processing via SSL encryption.",
    "history_title": "Transaction History",
    "search_placeholder": "Search ID...",
    "no_transactions": "No transactions found.",
    "table": {
        "id": "Transaction ID",
        "date": "Date",
        "status": "Status",
        "amount": "Amount",
        "completed": "Completed"
    },
    "messages": {
        "enter_amount": "Please enter a valid amount",
        "success": "Payment successful!",
        "failed": "Payment failed"
    }
}

data['tax_form'] = {
    "title": "File Tax Return 📝",
    "subtitle": "Calculate your taxes and submit your return in just a few clicks.",
    "income_details": "Income Details",
    "annual_income_label": "Total Annual Income",
    "helper_text": "Enter your total taxable income for the fiscal year.",
    "calculate_btn": "Calculate Tax",
    "processing": "Processing...",
    "result_title": "Calculation Result",
    "fiscal_year": "FY 2024-25",
    "total_income": "Total Income",
    "tax_payable": "Tax Payable",
    "effective_rate": "Effective Rate",
    "breakdown": "Breakdown",
    "submit_btn": "Submit Return",
    "tax_slabs": "Tax Slabs",
    "messages": {
        "enter_income": "Please enter a valid income",
        "calc_failed": "Calculation failed",
        "calc_first": "Please calculate tax first",
        "success": "Tax form submitted successfully! Go to Payments to complete payment.",
        "submit_failed": "Submission failed"
    }
}

# Write complete English translation file
with open('src/locales/en/translation.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("✓ Complete English translation file created with all keys")
