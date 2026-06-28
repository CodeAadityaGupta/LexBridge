import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, ChevronDown, ChevronUp, Lock, Bot, FileText, User, 
  Mail, BookOpen, FolderOpen, RefreshCw, Users, Clock, Scale, 
  Cookie, Settings, Heart, History 
} from 'lucide-react';
import LandingNavbar from '../src/Layout/LandingNavbar';
import Card from '../src/UI/Card';
import Button from '../src/UI/Button';

const SECTIONS = [
  { id: 'welcome', label: 'Welcome', icon: BookOpen },
  { id: 'collection', label: 'Information We Collect', icon: FolderOpen },
  { id: 'usage', label: 'How We Use Info', icon: RefreshCw },
  { id: 'ai', label: 'AI-Powered Features', icon: Bot },
  { id: 'security', label: 'Document Security', icon: Lock },
  { id: 'sharing', label: 'Sharing Your Info', icon: Users },
  { id: 'retention', label: 'Data Retention', icon: Clock },
  { id: 'rights', label: 'Your Rights', icon: Scale },
  { id: 'cookies', label: 'Cookies', icon: Cookie },
  { id: 'thirdparty', label: 'Third-Party Services', icon: Settings },
  { id: 'children', label: "Children's Privacy", icon: Heart },
  { id: 'changes', label: 'Changes to Policy', icon: History },
  { id: 'contact', label: 'Contact Us', icon: Mail },
];

