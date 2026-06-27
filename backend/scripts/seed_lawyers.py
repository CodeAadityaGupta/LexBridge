"""
Usage: python scripts/seed_lawyers.py
Run once to populate the lawyers table with 8 test lawyers covering
Criminal Law, Property Law, Family Law, Labour Law, Consumer Disputes,
and Cyber Law.
"""
import sys
import os

sys.path.insert(0, os.path.abspath("."))

from services.auth.supabase_client import supabase_service

lawyers = [
    {
        "name": "Rohan Sharma",
        "city": "Mumbai",
        "bar_registration": "MH/ADV/1234",
        "email": "rohan.sharma@lexbridge.app",
        "experience_years": 12,
        "specialities": ["Criminal Law", "Bail Applications", "White Collar Crime"],
        "about": "Rohan Sharma is a senior criminal defence advocate with 12 years of practice in the Bombay High Court. He has handled over 200 bail matters and has a strong track record in financial fraud cases.",
        "consultation_fee": 1500,
        "retainer_min": 25000,
        "retainer_max": 60000,
        "rating": 4.8,
        "notable_cases": [
            {
                "title": "Bail granted in securities fraud case",
                "year": 2023,
                "outcome": "Won",
                "summary": "Secured bail for client at Bombay High Court after sessions court denial in a multi-crore fraud matter.",
            },
            {
                "title": "Acquittal in assault case",
                "year": 2022,
                "outcome": "Won",
                "summary": "Established alibi through CCTV and digital evidence, resulting in full acquittal at trial.",
            },
        ],
    },
    {
        "name": "Priya Menon",
        "city": "Bengaluru",
        "bar_registration": "KA/ADV/5678",
        "email": "priya.menon@lexbridge.app",
        "experience_years": 8,
        "specialities": ["Property Law", "Tenancy Disputes", "Real Estate Transactions"],
        "about": "Priya Menon specialises in residential and commercial property disputes. She has advised clients on over 150 property transactions and represented landlords and tenants across the Karnataka Rent Control Act.",
        "consultation_fee": 2000,
        "retainer_min": 30000,
        "retainer_max": 80000,
        "rating": 4.9,
        "notable_cases": [
            {
                "title": "Wrongful eviction — possession restored",
                "year": 2024,
                "outcome": "Won",
                "summary": "Obtained interim injunction restoring possession to tenant within 48 hours of wrongful lockout.",
            }
        ],
    },
    {
        "name": "Ananya Krishnan",
        "city": "Chennai",
        "bar_registration": "TN/ADV/2201",
        "email": "ananya.krishnan@lexbridge.app",
        "experience_years": 10,
        "specialities": ["Family Law", "Divorce", "Child Custody"],
        "about": "Ananya Krishnan has over a decade of experience in family law matters before the Madras High Court. She is known for compassionate client handling and strong mediation skills.",
        "consultation_fee": 1800,
        "retainer_min": 20000,
        "retainer_max": 50000,
        "rating": 4.7,
        "notable_cases": [
            {
                "title": "Child custody — overseas relocation blocked",
                "year": 2023,
                "outcome": "Won",
                "summary": "Prevented unilateral relocation of minor child to the UK, securing primary custody for the client.",
            },
            {
                "title": "Matrimonial property settlement",
                "year": 2022,
                "outcome": "Settled",
                "summary": "Negotiated equitable division of joint assets worth ₹2 crore without contested litigation.",
            },
        ],
    },
    {
        "name": "Vikram Nair",
        "city": "Delhi",
        "bar_registration": "DL/ADV/9910",
        "email": "vikram.nair@lexbridge.app",
        "experience_years": 15,
        "specialities": ["Labour Law", "Employment Disputes", "Wrongful Termination"],
        "about": "Vikram Nair is a labour law specialist with 15 years of experience at the Delhi High Court and various labour tribunals. He represents both employees and employers in complex employment disputes.",
        "consultation_fee": 2500,
        "retainer_min": 40000,
        "retainer_max": 100000,
        "rating": 4.6,
        "notable_cases": [
            {
                "title": "Wrongful termination — reinstatement ordered",
                "year": 2024,
                "outcome": "Won",
                "summary": "Secured reinstatement and full back-wages for a factory worker dismissed without due procedure under the Industrial Disputes Act.",
            },
            {
                "title": "PF dispute — employer compliance",
                "year": 2023,
                "outcome": "Won",
                "summary": "Compelled employer to deposit withheld Provident Fund contributions amounting to ₹18 lakhs.",
            },
        ],
    },
    {
        "name": "Sneha Patil",
        "city": "Pune",
        "bar_registration": "MH/ADV/4477",
        "email": "sneha.patil@lexbridge.app",
        "experience_years": 6,
        "specialities": ["Consumer Disputes", "RERA", "E-Commerce Fraud"],
        "about": "Sneha Patil focuses exclusively on consumer protection matters under the Consumer Protection Act 2019 and RERA. She has filed over 300 consumer complaints and has a 90% favourable outcome rate.",
        "consultation_fee": 1000,
        "retainer_min": 15000,
        "retainer_max": 35000,
        "rating": 4.5,
        "notable_cases": [
            {
                "title": "Builder delayed possession — RERA compensation",
                "year": 2024,
                "outcome": "Won",
                "summary": "Obtained full interest compensation and penalty against a builder for 3-year possession delay under RERA.",
            },
            {
                "title": "E-commerce refund — District Commission",
                "year": 2023,
                "outcome": "Won",
                "summary": "Recovered ₹95,000 plus compensation from an online retailer who refused to refund a defective product.",
            },
        ],
    },
    {
        "name": "Arjun Mehta",
        "city": "Hyderabad",
        "bar_registration": "TS/ADV/6623",
        "email": "arjun.mehta@lexbridge.app",
        "experience_years": 9,
        "specialities": ["Cyber Law", "Data Privacy", "IT Act Offences"],
        "about": "Arjun Mehta is one of Hyderabad's leading cyber law practitioners. He advises startups on data privacy compliance and represents clients in IT Act offence cases including cyber fraud and identity theft.",
        "consultation_fee": 2000,
        "retainer_min": 30000,
        "retainer_max": 75000,
        "rating": 4.8,
        "notable_cases": [
            {
                "title": "Online defamation — FIR quashed",
                "year": 2024,
                "outcome": "Won",
                "summary": "Successfully quashed FIR filed under Section 67 IT Act by establishing protected speech in a social media dispute.",
            },
            {
                "title": "UPI fraud recovery",
                "year": 2023,
                "outcome": "Won",
                "summary": "Coordinated with cybercrime cell and bank to freeze and recover ₹4.2 lakhs lost in phishing fraud within 72 hours.",
            },
        ],
    },
    {
        "name": "Kavitha Reddy",
        "city": "Bengaluru",
        "bar_registration": "KA/ADV/8801",
        "email": "kavitha.reddy@lexbridge.app",
        "experience_years": 11,
        "specialities": ["Criminal Law", "Anticipatory Bail", "Domestic Violence"],
        "about": "Kavitha Reddy is an experienced criminal advocate with expertise in POCSO cases, domestic violence matters under the Protection of Women from Domestic Violence Act, and anticipatory bail applications.",
        "consultation_fee": 1500,
        "retainer_min": 20000,
        "retainer_max": 55000,
        "rating": 4.7,
        "notable_cases": [
            {
                "title": "Anticipatory bail in POCSO matter",
                "year": 2023,
                "outcome": "Won",
                "summary": "Secured anticipatory bail for a falsely accused teacher, with charges later dropped after investigation.",
            },
            {
                "title": "DV Act protection order",
                "year": 2024,
                "outcome": "Won",
                "summary": "Obtained emergency protection order and residence rights for a domestic violence survivor within 48 hours.",
            },
        ],
    },
    {
        "name": "Sanjay Iyer",
        "city": "Mumbai",
        "bar_registration": "MH/ADV/3392",
        "email": "sanjay.iyer@lexbridge.app",
        "experience_years": 18,
        "specialities": ["Property Law", "Inheritance Disputes", "Will Contestation"],
        "about": "Sanjay Iyer is a senior property and probate lawyer with 18 years at the Bombay High Court. He specialises in succession disputes, will contests, and intestate inheritance matters under Indian Succession Act.",
        "consultation_fee": 3000,
        "retainer_min": 50000,
        "retainer_max": 150000,
        "rating": 4.9,
        "notable_cases": [
            {
                "title": "Will contestation — estate of ₹5 crore",
                "year": 2022,
                "outcome": "Won",
                "summary": "Proved undue influence and mental incapacity, resulting in the disputed will being set aside by the High Court.",
            },
            {
                "title": "Partition of ancestral property",
                "year": 2023,
                "outcome": "Settled",
                "summary": "Mediated partition of a 3-acre ancestral plot among 5 legal heirs, avoiding 10+ years of civil litigation.",
            },
        ],
    },
]

if __name__ == "__main__":
    response = supabase_service.table("lawyers").insert(lawyers).execute()
    print(f"Seeded {len(response.data)} lawyers successfully.")
