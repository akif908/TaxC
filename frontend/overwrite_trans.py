import json
import os

# Complete English Translation
en_data = {
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
            "sanchayapatra": "Sanchayapatra Calculator",
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
    "landing": {
        "header": {
            "title": "TaxC",
            "subtitle": "Smart Tax Filing Platform",
            "login": "Login",
            "about": "About",
            "features": "Features"
        },
        "footer": {
            "brand_desc": "TaxC is your trusted partner for simple, secure, and accurate tax filing in Bangladesh.",
            "quick_links": "Quick Links",
            "features": "Features",
            "about": "About Us",
            "login": "Login",
            "tax_sheet": "Tax Sheet",
            "support": "Support",
            "help_center": "Help Center",
            "contact_nbr": "Contact NBR",
            "status": "System Status",
            "copyright": "© 2025 TaxC. All rights reserved.",
            "privacy": "Privacy Policy",
            "terms": "Terms of Service",
            "about_title": "About TaxC",
            "about_text": "TaxC is your trusted tax filing partner in Bangladesh.",
            "links_title": "Quick Links",
            "guide": "Tax Guide",
            "calculator": "Calculator",
            "contact_title": "Contact",
            "email": "support@taxc.com",
            "phone": "+880 1234-567890"
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
            },
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
            },
            "eyebrow": "WHY CHOOSE TAXC",
            "title": "Benefits of Using TaxC"
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
                    "a": "TaxC is free for individual taxpayers. Business packages start from 5,000/year."
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
    "tax_guide": {
        "title": "Bangladesh Income Tax Guide 2025-2026",
        "subtitle": "Your complete guide to understanding income tax regulations, rates, and filing procedures in Bangladesh for the assessment year 2025-26.",
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
        },
        "reminder": {
            "title": "Tax Day Reminder",
            "text": "The deadline for filing income tax returns for individual taxpayers is November 30, 2025. Please file on time to avoid penalties."
        },
        "tax_free_limits": {
            "title": "Tax-Free Income Limits",
            "subtitle": "Income up to these limits is tax-free",
            "category": "Taxpayer Category",
            "limit": "Tax-Free Limit"
        },
        "tax_rates": {
            "title": "Tax Rates (Individual)",
            "subtitle": "Progressive tax rates based on income slabs",
            "range": "Income Range",
            "rate": "Tax Rate",
            "note": "Note: The minimum tax payable varies by location (Dhaka/Ctg: ৳5,000, Other City Corp: ৳4,000, Non-City: ৳3,000)."
        },
        "min_tax": {
            "title": "Minimum Tax",
            "desc": "Even if your calculated tax is zero or less than the minimum amount, you must pay the minimum tax if you fall under certain criteria.",
            "list": {
                "1": "Dhaka North, Dhaka South, and Chittagong City Corporation: ৳5,000",
                "2": "Other City Corporations: ৳4,000",
                "3": "Areas outside City Corporations: ৳3,000"
            },
            "tip": "Tip: If your taxable income is below the tax-free limit, you generally do not need to pay the minimum tax unless specific conditions apply."
        },
        "wealth_surcharge": {
            "title": "Net Wealth Surcharge",
            "desc": "An additional surcharge is payable based on your net wealth shown in the statement of assets and liabilities.",
            "list": {
                "1": "Up to ৳4 Crore: 0%",
                "2": "৳4 Crore to ৳10 Crore: 10%",
                "3": "৳10 Crore to ৳20 Crore: 20%",
                "4": "৳20 Crore to ৳50 Crore: 30%",
                "5": "Above ৳50 Crore: 35%"
            }
        },
        "env_surcharge": {
            "title": "Environmental Surcharge",
            "desc": "Taxpayers owning multiple cars are subject to an environmental surcharge.",
            "list": {
                "1": "1st Car: No Surcharge",
                "2": "2nd Car: ৳25,000 to ৳3,50,000 (based on cc)",
                "3": "3rd Car & above: Progressive rates apply",
                "4": "Electric vehicles are exempt from this surcharge.",
                "5": "Surcharge must be paid at the time of registration or renewal."
            }
        },
        "corporate_tax": {
            "title": "Corporate Tax Rates",
            "list": {
                "1": "Publicly Traded Company: 20% - 22.5%",
                "2": "Non-Publicly Traded Company: 27.5%",
                "3": "One Person Company (OPC): 22.5%",
                "4": "Bank, Insurance, FI (Publicly Traded): 37.5%",
                "5": "Bank, Insurance, FI (Non-Publicly Traded): 40%"
            },
            "note": "Note: Conditional reduced rates apply if transactions are done through banking channels."
        },
        "rebate": {
            "title": "Investment Tax Rebate",
            "desc": "You can reduce your tax liability by investing in eligible sectors. The rebate is calculated as the lower of:",
            "calc_list": {
                "1": "15% of the actual investment",
                "2": "3% of total taxable income",
                "3": "৳10,00,000 (Maximum limit)"
            },
            "sectors_title": "Eligible Investment Sectors:",
            "sectors_list": {
                "1": "Life Insurance Premium",
                "2": "Deposit Pension Scheme (DPS) - Max ৳1,20,000",
                "3": "Investment in Sanchayapatra (Savings Certificates)",
                "4": "Stocks and Shares (Listed Companies)",
                "5": "Provident Fund Contributions",
                "6": "Benevolent Fund and Group Insurance"
            }
        },
        "documents": {
            "title": "Required Documents",
            "subtitle": "Keep these documents ready for filing",
            "list": {
                "1": {
                    "title": "Personal Documents",
                    "desc": "NID copy, TIN certificate, previous year's tax return acknowledgement."
                },
                "2": {
                    "title": "Salary Documents",
                    "desc": "Salary certificate, bank statement showing salary credit, provident fund statement."
                },
                "3": {
                    "title": "Investment Documents",
                    "desc": "Insurance premium receipts, DPS statement, Sanchayapatra purchase copies, stock broker report."
                },
                "4": {
                    "title": "Asset & Liability Documents",
                    "desc": "Bank statements, deed of land/flat, vehicle registration, loan statements."
                }
            }
        },
        "deadlines": {
            "title": "Important Deadlines",
            "list": {
                "1": "Tax Day (Individual): November 30, 2025",
                "2": "Tax Day (Company): January 15, 2026 (or 7 months after income year end)",
                "3": "Advance Tax Installment 1: September 15",
                "4": "Advance Tax Installment 2: December 15"
            },
            "warning": "Late filing may result in a penalty of 10% of tax imposed on the last assessed income or ৳1,000, whichever is higher, plus ৳50 per day of default."
        },
        "links": {
            "title": "Helpful Resources",
            "nbr_paripatra_en": "NBR Income Tax Paripatra (English)",
            "nbr_paripatra_bn": "NBR Income Tax Paripatra (Bangla)",
            "paripatra_pdf": "Download Paripatra 2025-26 PDF",
            "nbr_website": "National Board of Revenue (NBR) Website",
            "ereturn": "e-Return Portal"
        },
        "disclaimer": "Disclaimer: This guide is for general informational purposes only and does not constitute professional legal or tax advice. Tax laws are subject to change. Please consult with a professional tax practitioner or refer to the official NBR publications for your specific tax situation."
    },
    "deadline_popup": {
        "title": "Tax Filing Reminder",
        "warning": "Tax Return Deadline Approaching!",
        "message": "Only {{days}} days left to file your income tax return for FY {{year}}.",
        "deadline_date": "Deadline: {{date}}",
        "file_now_btn": "File Now",
        "remind_later": "Remind Me Later",
        "dismiss": "Dismiss"
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
    }
}