export default function Privacy() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    const handleScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar + spacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const faqs = [
    {
      q: "Who can access my documents?",
      a: "Only you and the specific lawyers you choose to share your files with can access your documents. We use strict access controls and industry-standard encryption to keep your legal documents private."
    },
    {
      q: "Can I delete my data?",
      a: "Yes. You can delete individual uploaded documents at any time. You can also request complete account deletion under 'Your Rights', which permanently removes all your personal and case files from our systems."
    },
    {
      q: "Does AI provide legal advice?",
      a: "No. LexBot is an AI assistant designed to summarize documents, explain terminology, and organize files for informational purposes. It is not a lawyer and cannot replace professional legal counsel. Always consult a qualified advocate."
    }
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans page-fade relative overflow-hidden">
      
      {/* Mesh gradients for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-30%] left-[-25%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0,transparent_60%)] filter blur-3xl" />
        <div className="absolute top-16 left-0 right-0 h-48 bg-gradient-to-b from-accent/5 to-transparent border-b border-border/40" />
      </div>

      <LandingNavbar />

      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-[70px] md:top-[72px] left-0 h-[2.5px] bg-accent z-40 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Header */}
      <header className="pt-36 pb-14 px-6 text-center max-w-4xl mx-auto space-y-4 z-10 relative">
        <div className="inline-flex p-3 bg-accent-light text-accent rounded-full animate-scaleUp border border-accent/10 shadow-sm">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink">
          Privacy Policy
        </h1>
        <p className="text-muted text-xs md:text-sm max-w-md mx-auto leading-relaxed">
          How we handle, secure, and manage legal case contexts and credentials inside LexBridge.
        </p>
        <div className="text-[10px] text-muted font-bold tracking-widest uppercase font-sans select-none">
          Last Updated: June 2026
        </div>
      </header>

      {/* Content Layout */}
      <div className="max-w-5xl mx-auto w-full px-6 pb-24 flex flex-col md:flex-row items-start gap-10 relative z-10">
        
        {/* Sticky Sidebar Navigation (Desktop only) */}
        <aside className="hidden md:block w-[240px] shrink-0 sticky top-24 self-start bg-card border border-border/60 p-5 rounded-2xl shadow-card">
          <h4 className="text-[9px] font-bold uppercase tracking-widest text-muted mb-3 select-none">
            Documentation Sections
          </h4>
          <nav className="space-y-0.5">
            {SECTIONS.map((sec) => {
              const IconComponent = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleScroll(sec.id)}
                  className="w-full text-left px-3 py-2 text-xs text-muted hover:text-accent hover:bg-accent-light rounded-md font-sans font-semibold transition-colors flex items-center space-x-2.5"
                >
                  <IconComponent className="w-3.5 h-3.5 text-muted/70 shrink-0" />
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 space-y-8 w-full max-w-2xl">
          
          {/* Welcome Card */}
          <Card id="welcome" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <BookOpen className="w-5 h-5 text-accent shrink-0" /> Welcome
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-3 font-sans">
              <p>
                Welcome to <strong>LexBridge</strong>.
              </p>
              <p>
                Your privacy is important to us. This Privacy Policy explains how LexBridge collects, uses, stores, and protects your information when you use our platform.
              </p>
              <p>
                LexBridge is designed to help users discover legal professionals, understand legal procedures, securely manage legal documents, and access AI-powered legal assistance. We are committed to handling your information responsibly and transparently.
              </p>
            </div>
          </Card>

          {/* Information We Collect Card */}
          <Card id="collection" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <FolderOpen className="w-5 h-5 text-accent shrink-0" /> Information We Collect
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-4 font-sans">
              <p>
                Depending on how you use our platform, we may collect the following information:
              </p>
              
              <div className="space-y-2.5">
                <h3 className="font-bold text-ink flex items-center gap-1.5 text-xs">
                  <User className="w-4 h-4 text-accent" /> Personal Information
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                  <li>Profile Information</li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <h3 className="font-bold text-ink flex items-center gap-1.5 text-xs">
                  <FileText className="w-4 h-4 text-accent" /> Legal Information
                </h3>
                <p>Users may voluntarily upload legal documents such as:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 select-none">
                  <span className="bg-surface border border-border/75 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-ink text-center">FIRs</span>
                  <span className="bg-surface border border-border/75 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-ink text-center">Contracts</span>
                  <span className="bg-surface border border-border/75 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-ink text-center">Property Docs</span>
                  <span className="bg-surface border border-border/75 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-ink text-center">Court Notices</span>
                  <span className="bg-surface border border-border/75 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-ink text-center">Affidavits</span>
                  <span className="bg-surface border border-border/75 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-ink text-center">Agreements</span>
                </div>
                <p className="italic pt-1 text-[11px]">
                  These documents are processed only to provide requested platform features.
                </p>
              </div>

              <div className="space-y-2.5">
                <h3 className="font-bold text-ink flex items-center gap-1.5 text-xs">
                  <Lock className="w-4 h-4 text-accent" /> Usage Information
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Browser information, operating system, and device type</li>
                  <li>IP Address and login timestamps</li>
                  <li>Platform usage statistics</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* How We Use Your Information Card */}
          <Card id="usage" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <RefreshCw className="w-5 h-5 text-accent shrink-0" /> How We Use Your Information
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-3 font-sans">
              <p>We use collected information to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Create and manage your account</li>
                <li>Connect users with suitable legal professionals</li>
                <li>Analyze uploaded legal documents using AI</li>
                <li>Improve search accuracy and generate legal summaries</li>
                <li>Provide personalized legal guidance</li>
                <li>Improve platform security and detect fraudulent activity</li>
              </ul>
              <div className="mt-2 p-3 bg-success/5 border border-success/15 rounded-md text-success text-[11px] font-bold">
                We do not sell your personal information.
              </div>
            </div>
          </Card>

          {/* AI-Powered Features Card */}
          <Card id="ai" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Bot className="w-5 h-5 text-accent shrink-0" /> AI-Powered Features
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-3 font-sans">
              <p>LexBridge includes AI-powered tools that assist users by:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Summarizing complex legal documents</li>
                <li>Explaining archaic legal terminology</li>
                <li>Organizing uploaded evidence and case materials</li>
                <li>Recommending relevant legal categories</li>
              </ul>
              <div className="p-4 bg-warning/5 border border-warning/15 rounded-md text-warning space-y-1.5 text-[11px]">
                <span className="font-bold uppercase tracking-wider text-[10px] block">Important Notice</span>
                <p className="leading-relaxed">
                  AI-generated responses are intended for informational purposes only and should not be considered legal advice. Users are encouraged to consult a qualified advocate before making legal decisions.
                </p>
              </div>
            </div>
          </Card>

          {/* Document Security Card */}
          <Card id="security" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Lock className="w-5 h-5 text-accent shrink-0" /> Document Security
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-3 font-sans">
              <p>Uploaded legal documents are treated as confidential.</p>
              <p>We implement reasonable security practices to protect your information, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encrypted communication (HTTPS/TLS)</li>
                <li>Secure multi-factor authentication protocols</li>
                <li>Industry-standard password hashing algorithms</li>
                <li>Strictly controlled, role-based access controls to user data</li>
              </ul>
              <p>Only authorized users can access their uploaded documents.</p>
            </div>
          </Card>

          {/* Sharing Your Information Card */}
          <Card id="sharing" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Users className="w-5 h-5 text-accent shrink-0" /> Sharing Your Information
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-3 font-sans">
              <p>We only share your information when:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You explicitly choose to share documents with a lawyer.</li>
                <li>Required by applicable law or court orders.</li>
                <li>Necessary to investigate fraud, security concerns, or system abuse.</li>
              </ul>
              <p>We never sell user data to advertisers, brokers, or third parties.</p>
            </div>
          </Card>

          {/* Data Retention Card */}
          <Card id="retention" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Clock className="w-5 h-5 text-accent shrink-0" /> Data Retention
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-2 font-sans">
              <p>
                Your information is retained only as long as necessary to provide our services and satisfy our platform features.
              </p>
              <p>
                Users may request immediate deletion of their account and all uploaded documents.
              </p>
            </div>
          </Card>

          {/* Your Rights Card */}
          <Card id="rights" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Scale className="w-5 h-5 text-accent shrink-0" /> Your Rights
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-2 font-sans">
              <p>You have full control over your data. You may:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>View your personal information collected on the platform</li>
                <li>Update profile or contact information</li>
                <li>Delete uploaded legal documents at any time</li>
                <li>Request permanent account deletion</li>
                <li>Withdraw consent for future document processing</li>
              </ul>
            </div>
          </Card>

          {/* Cookies Card */}
          <Card id="cookies" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Cookie className="w-5 h-5 text-accent shrink-0" /> Cookies
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-2 font-sans">
              <p>LexBridge may use cookies and similar technologies to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maintain secure login sessions</li>
                <li>Improve user experience and remember custom preferences</li>
                <li>Analyze platform performance and metrics</li>
              </ul>
              <p>Users may disable cookies through their browser settings, though some features may load differently.</p>
            </div>
          </Card>

          {/* Third-Party Services Card */}
          <Card id="thirdparty" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Settings className="w-5 h-5 text-accent shrink-0" /> Third-Party Services
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-2 font-sans">
              <p>Our platform may use trusted third-party services for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Authentication and security tokens</li>
                <li>Secure cloud storage</li>
                <li>AI prompt evaluations and processing</li>
                <li>Analytics and performance indexing</li>
              </ul>
              <p>Each third-party provider follows its own privacy and encryption practices.</p>
            </div>
          </Card>

          {/* Children's Privacy Card */}
          <Card id="children" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Heart className="w-5 h-5 text-accent shrink-0" /> Children's Privacy
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-2 font-sans">
              <p>
                LexBridge is intended for users who can legally use online services under applicable jurisdictions.
              </p>
              <p>
                We do not knowingly collect or solicit personal information from children without appropriate legal authorization.
              </p>
            </div>
          </Card>

          {/* Changes to This Privacy Policy Card */}
          <Card id="changes" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <History className="w-5 h-5 text-accent shrink-0" /> Changes to This Privacy Policy
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-2 font-sans">
              <p>
                We may update this Privacy Policy from time to time to match legal compliance regulations.
              </p>
              <p>
                Updated versions will be published on this page with the revised "Last Updated" date.
              </p>
            </div>
          </Card>

          {/* Contact Us Card */}
          <Card id="contact" className="scroll-mt-24 !p-7 md:!p-8 space-y-4 border-border/60 bg-card">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border/50 pb-3.5">
              <Mail className="w-5 h-5 text-accent shrink-0" /> Contact Us
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-3 font-sans">
              <p>For any questions regarding this Privacy Policy, please contact:</p>
              <div className="p-4 bg-surface border border-border rounded-md space-y-1.5 max-w-sm">
                <span className="font-bold text-ink text-xs block font-sans">LexBridge Team</span>
                <a 
                  href="mailto:support@lexbridge.com" 
                  className="inline-flex items-center space-x-1.5 text-accent hover:underline font-mono text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@lexbridge.com</span>
                </a>
              </div>
            </div>
          </Card>

          {/* Expandable FAQs Accordion */}
          <section className="space-y-4 pt-6 select-none">
            <h3 className="font-serif text-xl font-bold text-ink">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <Card key={index} className="overflow-hidden border border-border/60 !p-0 bg-card">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none transition-colors hover:bg-surface"
                    >
                      <span className="text-xs md:text-sm font-bold text-ink font-sans">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-muted" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 border-t border-border/40">
                        <p className="text-xs text-muted leading-relaxed font-sans font-medium">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Consent Alert Box Footer */}
          <Card id="consent" className="scroll-mt-24 p-5 bg-accent-light/35 border border-accent/10 rounded-2xl shadow-sm text-center">
            <p className="text-xs font-bold text-ink font-sans">
              By establishing case parameters on LexBridge, you agree to this <span className="text-accent underline decoration-accent/15 underline-offset-2">Privacy Policy</span>.
            </p>
          </Card>

        </main>
      </div>

      {/* Public Footer */}
      <footer className="mt-auto py-10 px-6 bg-ink text-[#a5abbf] border-t border-border/10 text-center text-xs z-10 relative">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-white">
            <span className="font-semibold text-sm tracking-wider uppercase font-sans">LexBridge</span>
            <Scale className="w-4 h-4 text-accent-light shrink-0" />
          </div>
          <div className="font-sans font-semibold">© 2026 LexBridge. All rights reserved.</div>
          <div>
            <Link to="/" className="hover:text-white hover:underline font-sans font-semibold">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
