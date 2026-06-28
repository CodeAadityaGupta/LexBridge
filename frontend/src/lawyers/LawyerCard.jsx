import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck } from 'lucide-react';
import Avatar from '../UI/Avatar';
import Badge from '../UI/Badge';

export default function LawyerCard({ lawyer, isActive = false }) {
  // Support both backend field names and legacy mock field names
  const id = lawyer.id;
  const name = lawyer.name;
  // Backend: specialities (array); mock: specialty (string)
  const primarySpecialty = lawyer.specialty
    || (lawyer.specialities && lawyer.specialities[0])
    || '';
  // Backend: consultation_fee (int in INR); mock: fee (formatted string)
  const fee = lawyer.fee
    || (lawyer.consultation_fee != null ? `₹${lawyer.consultation_fee.toLocaleString('en-IN')}` : '');
  // Backend: experience_years; mock: experience
  const experience = lawyer.experience ?? lawyer.experience_years;
  // Backend: photo_url; mock: avatar
  const avatar = lawyer.avatar ?? lawyer.photo_url ?? null;
  // Backend: rating (float)
  const rating = lawyer.rating;

  return (
    <Link to={`/lawyer/${id}`} className="block select-none group">
      <div
        className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 cursor-pointer h-full
          ${isActive 
            ? 'bg-accent-light border-accent/20 shadow-md' 
            : 'bg-card border-border/60 hover:border-accent/30 hover:shadow-card hover:-translate-y-[2px] active:scale-[0.98] active:translate-y-0'
          }
        `}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            {/* Avatar */}
            <Avatar name={name} src={avatar} size="md" className="border border-border/80 shadow-sm shrink-0" />
            
            {/* Rating badge */}
            <div className="flex items-center space-x-1 text-[10px] text-ink font-bold bg-surface/80 px-2 py-0.5 rounded border border-border/50 shadow-sm shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
              <span>{rating}</span>
            </div>
          </div>

          <p className="text-xs text-muted font-sans font-medium">
            {specialty}
          </p>

          <div className="flex items-center justify-between pt-1 text-[11px] text-muted font-sans font-medium">
            <span>{experience || '10+'} yrs experience</span>
            <span className="text-ink font-semibold">{fee}</span>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4 mt-4 flex items-center justify-between text-[11px] text-muted font-sans font-semibold">
          <span>{experience || '10+'} yrs exp</span>
          <span className="text-ink font-bold">{fee}</span>
        </div>
      </div>
    </Link>
  );
}
