import json

# Start with the base translations we know are working
base = {
    "sidebar": {
        "dashboard": "Dashboard",
        "tax_form": "Tax Form",
        "payment": "Payment",
        "account": "Account",
        "admin_panel": "Admin Panel",
        "users": "Users",
        "tax_slabs": "Tax Slabs",
        "feedback": "Feedback",
        "logout": "Logout"
    },
    "dashboard": {
        "hello": "Hello",
        "welcome_message": "Here's what's happening with your taxes today.",
        "complete_profile": "Complete Profile",
        "tax_returns": "Tax Returns",
        "total_paid": "Total Paid",
        "last_filing": "Last Filing",
        "recent_filings": "Recent Filings",
        "new_filing": "New Filing",
        "file_now": "File Now",
        "no_returns": "No tax returns filed yet.",
        "date": "Date",
        "amount": "Amount",
        "status": "Status"
    },
    "account": {
        "title": "My Account",
        "subtitle": "Calculators, tax guide, and your documents—all in one place.",
        "tabs": {
            "calculators": "Calculators",
            "guide": "Tax Guide",
            "documents": "Documents",
            "feedback": "Feedback"
        },
        "calculator": {
            "select_label": "Select Calculator",
            "tax_calculator": "Tax Calculator",
            "loan_emi": "Loan EMI",
            "fdr": "FDR Calculator",
            "sanchayap

atra": "Sanchayapatra Calculator",
            "title_2025": "Tax Calculator (2025-2026)",
            "category_label": "Taxpayer Category",
            "tax_free_limit": "Tax-free limit",
            "income_sources": "Income Sources",
            "salary": "Salary & Wages",
            "business": "Business/Profession",
            "rental": "Rental Income",
            "investment": "Interest/Investment",
            "capital": "Capital Gains",
            "other": "Other Income",
            "deductions_label": "Eligible Deductions",
            "deductions_hint": "Enter allowable deductions you want to subtract before tax.",
            "investments_label": "Eligible Investments for Rebate",
            "investments_hint": "Rebate base is capped at {{percent}}% of taxable income or ৳{{cap}}.",
            "calculate_btn": "Calculate Tax",
            "calculating": "Calculating...",
            "gross_income": "Gross Income",
            "taxable_income": "Taxable Income",
            "tax_before_rebate": "Tax Before Rebate",
            "net_tax_payable": "Net Tax Payable",
            "rebate_applied": "Investment Rebate Applied",
            "breakdown_title": "Calculation Breakdown",
            "slab_header": "Slab",
            "rate_header": "Rate",
            "taxable_amount_header": "Taxable Amount",
            "tax_header": "Tax",
            "nbr_link": "Open NBR Income-tax Paripatra 2025–2026"
        },
        "documents": {
            "title": "Documents",
            "submissions_title": "Tax Submissions",
            "payments_title": "Payments & Receipts",
            "no_submissions": "No submissions",
            "no_payments": "No payments",
            "receipt_btn": "Receipt"
        }
    },
    "profile": {
        "title": "My Profile 👤",
        "subtitle": "Manage your personal information and tax details.",
        "edit_title": "Edit Profile",
        "create_title": "Create Profile",
        "personal_info": "Personal Information",
        "full_name": "Full Name",
        "phone": "Phone Number",
        "address": "Address",
        "tax_details": "Tax Details",
        "nid": "National ID (NID)",
        "tin": "TIN (Tax ID)",
        "occupation": "Occupation",
        "annual_income": "Annual Income",
        "save_btn": "Save Profile",
        "update_btn": "Update Profile",
        "saving": "Saving...",
        "success_update": "Profile updated successfully!",
        "success_create": "Profile created successfully!",
        "enter_name": "Enter your full name",
        "enter_phone": "Enter phone number",
        "enter_address": "Enter your full address",
        "enter_nid": "Enter NID",
        "enter_tin": "Tax Identification Number (optional)",
        "enter_occupation": "Your occupation",
        "enter_income": "Enter annual income"
    },
    "common": {
        "loading": "Loading..."
    },
    "payment": {
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
    },
    "tax_form": {
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
    },
    "landing": {
        "header": {
            "title": "TaxC",
            "subtitle": "Smart Tax Filing Platform",
            "login": "Login",
            "about": "About",
            "features": "Features"
        },
        "footer": {
            "about_title": "About TaxC",
            "about_text": "TaxC is your trusted tax filing partner in Bangladesh.",
            "links_title": "Quick Links",
            "guide": "Tax Guide",
            "calculator": "Calculator",
            "support": "Support",
            "contact_title": "Contact",
            "email": "support@taxc.com",
            "phone": "+880 1234-567890",
            "copyright": "© 2025 TaxC. All rights reserved."
        },
        "hero": {
            "eyebrow": "MODERN TAX FILING",
            "title": "File Your Taxes with Confidence",
            "subtitle": "Smart, simple, and secure tax filing for individuals and businesses in Bangladesh.",
            "get_started": "Get Started",
            "have_account": "I Have an Account",
            "badges": {
                "iso": "ISO 27001 Certified",
                "gdpr": "GDPR Compliant",
                "ledger": "Blockchain Ledger"
            }
        },
        "hero": {
            "panel": {
                "filing_year": "Filing for FY",
                "due_in": "Due in",
                "est_dues": "Est. Dues",
                "savings": "Potential Savings",
                "documentation": "Documentation Status",
                "review_submit": "Review & Submit Return"
            }
        },
        "stats": {
            "active_filers": "Active Filers",
            "active_filers_detail": "Across Bangladesh",
            "processing": "Avg. Processing",
            "processing_detail": "From submission to approval",
            "success": "Success Rate",
            "success_detail": "Tax filings approved"
        },
        "features": {
            "eyebrow": "FEATURES",
            "title": "Everything You Need to File Confident",
            "cards": {
                "1": {
                    "title": "Smart Tax Calculator",
                    "copy": "Calculate your taxes accurately with our NBR-compliant calculator."
                },
                "2": {
                    "title": "Document Management",
                    "copy": "Store and organize all your tax documents securely in one place."
                },
                "3": {
                    "title": "AI Tax Assistant",
                    "copy": "Get instant answers to your tax questions with our AI chatbot."
                },
                "4": {
                    "title": "E-Filing Ready",
                    "copy": "Submit your returns directly to NBR with our integrated e-filing."
                }
            }
        },
        "workflow": {
            "eyebrow": "HOW IT WORKS",
            "title": "File in 4 Simple Steps",
            "steps": {
                "1": {
                    "title": "Create Profile",
                    "detail": "Set up your taxpayer profile with basic information."
                },
                "2": {
                    "title": "Enter Income",
                    "detail": "Add your income sources and deductions."
                },
                "3": {
                    "title": "Calculate Tax",
                    "detail": "Our system calculates your tax liability instantly."
                },
                "4": {
                    "title": "Submit & Pay",
                    "detail": "Review, submit your return, and make payment."
                }
            }
        },
        "benefits": {
            "eyebrow": "WHY CHOOSE TAXC",
            "title": "Benefits of Using TaxC",
            "1": {
                "title": "Save Time",
                "detail": "File your taxes in minutes, not hours."
            },
            "2": {
                "title": "Maximize Savings",
                "detail": "Get all eligible deductions and rebates."
            },
            "3": {
                "title": "Stay Compliant",
                "detail": "Always up-to-date with the latest tax laws."
            }
        },
        "faq": {
            "eyebrow": "FAQ",
            "title": "Frequently Asked Questions",
            "items": {
                "eligibility": {
                    "q": "Who can use TaxC?",
                    "a": "Any individual or business taxpayer in Bangladesh can use TaxC to file their tax returns."
                },
                "security": {
                    "q": "Is my data secure?",
                    "a": "Yes, we use bank-level encryption and comply with international data protection standards."
                },
                "pricing": {
                    "q": "What does it cost?",
                    "a": "TaxC is free for individual taxpayers. Business packages start from ৳5,000/year."
                },
                "support": {
                    "q": "Do you provide support?",
                    "a": "Yes, our support team is available 24/7 via chat, email, and phone."
                }
            }
        },
        "cta": {
            "eyebrow": "GET STARTED TODAY",
            "title": "Ready to File Your Taxes?",
            "subtitle": "Join thousands of satisfied users who trust TaxC.",
            "btn": "Create Free Account"
        }
    },
    "feedback": {
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
    },
    "tax_guide": {
        "title": "Bangladesh Income Tax Guide 2025-2026",
        "subtitle": "Your complete guide to understanding income tax in Bangladesh",
        "toc_title": "Table of Contents",
        "disclaimer_title": "Disclaimer",
        "disclaimer_text": "This guide is for informational purposes only and should not be considered as professional tax advice. Please consult with a certified tax professional for your specific situation.",
        "sections": {
            "intro": {
                "title": "Introduction to Income Tax",
                "content": "Income tax is a direct tax levied by the government on individual and  corporate income..."
            },
            "who_pays": {
                "title": "Who Needs to Pay Income Tax?",
                "content": "All citizens and residents of Bangladesh earning above the minimum taxable limit must file income tax returns..."
            },
            "categories": {
                "title": "Taxpayer Categories",
                "content": "Taxpayers are classified into different categories with varying tax-free limits..."
            },
            "slabs": {
                "title": "Tax Slabs and Rates",
                "content": "Bangladesh follows a progressive tax system where tax rates increase with income levels..."
            },
            "deductions": {
                "title": "Deductions and Rebates",
                "content": "Various deductions are available to reduce taxable income, including investment rebates..."
            },
            "filing": {
                "title": "Filing Your Return",
                "content": "Returns must be filed annually by the specified deadline..."
            },
            "penalties": {
                "title": "Penalties for Non-Compliance",
                "content": "Failure to file returns or pay taxes on time may result in penalties..."
            }
        }
    },
    "auth": {
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
    },
    "deadline_popup": {
        "title": "Tax Filing Reminder",
        "warning": "Tax Return Deadline Approaching!",
        "message": "Only {{days}} days left to file your income tax return for FY {{year}}.",
        "deadline_date": "Deadline: {{date}}",
        "file_now_btn": "File Now",
        "remind_later": "Remind Me Later",
        "dismiss": "Dismiss"
    }
}

# Write to file
with open('src/locales/en/translation.json', 'w', encoding='utf-8') as f:
    json.dump(base, f, indent=4, ensure_ascii=False)

print("✓ English translation file written successfully")
