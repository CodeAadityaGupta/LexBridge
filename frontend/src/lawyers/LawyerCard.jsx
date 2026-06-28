import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, ArrowRight, Briefcase } from 'lucide-react';
import Avatar from '../UI/Avatar';

export default function LawyerCard({ lawyer, isActive = false }) {
  const id = lawyer.id;
  const name = lawyer.name;
  
  const primarySpecialty = lawyer.specialty
    || (lawyer.specialities && lawyer.specialities[0])
    || 'General Practice';
    
  const specialties = lawyer.specialities || [lawyer.specialty] || [];
  
  const fee = lawyer.fee
    || (lawyer.consultation_fee != null ? `₹${lawyer.consultation_fee.toLocaleString('en-IN')}` : '₹1,000');
    
  const experience = lawyer.experience ?? lawyer.experience_years;
  const avatar = lawyer.avatar ?? lawyer.photo_url ?? null;
  const rating = lawyer.rating || 4.5;
  const city = lawyer.city || 'India';

  return (
    <Link to={`/lawyer/${id}`} className="block select-none group h-full">
      <div
        className={`flex flex-col justify-between p-5 rounded-xl border transition-all duration-300 cursor-pointer h-full relative overflow-hidden
          ${isActive 
            ? 'bg-accent-light/60 border-accent shadow-md' 
            : 'bg-card border-border/80 hover:border-accent/40 hover:shadow-card hover:-translate-y-[2px] active:scale-[0.99]'
          }
        `}
      >
        {/* Subtle top decoration line for hover */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent/40 via-accent to-accent-light transition-all duration-300 opacity-0 group-hover:opacity-100" />
        
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            {/* Avatar & Verification Indicator */}
            <div className="relative">
              <Avatar name={name} src={avatar} size="md" className="border-2 border-border shadow-sm shrink-0" />
              <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-0.5 border border-card shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 fill-success text-white stroke-[2.5]" />
              </div>
            </div>
            
            {/* Rating badge */}
            <div className="flex items-center space-x-1 text-[11px] text-ink font-bold bg-surface/90 px-2.5 py-0.5 rounded-full border border-border/50 shadow-sm shrink-0">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
              <span>{Number(rating).toFixed(1)}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <h4 className="font-sans font-bold text-sm md:text-base text-ink group-hover:text-accent transition-colors truncate">
                {name}
              </h4>
            </div>
            
            {/* Primary specialty & City */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold text-muted">
              <span className="text-accent font-bold uppercase tracking-wider">{primarySpecialty}</span>
              <span className="w-1 h-1 rounded-full bg-muted/40" />
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-muted/60" />
                {city}
              </span>
            </div>
          </div>

          {/* Sub-specialties tags */}
          {specialties.length > 1 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {specialties.slice(1, 3).map((spec, i) => (
                <span 
                  key={i} 
                  className="px-2 py-0.5 rounded bg-surface border border-border/60 text-[9px] font-semibold text-muted/95 tracking-wide"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/40 pt-3.5 mt-4 flex items-center justify-between text-[11px] text-muted font-sans font-semibold">
          <div className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-muted/50" />
            <span>{experience || '10+'} yrs exp</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink font-bold text-xs">{fee}</span>
            <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center text-accent opacity-0 group-hover:opacity-100 group-hover:bg-accent group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