# Complete Bangla Translation
bn_data = {
    "sidebar": {
        "dashboard": "ড্যাশবোর্ড",
        "tax_form": "ট্যাক্স ফর্ম",
        "payment": "পেমেন্ট",
        "account": "অ্যাকাউন্ট",
        "admin_panel": "অ্যাডমিন প্যানেল",
        "users": "ব্যবহারকারী",
        "tax_slabs": "ট্যাক্স স্ল্যাব",
        "feedback": "মতামত",
        "logout": "লগআউট"
    },
    "dashboard": {
        "hello": "হ্যালো",
        "welcome_message": "আজ আপনার ট্যাক্সের অবস্থা এখানে দেখুন।",
        "complete_profile": "প্রোফাইল সম্পূর্ণ করুন",
        "tax_returns": "ট্যাক্স রিটার্ন",
        "total_paid": "মোট পরিশোধিত",
        "last_filing": "সর্বশেষ ফাইলিং",
        "recent_filings": "সাম্প্রতিক ফাইলিং",
        "new_filing": "নতুন ফাইলিং",
        "file_now": "ফাইল করুন",
        "no_returns": "এখনও কোন ট্যাক্স রিটার্ন জমা দেওয়া হয়নি।",
        "date": "তারিখ",
        "amount": "পরিমাণ",
        "status": "অবস্থা"
    },
    "account": {
        "title": "আমার অ্যাকাউন্ট",
        "subtitle": "ক্যালকুলেটর, ট্যাক্স গাইড এবং আপনার নথিপত্র—সব এক জায়গায়।",
        "tabs": {
            "calculators": "ক্যালকুলেটর",
            "guide": "ট্যাক্স গাইড",
            "documents": "নথিপত্র",
            "feedback": "মতামত"
        },
        "calculator": {
            "select_label": "ক্যালকুলেটর নির্বাচন করুন",
            "tax_calculator": "ট্যাক্স ক্যালকুলেটর",
            "loan_emi": "লোন ইএমআই",
            "fdr": "এফডিআর ক্যালকুলেটর",
            "sanchayapatra": "সঞ্চয়পত্র ক্যালকুলেটর",
            "title_2025": "ট্যাক্স ক্যালকুলেটর (২০২৫-২০২৬)",
            "category_label": "করদাতার ধরণ",
            "tax_free_limit": "করমুক্ত সীমা",
            "income_sources": "আয়ের উৎস",
            "salary": "বেতন ও মজুরি",
            "business": "ব্যবসা/পেশা",
            "rental": "ভাড়া আয়",
            "investment": "সুদ/বিনিয়োগ",
            "capital": "মূলধনী লাভ",
            "other": "অন্যান্য আয়",
            "deductions_label": "যোগ্য বিয়োজন",
            "deductions_hint": "ট্যাক্সের আগে বাদ দেওয়ার মতো অনুমোদিত খরচ লিখুন।",
            "investments_label": "রিবেটের জন্য যোগ্য বিনিয়োগ",
            "investments_hint": "রিবেট ভিত্তি করযোগ্য আয়ের {{percent}}% বা ৳{{cap}} এর মধ্যে যেটি কম।",
            "calculate_btn": "ট্যাক্স হিসাব করুন",
            "calculating": "হিসাব করা হচ্ছে...",
            "gross_income": "মোট আয়",
            "taxable_income": "করযোগ্য আয়",
            "tax_before_rebate": "রিবেট পূর্ববর্তী ট্যাক্স",
            "net_tax_payable": "নিট প্রদেয় ট্যাক্স",
            "rebate_applied": "বিনিয়োগ রিবেট প্রয়োগ করা হয়েছে",
            "breakdown_title": "হিসাবের বিবরণ",
            "slab_header": "স্ল্যাব",
            "rate_header": "হার",
            "taxable_amount_header": "করযোগ্য পরিমাণ",
            "tax_header": "ট্যাক্স",
            "nbr_link": "এনবিআর আয়কর পরিপত্র ২০২৫-২০২৬ খুলুন"
        },
        "documents": {
            "title": "নথিপত্র",
            "submissions_title": "ট্যাক্স জমা",
            "payments_title": "পেমেন্ট এবং রসিদ",
            "no_submissions": "কোন জমা নেই",
            "no_payments": "কোন পেমেন্ট নেই",
            "receipt_btn": "রসিদ"
        }
    },
    "profile": {
        "title": "আমার প্রোফাইল 👤",
        "subtitle": "আপনার ব্যক্তিগত তথ্য এবং ট্যাক্স বিবরণ পরিচালনা করুন।",
        "edit_title": "প্রোফাইল সম্পাদনা",
        "create_title": "প্রোফাইল তৈরি করুন",
        "personal_info": "ব্যক্তিগত তথ্য",
        "full_name": "পুরো নাম",
        "phone": "ফোন নম্বর",
        "address": "ঠিকানা",
        "tax_details": "ট্যাক্স বিবরণ",
        "nid": "জাতীয় পরিচয়পত্র (NID)",
        "tin": "টিআইএন (TIN)",
        "occupation": "পেশা",
        "annual_income": "বার্ষিক আয়",
        "save_btn": "প্রোফাইল সংরক্ষণ করুন",
        "update_btn": "প্রোফাইল আপডেট করুন",
        "saving": "সংরক্ষণ করা হচ্ছে...",
        "success_update": "প্রোফাইল সফলভাবে আপডেট করা হয়েছে!",
        "success_create": "প্রোফাইল সফলভাবে তৈরি করা হয়েছে!",
        "enter_name": "আপনার পুরো নাম লিখুন",
        "enter_phone": "ফোন নম্বর লিখুন",
        "enter_address": "আপনার সম্পূর্ণ ঠিকানা লিখুন",
        "enter_nid": "NID লিখুন",
        "enter_tin": "ট্যাক্স আইডেন্টিফিকেশন নম্বর (ঐচ্ছিক)",
        "enter_occupation": "আপনার পেশা",
        "enter_income": "বার্ষিক আয় লিখুন"
    },
    "common": {
        "loading": "লোড হচ্ছে..."
    },
    "landing": {
        "header": {
            "title": "TaxC",
            "subtitle": "স্মার্ট ট্যাক্স ফাইলিং প্ল্যাটফর্ম",
            "login": "লগইন",
            "about": "সম্পর্কে",
            "features": "বৈশিষ্ট্য"
        },
        "footer": {
            "brand_desc": "TaxC বাংলাদেশে সহজ, নিরাপদ এবং সঠিক ট্যাক্স ফাইলিংয়ের জন্য আপনার বিশ্বস্ত সহযোগী।",
            "quick_links": "দ্রুত লিঙ্ক",
            "features": "বৈশিষ্ট্য",
            "about": "আমাদের সম্পর্কে",
            "login": "লগইন",
            "tax_sheet": "ট্যাক্স শিট",
            "support": "সহায়তা",
            "help_center": "হেল্প সেন্টার",
            "contact_nbr": "এনবিআর যোগাযোগ",
            "status": "সিস্টেম স্ট্যাটাস",
            "copyright": "© ২০২৫ TaxC. সর্বস্বত্ব সংরক্ষিত।",
            "privacy": "গোপনীয়তা নীতি",
            "terms": "ব্যবহারের শর্তাবলী",
            "about_title": "TaxC সম্পর্কে",
            "about_text": "TaxC বাংলাদেশে আপনার বিশ্বস্ত ট্যাক্স ফাইলিং পার্টনার।",
            "links_title": "দ্রুত লিঙ্ক",
            "guide": "ট্যাক্স গাইড",
            "calculator": "ক্যালকুলেটর",
            "contact_title": "যোগাযোগ",
            "email": "support@taxc.com",
            "phone": "+৮৮০ ১২৩৪-৫৬৭৮৯০"
        },
        "hero": {
            "eyebrow": "আধুনিক ট্যাক্স ফাইলিং",
            "title": "আপনার ট্যাক্স ফাইল করুন আত্মবিশ্বাসের সাথে",
            "subtitle": "বাংলাদেশের ব্যক্তি এবং ব্যবসার জন্য স্মার্ট, সহজ এবং নিরাপদ ট্যাক্স ফাইলিং।",
            "get_started": "শুরু করুন",
            "have_account": "আমার অ্যাকাউন্ট আছে",
            "badges": {
                "iso": "ISO 27001 সার্টিফাইড",
                "gdpr": "GDPR কমপ্লায়েন্ট",
                "ledger": "ব্লকচেইন লেজার"
            },
            "panel": {
                "filing_year": "ফাইলিং বছর",
                "due_in": "বাকি আছে",
                "est_dues": "আনুমানিক বকেয়া",
                "savings": "সম্ভাব্য সাশ্রয়",
                "documentation": "নথিপত্রের অবস্থা",
                "review_submit": "রিভিউ এবং জমা দিন"
            }
        },
        "stats": {
            "active_filers": "সক্রিয় ফাইলার",
            "active_filers_detail": "সারা বাংলাদেশে",
            "processing": "গড় প্রসেসিং",
            "processing_detail": "জমা দেওয়া থেকে অনুমোদন পর্যন্ত",
            "success": "সাফল্যের হার",
            "success_detail": "ট্যাক্স ফাইলিং অনুমোদিত"
        },
        "features": {
            "eyebrow": "বৈশিষ্ট্য",
            "title": "আত্মবিশ্বাসের সাথে ফাইল করার জন্য যা কিছু প্রয়োজন",
            "cards": {
                "1": {
                    "title": "স্মার্ট ট্যাক্স ক্যালকুলেটর",
                    "copy": "আমাদের এনবিআর-কমপ্লায়েন্ট ক্যালকুলেটর দিয়ে আপনার ট্যাক্স সঠিকভাবে হিসাব করুন।"
                },
                "2": {
                    "title": "ডকুমেন্ট ম্যানেজমেন্ট",
                    "copy": "আপনার সমস্ত ট্যাক্স ডকুমেন্ট এক জায়গায় নিরাপদে সংরক্ষণ এবং সাজান।"
                },
                "3": {
                    "title": "এআই ট্যাক্স অ্যাসিস্ট্যান্ট",
                    "copy": "আমাদের এআই চ্যাটবটের মাধ্যমে আপনার ট্যাক্স প্রশ্নের তাৎক্ষণিক উত্তর পান।"
                },
                "4": {
                    "title": "ই-ফাইলিং রেডি",
                    "copy": "আমাদের ইন্টিগ্রেটেড ই-ফাইলিং দিয়ে সরাসরি এনবিআর-এ আপনার রিটার্ন জমা দিন।"
                }
            }
        },
        "workflow": {
            "eyebrow": "কিভাবে কাজ করে",
            "title": "৪টি সহজ ধাপে ফাইল করুন",
            "steps": {
                "1": {
                    "title": "প্রোফাইল তৈরি করুন",
                    "detail": "মৌলিক তথ্য দিয়ে আপনার করদাতা প্রোফাইল সেট আপ করুন।"
                },
                "2": {
                    "title": "আয় লিখুন",
                    "detail": "আপনার আয়ের উৎস এবং বিয়োজন যোগ করুন।"
                },
                "3": {
                    "title": "ট্যাক্স হিসাব করুন",
                    "detail": "আমাদের সিস্টেম তাৎক্ষণিকভাবে আপনার ট্যাক্স দায় হিসাব করে।"
                },
                "4": {
                    "title": "জমা দিন এবং পেমেন্ট করুন",
                    "detail": "রিভিউ করুন, আপনার রিটার্ন জমা দিন এবং পেমেন্ট করুন।"
                }
            }
        },
        "benefits": {
            "eyebrow": "কেন TaxC বেছে নেবেন",
            "title": "TaxC ব্যবহারের সুবিধা",
            "1": {
                "title": "সময় বাঁচান",
                "detail": "ঘন্টার পর ঘন্টা নয়, মিনিটে আপনার ট্যাক্স ফাইল করুন।"
            },
            "2": {
                "title": "সর্বোচ্চ সাশ্রয়",
                "detail": "সমস্ত যোগ্য বিয়োজন এবং রিবেট পান।"
            },
            "3": {
                "title": "কমপ্লায়েন্ট থাকুন",
                "detail": "সর্বদা সর্বশেষ ট্যাক্স আইনের সাথে আপডেট থাকুন।"
            }
        },
        "faq": {
            "eyebrow": "প্রশ্নাবলী",
            "title": "সচরাচর জিজ্ঞাসিত প্রশ্ন",
            "items": {
                "eligibility": {
                    "q": "কারা TaxC ব্যবহার করতে পারে?",
                    "a": "বাংলাদেশের যেকোনো ব্যক্তি বা ব্যবসায়িক করদাতা তাদের ট্যাক্স রিটার্ন ফাইল করতে TaxC ব্যবহার করতে পারেন।"
                },
                "security": {
                    "q": "আমার ডেটা কি নিরাপদ?",
                    "a": "হ্যাঁ, আমরা ব্যাংক-লেভেল এনক্রিপশন ব্যবহার করি এবং আন্তর্জাতিক ডেটা সুরক্ষা মান মেনে চলি।"
                },
                "pricing": {
                    "q": "এর খরচ কত?",
                    "a": "ব্যক্তিগত করদাতাদের জন্য TaxC বিনামূল্যে। ব্যবসায়িক প্যাকেজ ৫,০০০ টাকা/বছর থেকে শুরু।"
                },
                "support": {
                    "q": "আপনারা কি সহায়তা প্রদান করেন?",
                    "a": "হ্যাঁ, আমাদের সাপোর্ট টিম চ্যাট, ইমেল এবং ফোনের মাধ্যমে ২৪/৭ উপলব্ধ।"
                }
            }
        },
        "cta": {
            "eyebrow": "আজই শুরু করুন",
            "title": "আপনার ট্যাক্স ফাইল করতে প্রস্তুত?",
            "subtitle": "হাজার হাজার সন্তুষ্ট ব্যবহারকারীর সাথে যোগ দিন যারা TaxC-কে বিশ্বাস করেন।",
            "btn": "ফ্রি অ্যাকাউন্ট তৈরি করুন"
        }
    },
    "feedback": {
        "title": "মতামত",
        "subtitle": "আমরা আপনার মতামতকে গুরুত্ব দিই! আমাদের জানান কিভাবে আমরা উন্নতি করতে পারি।",
        "subject_label": "বিষয়",
        "subject_placeholder": "আপনার মতামতের সংক্ষিপ্ত বিবরণ",
        "message_label": "আপনার মতামত",
        "message_placeholder": "অনুগ্রহ করে আপনার চিন্তা, পরামর্শ বা সমস্যা শেয়ার করুন...",
        "submit_btn": "মতামত জমা দিন",
        "submitting": "জমা দেওয়া হচ্ছে...",
        "fill_all": "অনুগ্রহ করে সব ফিল্ড পূরণ করুন",
        "success": "ধন্যবাদ! আপনার মতামত সফলভাবে জমা দেওয়া হয়েছে।",
        "error": "মতামত জমা দিতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
    },
    "tax_guide": {
        "title": "বাংলাদেশ আয়কর গাইড ২০২৫-২০২৬",
        "subtitle": "বাংলাদেশে আয়কর বোঝার জন্য আপনার সম্পূর্ণ গাইড",
        "toc_title": "সূচিপত্র",
        "disclaimer_title": "দাবিত্যাগ",
        "disclaimer_text": "এই গাইডটি শুধুমাত্র তথ্যগত উদ্দেশ্যে এবং এটি পেশাদার কর পরামর্শ হিসেবে বিবেচনা করা উচিত নয়।",
        "sections": {
            "intro": {
                "title": "আয়কর পরিচিতি",
                "content": "আয়কর হলো সরকার কর্তৃক ব্যক্তি এবং কর্পোরেট আয়ের উপর আরোপিত একটি প্রত্যক্ষ কর।"
            },
            "who_pays": {
                "title": "কাদের আয়কর দিতে হবে?",
                "content": "বাংলাদেশের সকল নাগরিক এবং বাসিন্দা যারা ন্যূনতম করযোগ্য সীমার উপরে আয় করেন তাদের অবশ্যই আয়কর রিটার্ন জমা দিতে হবে।"
            },
            "categories": {
                "title": "করদাতার ধরণ",
                "content": "করদাতাদের বিভিন্ন করমুক্ত সীমা সহ বিভিন্ন বিভাগে শ্রেণীবদ্ধ করা হয়।"
            },
            "slabs": {
                "title": "ট্যাক্স স্ল্যাব এবং হার",
                "content": "বাংলাদেশ একটি প্রগতিশীল কর ব্যবস্থা অনুসরণ করে যেখানে আয়ের স্তরের সাথে করের হার বৃদ্ধি পায়।"
            },
            "deductions": {
                "title": "বিয়োজন এবং রিবেট",
                "content": "করযোগ্য আয় কমাতে বিভিন্ন বিয়োজন উপলব্ধ, যার মধ্যে বিনিয়োগ রিবেট অন্তর্ভুক্ত।"
            },
            "filing": {
                "title": "আপনার রিটার্ন জমা দেওয়া",
                "content": "নির্দিষ্ট সময়সীমার মধ্যে বার্ষিক রিটার্ন জমা দিতে হবে।"
            },
            "penalties": {
                "title": "অ-সম্মতির জন্য জরিমানা",
                "content": "সময়মতো রিটার্ন জমা না দিলে বা কর পরিশোধ না করলে জরিমানা হতে পারে।"
            }
        },
        "reminder": {
            "title": "ট্যাক্স ডে রিমাইন্ডার",
            "text": "ব্যক্তিগত করদাতাদের জন্য আয়কর রিটার্ন জমা দেওয়ার শেষ তারিখ ৩০ নভেম্বর, ২০২৫। জরিমানা এড়াতে অনুগ্রহ করে সময়মতো ফাইল করুন।"
        },
        "tax_free_limits": {
            "title": "করমুক্ত আয়ের সীমা",
            "subtitle": "এই সীমা পর্যন্ত আয় করমুক্ত",
            "category": "করদাতার ধরণ",
            "limit": "করমুক্ত সীমা"
        },
        "tax_rates": {
            "title": "করের হার (ব্যক্তিগত)",
            "subtitle": "আয়ের স্তরের উপর ভিত্তি করে প্রগতিশীল করের হার",
            "range": "আয়ের সীমা",
            "rate": "করের হার",
            "note": "দ্রষ্টব্য: ন্যূনতম প্রদেয় কর অবস্থানভেদে ভিন্ন হয় (ঢাকা/চট্টগ্রাম: ৫,০০০ টাকা, অন্যান্য সিটি কর্পোরেশন: ৪,০০০ টাকা, সিটি কর্পোরেশনের বাইরে: ৩,০০০ টাকা)।"
        },
        "min_tax": {
            "title": "ন্যূনতম কর",
            "desc": "আপনার হিসাবকৃত কর শূন্য বা ন্যূনতম পরিমাণের কম হলেও, নির্দিষ্ট শর্তে আপনাকে ন্যূনতম কর দিতে হবে।",
            "list": {
                "1": "ঢাকা উত্তর, ঢাকা দক্ষিণ এবং চট্টগ্রাম সিটি কর্পোরেশন: ৫,০০০ টাকা",
                "2": "অন্যান্য সিটি কর্পোরেশন: ৪,০০০ টাকা",
                "3": "সিটি কর্পোরেশনের বাইরের এলাকা: ৩,০০০ টাকা"
            },
            "tip": "টিপস: আপনার করযোগ্য আয় করমুক্ত সীমার নিচে হলে, সাধারণত আপনাকে ন্যূনতম কর দিতে হবে না যদি না বিশেষ শর্ত প্রযোজ্য হয়।"
        },
        "wealth_surcharge": {
            "title": "নিট সম্পদ সারচার্জ",
            "desc": "আপনার সম্পদ ও দায় বিবরণীতে প্রদর্শিত নিট সম্পদের উপর ভিত্তি করে অতিরিক্ত সারচার্জ প্রদেয়।",
            "list": {
                "1": "৪ কোটি টাকা পর্যন্ত: ০%",
                "2": "৪ কোটি থেকে ১০ কোটি টাকা: ১০%",
                "3": "১০ কোটি থেকে ২০ কোটি টাকা: ২০%",
                "4": "২০ কোটি থেকে ৫০ কোটি টাকা: ৩০%",
                "5": "৫০ কোটি টাকার উপরে: ৩৫%"
            }
        },
        "env_surcharge": {
            "title": "পরিবেশ সুরক্ষা সারচার্জ",
            "desc": "একাধিক গাড়ির মালিক করদাতাদের পরিবেশ সুরক্ষা সারচার্জ দিতে হবে।",
            "list": {
                "1": "১ম গাড়ি: কোন সারচার্জ নেই",
                "2": "২য় গাড়ি: ২৫,০০০ থেকে ৩,৫০,০০০ টাকা (সিসি ভিত্তিক)",
                "3": "৩য় গাড়ি ও তদূর্ধ্ব: প্রগতিশীল হার প্রযোজ্য",
                "4": "বৈদ্যুতিক গাড়ি এই সারচার্জ থেকে মুক্ত।",
                "5": "রেজিস্ট্রেশন বা নবায়নের সময় সারচার্জ পরিশোধ করতে হবে।"
            }
        },
        "corporate_tax": {
            "title": "কর্পোরেট করের হার",
            "list": {
                "1": "পাবলিকলি ট্রেডেড কোম্পানি: ২০% - ২২.৫%",
                "2": "নন-পাবলিকলি ট্রেডেড কোম্পানি: ২৭.৫%",
                "3": "এক ব্যক্তি কোম্পানি (OPC): ২২.৫%",
                "4": "ব্যাংক, বীমা, আর্থিক প্রতিষ্ঠান (পাবলিকলি ট্রেডেড): ৩৭.৫%",
                "5": "ব্যাংক, বীমা, আর্থিক প্রতিষ্ঠান (নন-পাবলিকলি ট্রেডেড): ৪০%"
            },
            "note": "দ্রষ্টব্য: ব্যাংকিং চ্যানেলে লেনদেন হলে শর্তসাপেক্ষে হ্রাসকৃত হার প্রযোজ্য।"
        },
        "rebate": {
            "title": "বিনিয়োগ কর রেয়াত",
            "desc": "যোগ্য খাতে বিনিয়োগ করে আপনি আপনার কর দায় কমাতে পারেন। রেয়াত নিচের তিনটির মধ্যে যেটি কম তার উপর ভিত্তি করে হিসাব করা হয়:",
            "calc_list": {
                "1": "প্রকৃত বিনিয়োগের ১৫%",
                "2": "মোট করযোগ্য আয়ের ৩%",
                "3": "১০,০০,০০০ টাকা (সর্বোচ্চ সীমা)"
            },
            "sectors_title": "যোগ্য বিনিয়োগ খাতসমূহ:",
            "sectors_list": {
                "1": "জীবন বীমা প্রিমিয়াম",
                "2": "ডিপোজিট পেনশন স্কিম (DPS) - সর্বোচ্চ ১,২০,০০০ টাকা",
                "3": "সঞ্চয়পত্রে বিনিয়োগ",
                "4": "স্টক এবং শেয়ার (তালিকাভুক্ত কোম্পানি)",
                "5": "ভবিষ্য তহবিল (Provident Fund) অবদান",
                "6": "বেনেভোলেন্ট ফান্ড এবং গ্রুপ ইন্স্যুরেন্স"
            }
        },
        "documents": {
            "title": "প্রয়োজনীয় নথিপত্র",
            "subtitle": "ফাইলিংয়ের জন্য এই নথিপত্রগুলো প্রস্তুত রাখুন",
            "list": {
                "1": {
                    "title": "ব্যক্তিগত নথিপত্র",
                    "desc": "এনআইডি কপি, টিআইএন সার্টিফিকেট, গত বছরের ট্যাক্স রিটার্ন প্রাপ্তিস্বীকারপত্র।"
                },
                "2": {
                    "title": "বেতন সংক্রান্ত নথিপত্র",
                    "desc": "বেতন সার্টিফিকেট, বেতন জমার ব্যাংক স্টেটমেন্ট, প্রভিডেন্ট ফান্ড স্টেটমেন্ট।"
                },
                "3": {
                    "title": "বিনিয়োগ নথিপত্র",
                    "desc": "বীমা প্রিমিয়াম রসিদ, ডিপিএস স্টেটমেন্ট, সঞ্চয়পত্র ক্রয়ের কপি, স্টক ব্রোকার রিপোর্ট।"
                },
                "4": {
                    "title": "সম্পদ ও দায় নথিপত্র",
                    "desc": "ব্যাংক স্টেটমেন্ট, জমি/ফ্ল্যাটের দলিল, গাড়ির রেজিস্ট্রেশন, লোন স্টেটমেন্ট।"
                }
            }
        },
        "deadlines": {
            "title": "গুরুত্বপূর্ণ সময়সীমা",
            "list": {
                "1": "ট্যাক্স ডে (ব্যক্তিগত): ৩০ নভেম্বর, ২০২৫",
                "2": "ট্যাক্স ডে (কোম্পানি): ১৫ জানুয়ারি, ২০২৬ (বা আয় বছর শেষের ৭ মাস পর)",
                "3": "অগ্রিম কর কিস্তি ১: ১৫ সেপ্টেম্বর",
                "4": "অগ্রিম কর কিস্তি ২: ১৫ ডিসেম্বর"
            },
            "warning": "দেরিতে ফাইল করলে শেষ নিরূপিত আয়ের উপর আরোপিত করের ১০% বা ১,০০০ টাকা (যেটি বেশি) এবং প্রতিদিনের বিলম্বের জন্য ৫০ টাকা জরিমানা হতে পারে।"
        },
        "links": {
            "title": "সহায়ক রিসোর্স",
            "nbr_paripatra_en": "এনবিআর আয়কর পরিপত্র (ইংরেজি)",
            "nbr_paripatra_bn": "এনবিআর আয়কর পরিপত্র (বাংলা)",
            "paripatra_pdf": "পরিপত্র ২০২৫-২৬ পিডিএফ ডাউনলোড করুন",
            "nbr_website": "জাতীয় রাজস্ব বোর্ড (NBR) ওয়েবসাইট",
            "ereturn": "ই-রিটার্ন পোর্টাল"
        },
        "disclaimer": "দাবিত্যাগ: এই গাইডটি শুধুমাত্র সাধারণ তথ্যের জন্য এবং এটি পেশাদার আইনি বা কর পরামর্শ নয়। কর আইন পরিবর্তন হতে পারে। আপনার নির্দিষ্ট কর পরিস্থিতির জন্য অনুগ্রহ করে একজন পেশাদার কর আইনজীবীর সাথে পরামর্শ করুন বা এনবিআর-এর অফিসিয়াল প্রকাশনা দেখুন।"
    },
    "auth": {
        "login": {
            "title": "TaxC-তে লগইন করুন",
            "email_label": "ইমেল ঠিকানা",
            "email_placeholder": "আপনার ইমেল লিখুন",
            "password_label": "পাসওয়ার্ড",
            "password_placeholder": "আপনার পাসওয়ার্ড লিখুন",
            "login_btn": "লগইন",
            "logging_in": "লগইন করা হচ্ছে...",
            "no_account": "অ্যাকাউন্ট নেই?",
            "register_link": "এখানে রেজিস্টার করুন",
            "failed": "লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে আপনার তথ্য যাচাই করুন।"
        },
        "register": {
            "title": "অ্যাকাউন্ট তৈরি করুন",
            "name_label": "পুরো নাম",
            "name_placeholder": "আপনার পুরো নাম লিখুন",
            "email_label": "ইমেল ঠিকানা",
            "email_placeholder": "আপনার ইমেল লিখুন",
            "password_label": "পাসওয়ার্ড",
            "password_placeholder": "একটি পাসওয়ার্ড তৈরি করুন",
            "confirm_password_label": "পাসওয়ার্ড নিশ্চিত করুন",
            "confirm_password_placeholder": "আপনার পাসওয়ার্ড পুনরায় লিখুন",
            "register_btn": "অ্যাকাউন্ট তৈরি করুন",
            "registering": "অ্যাকাউন্ট তৈরি করা হচ্ছে...",
            "have_account": "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
            "login_link": "এখানে লগইন করুন",
            "failed": "রেজিস্ট্রেশন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
            "password_mismatch": "পাসওয়ার্ড মিলছে না"
        }
    },
    "deadline_popup": {
        "title": "ট্যাক্স ফাইলিং রিমাইন্ডার",
        "warning": "ট্যাক্স রিটার্ন জমা দেওয়ার সময়সীমা ঘনিয়ে আসছে!",
        "message": "অর্থবছর {{year}}-এর জন্য আপনার আয়কর রিটার্ন জমা দিতে মাত্র {{days}} দিন বাকি।",
        "deadline_date": "সময়সীমা: {{date}}",
        "file_now_btn": "এখনই ফাইল করুন",
        "remind_later": "পরে মনে করিয়ে দিন",
        "dismiss": "খারিজ করুন"
    },
    "payment": {
        "title": "পেমেন্ট 💳",
        "subtitle": "আপনার ট্যাক্স পেমেন্ট পরিচালনা করুন এবং লেনদেনের ইতিহাস দেখুন।",
        "make_payment": "পেমেন্ট করুন",
        "amount_label": "টাকার পরিমাণ",
        "pay_btn": "এখনই পেমেন্ট করুন",
        "processing": "প্রসেসিং...",
        "secure_msg": "SSL এনক্রিপশনের মাধ্যমে নিরাপদ পেমেন্ট প্রসেসিং।",
        "history_title": "লেনদেনের ইতিহাস",
        "search_placeholder": "আইডি খুঁজুন...",
        "no_transactions": "কোন লেনদেন পাওয়া যায়নি।",
        "table": {
            "id": "ট্রানজেকশন আইডি",
            "date": "তারিখ",
            "status": "অবস্থা",
            "amount": "পরিমাণ",
            "completed": "সম্পন্ন"
        },
        "messages": {
            "enter_amount": "অনুগ্রহ করে সঠিক পরিমাণ লিখুন",
            "success": "পেমেন্ট সফল হয়েছে!",
            "failed": "পেমেন্ট ব্যর্থ হয়েছে"
        }
    },
    "tax_form": {
        "title": "ট্যাক্স রিটার্ন ফাইল করুন 📝",
        "subtitle": "আপনার ট্যাক্স হিসাব করুন এবং কয়েক ক্লিকেই রিটার্ন জমা দিন।",
        "income_details": "আয়ের বিবরণ",
        "annual_income_label": "মোট বার্ষিক আয়",
        "helper_text": "অর্থবছরের জন্য আপনার মোট করযোগ্য আয় লিখুন।",
        "calculate_btn": "ট্যাক্স হিসাব করুন",
        "processing": "প্রসেসিং...",
        "result_title": "হিসাবের ফলাফল",
        "fiscal_year": "অর্থবছর ২০২৪-২৫",
        "total_income": "মোট আয়",
        "tax_payable": "প্রদেয় ট্যাক্স",
        "effective_rate": "কার্যকর হার",
        "breakdown": "বিবরণ",
        "submit_btn": "রিটার্ন জমা দিন",
        "tax_slabs": "ট্যাক্স স্ল্যাব",
        "messages": {
            "enter_income": "অনুগ্রহ করে সঠিক আয় লিখুন",
            "calc_failed": "হিসাব ব্যর্থ হয়েছে",
            "calc_first": "অনুগ্রহ করে প্রথমে ট্যাক্স হিসাব করুন",
            "success": "ট্যাক্স ফর্ম সফলভাবে জমা দেওয়া হয়েছে! পেমেন্ট সম্পন্ন করতে পেমেন্ট পেজে যান।",
            "submit_failed": "জমা দিতে ব্যর্থ হয়েছে"
        }
    }
}

def write_json(path, data):
    try:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Successfully wrote {path}")
    except Exception as e:
        print(f"Error writing {path}: {e}")

write_json('src/locales/en/translation.json', en_data)
write_json('src/locales/bn/translation.json', bn_data)
