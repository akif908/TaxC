import json
import os

# English Updates
en_updates = {
    "landing": {
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
            "terms": "Terms of Service"
        }
    },
    "tax_guide": {
        "title": "Bangladesh Income Tax Guide 2025-2026",
        "subtitle": "Your complete guide to understanding income tax regulations, rates, and filing procedures in Bangladesh for the assessment year 2025-26.",
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
    }
}

# Bangla Updates
bn_updates = {
    "landing": {
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
            "terms": "ব্যবহারের শর্তাবলী"
        }
    },
    "tax_guide": {
        "title": "বাংলাদেশ আয়কর গাইড ২০২৫-২০২৬",
        "subtitle": "২০২৫-২৬ করবর্ষের জন্য বাংলাদেশের আয়কর বিধিমালা, হার এবং ফাইলিং পদ্ধতি বোঝার সম্পূর্ণ গাইড।",
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
    }
}

def update_file(path, updates):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Deep update helper
        def deep_update(source, overrides):
            for key, value in overrides.items():
                if isinstance(value, dict) and value:
                    returned = deep_update(source.get(key, {}), value)
                    source[key] = returned
                else:
                    source[key] = overrides[key]
            return source

        data = deep_update(data, updates)
        
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Updated {path}")
    except Exception as e:
        print(f"Error updating {path}: {e}")

update_file('src/locales/en/translation.json', en_updates)
update_file('src/locales/bn/translation.json', bn_updates)
