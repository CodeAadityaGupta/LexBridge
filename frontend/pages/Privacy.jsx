import React, { useState } from 'react';
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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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
    <div className="min-h-screen bg-surface flex flex-col font-sans page-fade">
      <LandingNavbar />

      {/* Hero Header */}
      <header className="pt-28 pb-12 px-6 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex p-3 bg-accent-light text-accent rounded-full animate-scaleUp">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink">
          Privacy Policy
        </h1>
        <p className="text-muted text-xs md:text-sm max-w-md mx-auto">
          We are committed to protecting your personal and legal information.
        </p>
        <div className="text-[10px] text-muted font-mono">
          Last Updated: June 2026
        </div>
      </header>

      {/* Content Layout */}
      <div className="max-w-5xl mx-auto w-full px-6 pb-20 flex flex-col md:flex-row items-start gap-8 relative">
        
        {/* Sticky Sidebar Navigation (Desktop only) */}
        <aside className="hidden md:block w-[240px] shrink-0 sticky top-24 self-start bg-card border border-border p-4 rounded-md shadow-card">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
            Navigation
          </h4>
          <nav className="space-y-1">
            {SECTIONS.map((sec) => {
              const IconComponent = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleScroll(sec.id)}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-muted hover:text-accent hover:bg-accent-light rounded font-sans transition-colors flex items-center space-x-2"
                >
                  <IconComponent className="w-3.5 h-3.5 text-muted/70 shrink-0" />
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 space-y-6 w-full">
          
          {/* Welcome Card */}
          <Card id="welcome" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="collection" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
              <FolderOpen className="w-5 h-5 text-accent shrink-0" /> Information We Collect
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-4 font-sans">
              <p>
                Depending on how you use our platform, we may collect the following information:
              </p>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-ink flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-accent" /> Personal Information
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                  <li>Profile Information</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-ink flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-accent" /> Legal Information
                </h3>
                <p>Users may voluntarily upload legal documents such as:</p>
                <div className="grid grid-cols-2 gap-2 max-w-sm pt-1">
                  <span className="bg-surface px-2 py-1 rounded text-[10px] font-mono">FIRs</span>
                  <span className="bg-surface px-2 py-1 rounded text-[10px] font-mono">Contracts</span>
                  <span className="bg-surface px-2 py-1 rounded text-[10px] font-mono">Property Documents</span>
                  <span className="bg-surface px-2 py-1 rounded text-[10px] font-mono">Court Notices</span>
                  <span className="bg-surface px-2 py-1 rounded text-[10px] font-mono">Affidavits</span>
                  <span className="bg-surface px-2 py-1 rounded text-[10px] font-mono">Agreements</span>
                </div>
                <p className="italic pt-1 text-[11px]">
                  These documents are processed only to provide requested platform features.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-ink flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-accent" /> Usage Information
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
          <Card id="usage" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
              <div className="mt-2 p-3 bg-success/5 border border-success/15 rounded text-success text-[11px] font-medium">
                We do <strong>not</strong> sell your personal information.
              </div>
            </div>
          </Card>

          {/* AI-Powered Features Card */}
          <Card id="ai" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
              <div className="p-3.5 bg-warning/5 border border-warning/15 rounded text-warning space-y-1 text-[11px] font-sans">
                <span className="font-bold uppercase tracking-wider text-[10px] block">Important Notice</span>
                <p>
                  AI-generated responses are intended for informational purposes only and should not be considered legal advice. Users are encouraged to consult a qualified advocate before making legal decisions.
                </p>
              </div>
            </div>
          </Card>

          {/* Document Security Card */}
          <Card id="security" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="sharing" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="retention" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="rights" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="cookies" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="thirdparty" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="children" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="changes" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
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
          <Card id="contact" className="scroll-mt-24 p-6 md:p-8 space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink flex items-center gap-2.5 border-b border-border pb-3">
              <Mail className="w-5 h-5 text-accent shrink-0" /> Contact Us
            </h2>
            <div className="text-xs text-muted leading-relaxed space-y-3 font-sans">
              <p>For any questions regarding this Privacy Policy, please contact:</p>
              <div className="p-4 bg-surface border border-border rounded-md space-y-1.5 max-w-sm">
                <span className="font-bold text-ink text-xs block">LexBridge Team</span>
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
          <section className="space-y-4 pt-6">
            <h3 className="font-serif text-lg font-bold text-ink">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <Card key={index} className="overflow-hidden border border-border">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none transition-colors hover:bg-surface"
                    >
                      <span className="text-xs md:text-sm font-semibold text-ink font-sans">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-muted" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-4 pt-1 border-t border-border/10">
                        <p className="text-xs text-muted leading-relaxed font-sans">
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
          <Card id="consent" className="scroll-mt-24 p-5 bg-accent-light/40 border border-accent/15 rounded shadow-sm text-center">
            <p className="text-xs font-medium text-ink font-sans">
              By using LexBridge, you agree to this <span className="font-bold text-accent">Privacy Policy</span>.
            </p>
          </Card>

        </main>
      </div>

      {/* Public Footer */}
      <footer className="mt-auto py-8 px-6 bg-ink text-[#a5abbf] border-t border-border/10 text-center text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-white">
            <span className="font-semibold text-sm tracking-tight">LexBridge</span>
            <Scale className="w-4 h-4 text-accent-light shrink-0" />
          </div>
          <div>© 2026 LexBridge. All rights reserved.</div>
          <div>
            <Link to="/" className="hover:text-white hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
