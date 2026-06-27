import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, ShieldCheck, MapPin, Briefcase, Award, AlertCircle } from 'lucide-react';
import { lawyerService } from '../services/lawyerService';
import Navbar from '../src/Layout/Navbar';
import Button from '../src/UI/Button';
import Card from '../src/UI/Card';
import Badge from '../src/UI/Badge';
import Spinner from '../src/UI/spinner';
import BookingModal from '../src/lawyers/BookingModal';

export default function LawyerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchLawyer = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await lawyerService.getLawyerById(id);
        setLawyer(data);
      } catch (err) {
        setError(err.message || 'Couldn\'t load this profile. Go back and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 select-none">
          <Spinner size="lg" />
          <span className="text-xs text-muted font-sans font-bold uppercase tracking-widest">Loading Profile Context...</span>
        </div>
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6">
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-error rounded-full shadow-sm">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-serif font-bold text-ink">Profile Loading Failure</h2>
            <p className="text-muted text-xs leading-relaxed font-sans">{error || "Couldn't load this profile. Go back and try again."}</p>
          </div>
          <Button onClick={() => navigate('/dashboard')} variant="secondary" className="flex items-center space-x-2 rounded-md">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to directory</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col page-fade">
      <Navbar />

      {/* Decorative background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 left-0 right-0 h-48 bg-gradient-to-b from-accent/5 to-transparent border-b border-border/40" />
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 space-y-6 z-10 relative">
        
        {/* Back Link */}
        <Link 
          to="/dashboard" 
          className="inline-flex items-center space-x-1.5 text-[9px] font-bold uppercase tracking-widest text-accent hover:underline mb-2 select-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </Link>

        {/* Profile Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Detailed Profile (60% width on desktop) */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            
            {/* Header info card with gradient details */}
            <Card className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-6 sm:space-y-0 sm:space-x-6 p-8 border-border/80 shadow-md relative overflow-hidden bg-card">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-indigo-500 to-accent" />
              
              {/* Avatar (72px) */}
              <div className="w-[72px] h-[72px] rounded-full bg-accent-light text-accent flex items-center justify-center font-bold text-2xl border border-accent/15 select-none shadow-sm shrink-0">
                {lawyer.name.split(' ').map(n => n[0]).join('')}
              </div>

              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h1 className="font-serif text-3xl text-ink font-bold leading-none">
                    {lawyer.name}
                  </h1>
                  
                  <div className="flex items-center space-x-1 text-[9px] text-ink bg-surface border border-border/75 px-2 py-0.5 rounded-md font-bold select-none shadow-sm self-center sm:self-auto shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                    <span>{lawyer.rating}</span>
                    <span className="text-muted/80 font-medium">({lawyer.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 select-none">
                  <span className="text-xs font-bold text-accent font-sans uppercase tracking-widest">
                    {lawyer.specialty}
                  </span>
                  <Badge variant="success" className="px-2.5 py-0.5 rounded-md text-[8px] font-bold flex items-center gap-1">
                    <Award className="w-3 h-3 text-success shrink-0" /> Verified Advocate
                  </Badge>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 pt-2 text-[11px] text-muted font-sans font-semibold border-t border-border/50">
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-accent" /> {lawyer.location}</span>
                  <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1 text-accent" /> {lawyer.experience} Years Exp</span>
                  <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-success" /> Bar: {lawyer.barReg}</span>
                </div>
              </div>
            </Card>

            {/* About / Bio */}
            <section className="space-y-4 bg-card/40 p-6 md:p-8 rounded-2xl border border-border/40">
              <h3 className="font-serif text-xl text-ink font-bold border-b border-border/60 pb-3">
                Professional Bio
              </h3>
              <div className="space-y-4 text-xs md:text-sm text-muted font-sans leading-relaxed">
                {lawyer.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Specialties Badges */}
            <section className="space-y-4 bg-card/40 p-6 md:p-8 rounded-2xl border border-border/40">
              <h3 className="font-serif text-xl text-ink font-bold border-b border-border/60 pb-3">
                Core Specialties
              </h3>
              <div className="flex flex-wrap gap-2 pt-1 select-none">
                {lawyer.specialties.map((spec) => (
                  <Badge key={spec} variant="accent" className="px-3 py-1 font-bold">
                    {spec}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Notable Cases */}
            <section className="space-y-5 bg-card/40 p-6 md:p-8 rounded-2xl border border-border/40">
              <h3 className="font-serif text-xl text-ink font-bold border-b border-border/60 pb-3">
                Case Histories
              </h3>
              
              <div className="space-y-4">
                {lawyer.cases.map((c, idx) => (
                  <Card key={idx} className="!p-6 border-l-4 border-l-accent shadow-sm flex flex-col space-y-3 border-border/60 bg-card">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-sans font-bold text-xs md:text-sm text-ink leading-snug">
                        {c.title}
                      </h4>
                      <Badge 
                        variant={
                          c.outcome.toLowerCase() === 'won' 
                            ? 'success' 
                            : c.outcome.toLowerCase() === 'settled' 
                              ? 'warning' 
                              : 'default'
                        }
                        className="shrink-0 font-bold select-none"
                      >
                        {c.outcome}
                      </Badge>
                    </div>

                    <div className="flex items-center text-[9px] text-muted font-sans font-bold uppercase tracking-wider select-none">
                      <span>Outcome Verified</span>
                      <span className="mx-1.5 text-border">•</span>
                      <span>Case Year: {c.year}</span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed font-sans">
                      {c.desc}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column - Booking sticky card (38% width on desktop) */}
          <div className="md:col-span-5 lg:col-span-4 md:sticky md:top-24 z-20">
            <Card className="space-y-6 p-7 border-border shadow-md bg-card relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-indigo-500" />
              
              <h3 className="font-serif text-xl text-ink font-bold border-b border-border/60 pb-3 select-none">
                Retainer & Fee Structure
              </h3>

              <div className="space-y-4 border-b border-border/50 pb-5">
                <div className="flex justify-between items-baseline font-sans">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-wider select-none">Consultation Fee</span>
                  <span className="text-2xl font-bold text-ink">{lawyer.fee}</span>
                </div>
                <div className="flex justify-between items-baseline font-sans">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-wider select-none">Typical Retainer</span>
                  <span className="text-xs font-bold text-ink">{lawyer.retainer}</span>
                </div>
              </div>

              <div className="space-y-3.5 font-sans text-xs text-muted select-none">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4.5 h-4.5 text-accent shrink-0" />
                  <span>Response from counsel within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-success shrink-0" />
                  <span>Secure, bank-grade encrypted parameters</span>
                </div>
              </div>

              <Button 
                onClick={() => setIsBookingOpen(true)}
                variant="primary" 
                className="w-full py-3.5 h-11 text-xs font-bold uppercase tracking-widest shadow-md rounded-md"
              >
                Book Consultation
              </Button>
            </Card>
          </div>

        </div>
      </main>

      {/* Booking Modal Overlay */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lawyerName={lawyer.name}
        specialty={lawyer.specialty}
        lawyerId={id}
      />
    </div>
  );
}
