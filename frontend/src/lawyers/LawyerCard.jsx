import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
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
    <Link to={`/lawyer/${id}`} className="block select-none">
      <div
        className={`flex items-start space-x-3 p-4 rounded-md border transition-all duration-150 cursor-pointer
          ${isActive 
            ? 'bg-accent-light border-accent/20' 
            : 'bg-card border-border hover:bg-accent-light/40 hover:border-accent/10 active:scale-[0.98]'
          }
        `}
      >
        {/* Avatar */}
        <Avatar name={name} src={avatar} size="md" className="border-accent/10" />

        {/* Details */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-sans font-semibold text-sm text-ink truncate">
              {name}
            </h4>
            <div className="flex items-center space-x-0.5 text-xs text-ink shrink-0 font-medium bg-surface/80 px-1.5 py-0.5 rounded border border-border/40">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          <p className="text-xs text-muted font-sans font-medium">
            {primarySpecialty}
          </p>

          <div className="flex items-center justify-between pt-1 text-[11px] text-muted font-sans font-medium">
            <span>{experience || '10+'} yrs experience</span>
            <span className="text-ink font-semibold">{fee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
