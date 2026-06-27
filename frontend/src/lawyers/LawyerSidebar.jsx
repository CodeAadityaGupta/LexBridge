import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { lawyerService } from '../../services/lawyerService';
import LawyerCard from './LawyerCard';
import Spinner from '../UI/spinner';

const SPECIALTIES = [
  'All Specialties',
  'Criminal Defence',
  'Property Disputes',
  'Family Law',
  'Labour Law',
  'Corporate Law',
];

export default function LawyerSidebar({ onClose, isMobileDrawer = false }) {
  const [allLawyers, setAllLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [loading, setLoading] = useState(true);

  // Fetch lawyers on mount
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const data = await lawyerService.getLawyers();
        setAllLawyers(data);
        setFilteredLawyers(data);
      } catch (err) {
        console.error("Failed to load lawyers in sidebar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyers();
  }, []);

  // Filter search logic
  useEffect(() => {
    let filtered = allLawyers;

    if (search.trim() !== '') {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(term) ||
          l.specialty.toLowerCase().includes(term)
      );
    }

    if (specialty !== 'All Specialties') {
      filtered = filtered.filter((l) => l.specialty === specialty);
    }

    setFilteredLawyers(filtered);
  }, [search, specialty, allLawyers]);

  return (
    <aside 
      className={`bg-card flex flex-col h-full shrink-0
        ${isMobileDrawer 
          ? 'w-full' 
          : 'hidden md:flex md:w-[260px] lg:w-[320px] md:border-l border-border'
        }
      `}
    >
      {/* Search & Filter Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted font-sans">
            Advocate Directory
          </h3>
          {/* Close button for mobile drawers */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-full text-muted hover:bg-accent-light hover:text-accent transition-colors md:hidden outline-none"
              aria-label="Close sidebar directory"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
          <input
            type="text"
            placeholder="Search by name or issue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 bg-surface border border-border rounded font-sans text-xs text-ink outline-none transition-all focus:ring-2 focus:ring-accent/15 focus:border-accent"
          />
        </div>

        {/* Specialty Dropdown */}
        <div className="relative">
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full h-10 px-3 bg-surface border border-border rounded font-sans text-xs text-ink outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-accent/15 focus:border-accent"
          >
            {SPECIALTIES.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Directory Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-2">
            <Spinner size="md" />
            <span className="text-xs text-muted font-sans">Loading advocates...</span>
          </div>
        ) : filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))
        ) : (
          <div className="py-8 px-4 text-center">
            <p className="text-xs text-muted leading-relaxed font-sans">
              No advocates match that filter. Try a different specialty.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
