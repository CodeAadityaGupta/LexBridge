import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, Search, Star, ArrowRight, UserCheck, Scale } from 'lucide-react';
import Button from '../src/UI/Button';
import Card from '../src/UI/Card';
import Badge from '../src/UI/Badge';
import LandingNavbar from '../src/Layout/LandingNavbar';

export default function Landing() {
  const steps = [
    {
      title: 'Describe your situation',
      description: "Tell LexBot what happened in plain language. No complicated legal forms or jargon required.",
    },
    {
      title: 'Understand your options',
      description: "Get a clear assessment on whether your case has merit, what documentation you will need, and what to expect next.",
    },
    {
      title: 'Connect with a verified lawyer',
      description: "Browse advocates by specialty, check their verified track records, and book consultations directly.",
    },
  ];

  const trustSignals = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-accent" />,
      title: 'Verified Bar Council Registration',
      description: 'Every advocate is strictly cross-referenced and verified with the Bar Council registers.',
    },
    {
      icon: <Scale className="w-7 h-7 text-accent" />,
      title: 'Real Case Track Record',
      description: 'See the exact specialties and case categories they have handled, not just what they claim.',
    },
    {
      icon: <Search className="w-7 h-7 text-accent" />,
      title: 'No Word-of-Mouth Needed',
      description: 'Find advocates matched specifically to your exact problem, not just based on who you know.',
    },
  ];

  const sampleLawyers = [
    {
      name: 'Rohan Sharma',
      specialty: 'Criminal Defence',
      rating: '4.8',
      reviews: 124,
      fee: '₹1,500',
      initials: 'RS',
    },
    {
      name: 'Priya Menon',
      specialty: 'Property Disputes',
      rating: '4.9',
      reviews: 98,
      fee: '₹2,000',
      initials: 'PM',
    },
    {
      name: 'Amit Patel',
      specialty: 'Family Law',
      rating: '4.7',
      reviews: 86,
      fee: '₹1,200',
      initials: 'AP',
    },
    {
      name: 'Siddharth Sen',
      specialty: 'Labour Law',
      rating: '4.8',
      reviews: 112,
      fee: '₹1,800',
      initials: 'SS',
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans page-fade">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 flex flex-col items-center text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-serif-display text-5xl md:text-[3.5rem] leading-[1.15] text-ink max-w-2xl mx-auto">
            Legal help that makes sense.<br />
            <span className="italic font-serif-display">Finally.</span>
          </h1>
          <p className="text-muted text-base md:text-lg max-w-lg mx-auto">
            Find out if your case is worth pursuing, understand your rights, and connect with the right lawyer — without knowing anyone in law.
          </p>
          <div className="pt-2">
            <Link to="/signup">
              <Button size="lg" className="px-8 py-3.5">
                Get started — it's free
              </Button>
            </Link>
          </div>
          <div className="pt-6 border-t border-border/80 flex items-center justify-center space-x-3 text-xs md:text-sm font-medium tracking-wide uppercase text-muted">
            <span>12,000+ cases assessed</span>
            <span className="text-[#c7cbd9]">•</span>
            <span>400+ verified advocates</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest block mb-8 text-center">
            HOW IT WORKS
          </span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-ink text-center mb-16">
            A Clear, Linear Path to Resolution
          </h2>

          <div className="relative pl-8 md:pl-16 space-y-12 max-w-xl mx-auto">
            {/* Timeline Case Thread Connector Line */}
            <div className="absolute top-2 bottom-2 left-[12px] md:left-[20px] w-[2px] bg-accent-light" />

            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Connector Dot */}
                <div className="absolute -left-[28px] md:-left-[44px] top-1.5 w-4 h-4 rounded-full border-[3px] border-white bg-accent shadow-sm" />
                
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-accent text-xs font-semibold uppercase tracking-widest block">
              INSTITUTIONAL INTEGRITY
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-ink">
              Why Trust LexBridge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {trustSignals.map((ts, idx) => (
              <Card key={idx} className="flex flex-col space-y-4">
                <div className="bg-accent-light p-3 rounded-full w-fit">
                  {ts.icon}
                </div>
                <h3 className="text-base font-semibold text-ink">
                  {ts.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1">
                  {ts.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lawyer Preview Strip */}
      <section className="py-20 px-6 md:px-12 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-accent text-xs font-semibold uppercase tracking-widest block">
                MEET ADVOCATES
              </span>
              <h2 className="font-serif-display text-3xl text-ink">
                Verified Advocates on LexBridge
              </h2>
            </div>
            <Link 
              to="/signup" 
              className="text-accent text-sm font-semibold hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              Browse all lawyers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sampleLawyers.map((lawyer, idx) => (
              <Link to="/signup" key={idx} className="block group">
                <Card className="p-5 flex flex-col items-center text-center space-y-4 hover:shadow-md hover:border-accent/20 transition-all duration-200">
                  <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center font-semibold text-sm">
                    {lawyer.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink group-hover:text-accent transition-colors text-sm">
                      {lawyer.name}
                    </h3>
                    <p className="text-xs text-muted mt-1">{lawyer.specialty}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-ink bg-surface px-2.5 py-1 rounded">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span className="font-semibold">{lawyer.rating}</span>
                    <span className="text-muted">({lawyer.reviews})</span>
                  </div>

                  <div className="text-xs font-semibold text-ink">
                    Fee: {lawyer.fee} / consult
                  </div>

                  <span className="text-[10px] uppercase font-bold text-accent tracking-wider bg-accent-light/60 px-2 py-0.5 rounded">
                    Sign up to view details
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 md:px-12 bg-ink text-white border-t border-border/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg tracking-tight">LexBridge</span>
              <Scale className="w-5 h-5 text-accent-light shrink-0" />
            </div>
            <p className="text-[#a5abbf] text-xs leading-relaxed">
              Legal help should not depend on who you know. We help you evaluate your situation and connect with the right advocate.
            </p>
          </div>
          <div className="space-y-2 shrink-0">
            <p className="font-medium text-white mb-3 uppercase tracking-wider text-xs">Resources</p>
            <ul className="space-y-1.5">
              <li>
                <Link to="/privacy" className="text-[#a5abbf] hover:text-white hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2 text-[#a5abbf] text-xs">
            <p className="font-medium text-white mb-3">LEGAL DISCLAIMER</p>
            <p className="leading-relaxed max-w-md">
              © 2026 LexBridge. Not a law firm. LexBridge does not provide legal advice, does not constitute a lawyer referral service, and no attorney-client relationship is formed by using the website.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
