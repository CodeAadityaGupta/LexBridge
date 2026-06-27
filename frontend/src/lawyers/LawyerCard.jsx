import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck } from 'lucide-react';
import Avatar from '../UI/Avatar';
import Badge from '../UI/Badge';

export default function LawyerCard({ lawyer, isActive = false }) {
  const { id, name, specialty, rating, fee, avatar, experience } = lawyer;

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

          <div className="space-y-1.5 min-w-0">
            <h4 className="font-sans font-bold text-xs md:text-sm text-ink group-hover:text-accent transition-colors truncate">
              {name}
            </h4>
            <p className="text-[10px] font-bold text-accent font-sans uppercase tracking-wider">
              {specialty}
            </p>
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
