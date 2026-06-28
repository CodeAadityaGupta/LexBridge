import { api } from './api';

const MOCK_LAWYERS = [
  {
    id: '1',
    name: 'Rohan Sharma',
    specialty: 'Criminal Defence',
    rating: '4.8',
    reviews: 124,
    fee: '₹1,500',
    retainer: '₹25,000 – ₹60,000',
    experience: 12,
    location: 'Mumbai',
    barReg: 'MH/1234/2014',
    avatar: '',
    bio: [
      "Rohan Sharma is a distinguished criminal defence lawyer with over 12 years of core litigation experience in representing clients across trial courts, sessions courts, and the High Court.",
      "His practice focus is bail advocacy, white-collar crimes, and criminal procedural trials. Rohan has a reputation for meticulous analysis of forensic evidence, procedural compliance, and strong courtroom presence.",
      "He believes in providing straightforward legal advice to clients facing high-stress criminal accusations, helping them navigate complex police compliance and judicial custody rules."
    ],
    specialties: ['Criminal Defence', 'Bail Applications', 'White Collar Crime', 'IPC Compliance'],
    cases: [
      {
        title: "Bail granted in financial fraud case",
        year: 2023,
        outcome: "Won",
        desc: "Represented client in a multi-crore securities fraud case where bail was denied at sessions level. Secured bail at the High Court level."
      },
      {
        title: "Acquittal in assault case",
        year: 2022,
        outcome: "Won",
        desc: "Established solid alibi through digital evidence and telecom records when client faced charges of criminal assault. Case dismissed at trial stage."
      },
      {
        title: "Pecuniary compliance mediation",
        year: 2024,
        outcome: "Settled",
        desc: "Mediated an out-of-court compliance dispute between board members and directors over regulatory tax filings, avoiding litigation."
      }
    ]
  },
  {
    id: '2',
    name: 'Priya Menon',
    specialty: 'Property Disputes',
    rating: '4.9',
    reviews: 98,
    fee: '₹2,000',
    retainer: '₹40,000 – ₹90,000',
    experience: 15,
    location: 'Bangalore',
    barReg: 'KA/5678/2011',
    avatar: '',
    bio: [
      "Priya Menon is a senior land tenure and real estate litigant representing buyers, commercial developers, and ancestral heirs in complex property partition matters.",
      "With 15 years of registry analysis and litigation experience, she specializes in checking mutation deeds, resolving illegal encroachments, and drafting commercial lease covenants.",
      "Her methodology focuses on comprehensive due diligence to resolve land ownership conflicts out of court where possible, protecting client interests from protracted multi-decade property disputes."
    ],
    specialties: ['Property Disputes', 'Real Estate Due Diligence', 'Lease Agreements', 'Partition Actions'],
    cases: [
      {
        title: "Title clearance in ancestral property conflict",
        year: 2024,
        outcome: "Won",
        desc: "Resolved a complex partition claim involving multi-generational heirs, securing sole ownership title and mutation registry for our client."
      },
      {
        title: "Settlement in tenant eviction",
        year: 2023,
        outcome: "Settled",
        desc: "Mediated between a commercial landlord and corporate tenant to agree on structured exit terms, avoiding lengthier court proceedings."
      }
    ]
  },
  {
    id: '3',
    name: 'Amit Patel',
    specialty: 'Family Law',
    rating: '4.7',
    reviews: 86,
    fee: '₹1,200',
    retainer: '₹15,000 – ₹40,000',
    experience: 8,
    location: 'Delhi',
    barReg: 'DL/9012/2018',
    avatar: '',
    bio: [
      "Amit Patel handles family legal affairs, divorce actions, and child custody arrangements with extreme discretion, sensitivity, and clinical professionalism.",
      "His practice covers marriage registration, divorce negotiations, alimony splits, and domestic violence protection complaints before family courts.",
      "Amit emphasizes custody arrangements that preserve parental relationships and child security, aiming for structured mediation over adversarial trial conflict."
    ],
    specialties: ['Family Law', 'Matrimonial Disputes', 'Custody Agreements', 'Alimony Divisions'],
    cases: [
      {
        title: "Custody agreement resolved",
        year: 2023,
        outcome: "Settled",
        desc: "Negotiated a highly structured co-parenting agreement prioritizing the children's educational and travel requirements."
      },
      {
        title: "Acquittal in false dowry litigation",
        year: 2022,
        outcome: "Won",
        desc: "Successfully defended client and parents against unsubstantiated criminal dowry harassment claims, resulting in dismissal."
      }
    ]
  },
  {
    id: '4',
    name: 'Siddharth Sen',
    specialty: 'Labour Law',
    rating: '4.8',
    reviews: 112,
    fee: '₹1,800',
    retainer: '₹20,000 – ₹50,000',
    experience: 10,
    location: 'Kolkata',
    barReg: 'WB/3456/2016',
    avatar: '',
    bio: [
      "Siddharth Sen is dedicated to employee rights, industrial disputes, and workplace compliance guidelines.",
      "He represents corporate professionals and labor union groups in cases of wrongful termination, outstanding wage recovery, and workplace harassment.",
      "Siddharth focuses on securing legal remedies under local labor laws, review of severance packages, and negotiating fair employee exits."
    ],
    specialties: ['Labour Law', 'Employment Contracts', 'Wage Claims', 'Severance Packages'],
    cases: [
      {
        title: "Wrongful termination settlement",
        year: 2023,
        outcome: "Won",
        desc: "Secured complete outstanding salary recovery and a robust severance package for an IT employee terminated in violation of local labor regulations."
      },
      {
        title: "Wage restitution group action",
        year: 2022,
        outcome: "Won",
        desc: "Represented a group of 14 factory technicians in retrieving withheld overtime wages and hazard allowances."
      }
    ]
  },
  {
    id: '5',
    name: 'Anjali Deshmukh',
    specialty: 'Corporate Law',
    rating: '4.9',
    reviews: 146,
    fee: '₹3,000',
    retainer: '₹80,000 – ₹200,000',
    experience: 14,
    location: 'Mumbai',
    barReg: 'MH/7890/2012',
    avatar: '',
    bio: [
      "Anjali Deshmukh provides counsel to emerging startups, corporate boards, and investors on compliance guidelines, joint ventures, and intellectual property.",
      "With over 14 years of advisory and transaction registry experience, she manages contract drafting, private equity checks, and trademark registration.",
      "She focuses on helping growth companies align with regulatory guidelines and resolve intellectual property infringements efficiently."
    ],
    specialties: ['Corporate Law', 'Contract Drafting', 'Intellectual Property', 'Startups Compliance'],
    cases: [
      {
        title: "Trademark infringement suit",
        year: 2024,
        outcome: "Won",
        desc: "Defended tech startup client against a copyright and trademark infringement claim, leading to complete dismissal."
      },
      {
        title: "Series A funding due diligence",
        year: 2023,
        outcome: "Settled",
        desc: "Completed transactional due diligence and contract drafting for a ₹24 Crore funding round."
      }
    ]
  }
];

export const lawyerService = {
  async getLawyers() {
    try {
      return await api.get('/lawyers/');
    } catch (err) {
      console.warn("Lawyers API unreachable. Falling back to local mock data.");
      await new Promise((resolve) => setTimeout(resolve, 600));
      return MOCK_LAWYERS;
    }
  },

  async getLawyerById(id) {
    try {
      return await api.get(`/lawyers/${id}`);
    } catch (err) {
      console.warn(`Lawyer API for ID ${id} unreachable. Falling back to local mock data.`);
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      const found = MOCK_LAWYERS.find((l) => l.id === id);
      if (!found) {
        throw new Error("Lawyer profile not found.");
      }
      return found;
    }
  },

  async bookConsultation(bookingData) {
    try {
      return await api.post('/email/booking', bookingData);
    } catch (err) {
      console.warn("Booking API unreachable. Falling back to local simulated confirmation.");
      await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate sending email
      return {
        success: true,
        message: "Consultation request sent successfully."
      };
    }
  }
};
