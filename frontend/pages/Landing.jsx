import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search, Star, ArrowRight, Scale, CheckCircle2, ChevronRight } from 'lucide-react';
import Button from '../src/UI/Button';
import Card from '../src/UI/Card';
import Badge from '../src/UI/Badge';
import LandingNavbar from '../src/Layout/LandingNavbar';

export default function Landing() {
  const steps = [
    {
      step: '01',
      title: 'Submit Case Context',
      description: "Summarize your dispute in plain language. LexBot securely analyzes case metadata and structural timelines.",
    },
    {
      step: '02',
      title: 'Analyze Viability',
      description: "Review automated metrics assessing legal merit, evidence checklists, and relevant legal codes.",
    },
    {
      step: '03',
      title: 'Appoint Verified Counsel',
      description: "Connect directly with specialized advocates. Review verified experience matrices and book consultations.",
    },
  ];

  const trustSignals = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      title: 'Verified Bar Accreditations',
      description: 'We authenticate enrollment records across Bar registries before credentials approval.',
    },
    {
      icon: <Scale className="w-5 h-5 text-accent" />,
      title: 'Empirical Case Track Records',
      description: 'Gain insight into historical specialties and public case outcomes handled by advocates.',
    },
    {
      icon: <Search className="w-5 h-5 text-accent" />,
      title: 'Merit-Based Matching',
      description: 'Discover advocates suited to your specific problem, bypassing word-of-mouth networks.',
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
    <div className="min-h-screen bg-surface flex flex-col font-sans page-fade relative overflow-hidden">
      
      {/* Decorative Radial Mesh Gradient backgrounds for visual depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-30%] left-[-20%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0,transparent_60%)] filter blur-3xl" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,58,140,0.05)_0,transparent_65%)] filter blur-3xl" />
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-45" />
      </div>

      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 px-6 md:px-12 flex flex-col items-center text-center z-10 max-w-5xl mx-auto space-y-8">
        
        {/* Badge Link */}
        <div className="inline-flex items-center space-x-2 bg-card/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border/60 shadow-sm animate-scaleUp select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-ink font-sans">
            Now Live: Verified Counsel Directory
          </span>
          <ChevronRight className="w-3 h-3 text-muted/70" />
        </div>

        <div className="max-w-4xl space-y-6">
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.08] text-ink tracking-tight font-bold max-w-3xl mx-auto">
            Legal technology built for <span className="text-accent underline decoration-accent/15 underline-offset-4">absolute clarity</span>.
          </h1>
          
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans font-medium">
            Evaluate claim merit, draft legal briefs, and connect directly with vetted advocates — all through a unified enterprise workspace.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 rounded-md shadow-card font-bold tracking-wider">
                Establish Free Workspace
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 rounded-md font-bold tracking-wider">
                Log In
              </Button>
            </Link>
          </div>
          
          <div className="pt-10 border-t border-border/40 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-muted/70 select-none">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success shrink-0" /> Trained on IPC sections dataset</span>
            <span className="hidden sm:inline text-border/80">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success shrink-0" /> Verified Advocates</span>
            <span className="hidden sm:inline text-border/80">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success shrink-0" /> Bar Registry Audited</span>
            <span className="hidden sm:inline text-border/80">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success shrink-0" /> Multi-Lingual Support Chatbot</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-28 px-6 md:px-12 bg-card/65 backdrop-blur-md border-y border-border/50 z-10">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest block select-none">
              Operational Roadmap
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-ink font-bold leading-tight">
              A Clear, Linear Path to Resolution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <Card key={idx} className="relative !p-8 bg-card border-border/60 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl font-serif text-accent/15 font-bold mb-4 select-none">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-ink mb-2 font-sans tracking-wide">
                  {step.title}
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed font-sans">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="relative py-28 px-6 md:px-12 z-10">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest block select-none">
              Institutional Standards
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-ink font-bold leading-tight">
              Security & Credibility First
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {trustSignals.map((ts, idx) => (
              <Card key={idx} className="flex flex-col space-y-5 !p-8 border-border/55 shadow-sm">
                <div className="bg-accent-light p-3 rounded-md w-fit flex items-center justify-center shrink-0 border border-accent/10">
                  {ts.icon}
                </div>
                <h3 className="text-sm font-bold text-ink font-sans tracking-wide">
                  {ts.title}
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed font-sans flex-1">
                  {ts.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lawyer Preview Strip */}
      <section className="relative py-28 px-6 md:px-12 bg-card/65 backdrop-blur-md border-t border-border/50 z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-accent text-[9px] font-bold uppercase tracking-widest block select-none">
                Advocate Directory
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-ink font-bold leading-tight">
                Verified Advocates on LexBridge
              </h2>
            </div>
            <Link 
              to="/signup" 
              className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1.5 self-start sm:self-auto select-none"
            >
              Browse Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sampleLawyers.map((lawyer, idx) => (
              <Link to="/signup" key={idx} className="block group">
                <Card className="!p-6 flex flex-col items-center text-center space-y-5 hover:shadow-card hover:border-accent/30 transition-all duration-300 border-border/70 shadow-sm bg-card">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center font-bold text-sm border border-accent/15 select-none shadow-sm">
                    {lawyer.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-ink group-hover:text-accent transition-colors text-xs font-sans tracking-wide">
                      {lawyer.name}
                    </h3>
                    <p className="text-[10px] font-bold text-muted mt-1.5 font-sans uppercase tracking-wider">{lawyer.specialty}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 text-[10px] text-ink bg-surface border border-border/80 px-2.5 py-1 rounded-md font-bold select-none shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                    <span>{lawyer.rating}</span>
                    <span className="text-muted/80 font-medium">({lawyer.reviews})</span>
                  </div>

                  <div className="text-xs font-bold text-ink font-sans border-t border-border/50 pt-3.5 w-full">
                    Fee: {lawyer.fee} / consult
                  </div>

                  <Badge variant="accent" className="px-3 py-1 font-bold">
                    View profile
                  </Badge>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-auto py-16 px-6 md:px-12 bg-ink text-white border-t border-border/10 z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg tracking-wider uppercase font-sans">LexBridge</span>
              <Scale className="w-4.5 h-4.5 text-accent-light shrink-0" />
            </div>
            <p className="text-[#a5abbf] text-xs leading-relaxed font-sans font-medium">
              Institutional-grade case evaluation and matching workspace. We democratize access to counsel and legal definitions.
            </p>
          </div>
          <div className="space-y-2 shrink-0">
            <p className="font-bold text-white mb-3 uppercase tracking-wider text-xs font-sans">Resources</p>
            <ul className="space-y-1.5">
              <li>
                <Link to="/privacy" className="text-[#a5abbf] hover:text-white hover:underline transition-colors text-xs font-sans font-semibold">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2 text-[#a5abbf] text-xs font-sans leading-relaxed">
            <p className="font-bold text-white mb-3 tracking-wider uppercase">LEGAL DISCLAIMER</p>
            <p className="max-w-md font-medium">
              © 2026 LexBridge. Not a law firm. LexBridge does not provide legal advice, does not constitute a lawyer referral service, and no attorney-client relationship is formed by using the website.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
