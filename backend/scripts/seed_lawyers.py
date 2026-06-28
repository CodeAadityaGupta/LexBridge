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
    {
        "name": "Kabir Mehra",
        "city": "Mumbai",
        "bar_registration": "MH/ADV/8877",
        "email": "kabir.mehra@lexbridge.app",
        "experience_years": 14,
        "specialities": ["Criminal Law", "White Collar Crime", "Bail Applications"],
        "about": "Kabir Mehra is an expert criminal defence advocate with 14 years of experience, practicing primarily in the Bombay High Court and local Sessions Courts. He has represented high-profile corporate clients in white-collar crime investigations.",
        "consultation_fee": 2500,
        "retainer_min": 40000,
        "retainer_max": 120000,
        "rating": 4.9,
        "notable_cases": [
            {
                "title": "Quashed money laundering allegations",
                "year": 2024,
                "outcome": "Won",
                "summary": "Successfully argued for the dismissal of money laundering allegations against a manufacturing firm director at the High Court level.",
            },
            {
                "title": "Bail in economic offence investigation",
                "year": 2023,
                "outcome": "Won",
                "summary": "Secured anticipatory bail for an IT entrepreneur accused of financial embezzlement.",
            },
        ],
    },
    {
        "name": "Meera Nair",
        "city": "Bengaluru",
        "bar_registration": "KA/ADV/4532",
        "email": "meera.nair@lexbridge.app",
        "experience_years": 11,
        "specialities": ["Corporate Law", "Contract Drafting", "Intellectual Property"],
        "about": "Meera Nair has 11 years of experience advising startups and multinationals on corporate compliance, contract negotiation, and protecting intellectual property assets. She holds an LL.M. in Business Law.",
        "consultation_fee": 3000,
        "retainer_min": 50000,
        "retainer_max": 150000,
        "rating": 4.8,
        "notable_cases": [
            {
                "title": "Cross-border tech merger clearance",
                "year": 2024,
                "outcome": "Won",
                "summary": "Drafted and structured transaction documents for a $15 million acquisition of a local AI startup by a US corporation.",
            },
            {
                "title": "Trademark restoration victory",
                "year": 2023,
                "outcome": "Won",
                "summary": "Successfully appealed trademark abandonment order before the Registrar of Trademarks, restoring the client's key brand asset.",
            },
        ],
    },
    {
        "name": "Rithvik Sen",
        "city": "Delhi",
        "bar_registration": "DL/ADV/3321",
        "email": "rithvik.sen@lexbridge.app",
        "experience_years": 9,
        "specialities": ["Property Law", "Real Estate Transactions", "RERA"],
        "about": "Rithvik Sen specializes in Delhi-NCR property title searches, land acquisitions, and disputes under RERA. He acts for individual home buyers as well as institutional developers.",
        "consultation_fee": 1800,
        "retainer_min": 25000,
        "retainer_max": 75000,
        "rating": 4.6,
        "notable_cases": [
            {
                "title": "Delayed project refund recovery",
                "year": 2023,
                "outcome": "Won",
                "summary": "Recovered ₹1.2 Crore plus interest from a prominent NCR builder for a 4-year project delay under RERA.",
            }
        ],
    },
    {
        "name": "Divya Rao",
        "city": "Chennai",
        "bar_registration": "TN/ADV/7744",
        "email": "divya.rao@lexbridge.app",
        "experience_years": 7,
        "specialities": ["Family Law", "Divorce", "Child Custody"],
        "about": "Divya Rao is a dedicated family lawyer with a compassionate approach, specializing in contested divorces, custody agreements, and family mediation. She is a certified mediator.",
        "consultation_fee": 1500,
        "retainer_min": 20000,
        "retainer_max": 50000,
        "rating": 4.7,
        "notable_cases": [
            {
                "title": "Joint custody agreement",
                "year": 2024,
                "outcome": "Settled",
                "summary": "Successfully mediated a complex custody split between parents, securing equal parenting time and educational funding commitments.",
            }
        ],
    },
    {
        "name": "Abhishek Goel",
        "city": "Hyderabad",
        "bar_registration": "TS/ADV/9090",
        "email": "abhishek.goel@lexbridge.app",
        "experience_years": 10,
        "specialities": ["Cyber Law", "IT Act Offences", "Data Privacy"],
        "about": "Abhishek Goel practices at the intersection of technology and law. He advises companies on data privacy compliance (DPDP Act) and represents clients in cyber fraud and online identity theft matters.",
        "consultation_fee": 2200,
        "retainer_min": 35000,
        "retainer_max": 90000,
        "rating": 4.7,
        "notable_cases": [
            {
                "title": "Cryptocurrency fraud recovery",
                "year": 2024,
                "outcome": "Won",
                "summary": "Assisted the Cyber Crime unit in tracing and freezing ₹85 lakhs stolen via a phishing scam targeting a local tech investor.",
            }
        ],
    },
    {
        "name": "Neha Kapoor",
        "city": "Pune",
        "bar_registration": "MH/ADV/6644",
        "email": "neha.kapoor@lexbridge.app",
        "experience_years": 8,
        "specialities": ["Labour Law", "Workplace Harassment", "Employment Disputes"],
        "about": "Neha Kapoor represents corporate professionals and organizations in labor disputes. She is an expert on PoSH compliance and has guided over 50 POSH committees in conducting inquiries.",
        "consultation_fee": 2000,
        "retainer_min": 30000,
        "retainer_max": 80000,
        "rating": 4.8,
        "notable_cases": [
            {
                "title": "Whistleblower retaliation defense",
                "year": 2023,
                "outcome": "Won",
                "summary": "Successfully represented a senior executive in an employment tribunal, securing compensation and quashing a retaliatory termination.",
            }
        ],
    },
    {
        "name": "Aditya Varma",
        "city": "Delhi",
        "bar_registration": "DL/ADV/5567",
        "email": "aditya.varma@lexbridge.app",
        "experience_years": 13,
        "specialities": ["Consumer Disputes", "Product Liability", "E-Commerce Fraud"],
        "about": "Aditya Varma is a senior consumer advocate who has successfully filed hundreds of complaints in the National and State Consumer Commissions. He works to ensure fair trade practices.",
        "consultation_fee": 1700,
        "retainer_min": 22000,
        "retainer_max": 65000,
        "rating": 4.5,
        "notable_cases": [
            {
                "title": "Defective vehicle replacement ordered",
                "year": 2024,
                "outcome": "Won",
                "summary": "Won a landmark judgment ordering a major automobile manufacturer to replace a defective vehicle and pay damages for mental harassment.",
            }
        ],
    },
    {
        "name": "Shalini Joshi",
        "city": "Mumbai",
        "bar_registration": "MH/ADV/2211",
        "email": "shalini.joshi@lexbridge.app",
        "experience_years": 16,
        "specialities": ["Property Law", "Inheritance Disputes", "Will Contestation"],
        "about": "Shalini Joshi specializes in real estate and succession law, with extensive practice at the Bombay High Court. He helps families resolve probate disputes and execute wills legally.",
        "consultation_fee": 2800,
        "retainer_min": 45000,
        "retainer_max": 130000,
        "rating": 4.9,
        "notable_cases": [
            {
                "title": "Probate of disputed family will",
                "year": 2023,
                "outcome": "Won",
                "summary": "Successfully secured probate for a deceased NRI's will after proving the genuineness of signatures against claims of forgery.",
            }
        ],
    },
    {
        "name": "Rajesh Singhania",
        "city": "Bengaluru",
        "bar_registration": "KA/ADV/9091",
        "email": "rajesh.singhania@lexbridge.app",
        "experience_years": 15,
        "specialities": ["Corporate Law", "Venture Capital", "Startup Compliance"],
        "about": "Rajesh Singhania advises high-growth startups and venture capital funds on capital raises, board management, and regulatory compliance. He has closed over 100 funding rounds.",
        "consultation_fee": 3500,
        "retainer_min": 60000,
        "retainer_max": 180000,
        "rating": 4.9,
        "notable_cases": [
            {
                "title": "Series B venture funding closure",
                "year": 2024,
                "outcome": "Won",
                "summary": "Led negotiations and drafted agreements for a ₹120 Crore Series B investment into a prominent fintech startup.",
            }
        ],
    },
    {
        "name": "Pooja Hegde",
        "city": "Hyderabad",
        "bar_registration": "TS/ADV/4455",
        "email": "pooja.hegde@lexbridge.app",
        "experience_years": 9,
        "specialities": ["Criminal Law", "Bail Applications", "Domestic Violence"],
        "about": "Pooja Hegde is a dedicated criminal trial advocate practicing in the Hyderabad City Civil Courts. She specializes in domestic relations law, dowry harassment defense, and bail matters.",
        "consultation_fee": 1600,
        "retainer_min": 22000,
        "retainer_max": 55000,
        "rating": 4.6,
        "notable_cases": [
            {
                "title": "Anticipatory bail in family dispute",
                "year": 2024,
                "outcome": "Won",
                "summary": "Secured immediate anticipatory bail for three family members falsely accused under Section 498A IPC.",
            }
        ],
    },
]

if __name__ == "__main__":
    response = supabase_service.table("lawyers").upsert(lawyers, on_conflict="bar_registration").execute()
    print(f"Seeded {len(response.data)} lawyers successfully.")
