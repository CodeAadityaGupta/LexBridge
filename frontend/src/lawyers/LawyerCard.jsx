import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Avatar from '../UI/Avatar';
import Badge from '../UI/Badge';

export default function LawyerCard({ lawyer, isActive = false }) {
  const { id, name, specialty, rating, fee, avatar, experience } = lawyer;

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
            {specialty}
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
