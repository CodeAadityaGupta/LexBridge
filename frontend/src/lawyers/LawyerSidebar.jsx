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
        (l) => {
          // Support both backend (specialities array) and mock (specialty string)
          const specialtyStr = l.specialty
            || (Array.isArray(l.specialities) ? l.specialities.join(' ') : '');
          return (
            l.name.toLowerCase().includes(term) ||
            specialtyStr.toLowerCase().includes(term)
          );
        }
      );
    }

    if (specialty !== 'All Specialties') {
      filtered = filtered.filter((l) => {
        // Backend: specialities is an array; mock: specialty is a string
        if (Array.isArray(l.specialities)) {
          return l.specialities.includes(specialty);
        }
        return l.specialty === specialty;
      });
    }

    setFilteredLawyers(filtered);
  }, [search, specialty, allLawyers]);

  return (
    <div className="bg-card flex flex-col h-full w-full overflow-hidden">
      {/* Search & Filter Header */}
      <div className="p-4 border-b border-border space-y-3 shrink-0">
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

        {/* Filters Group (flex row on desktop for better horizontal space usage) */}
        <div className={`grid gap-3 ${isMobileDrawer ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
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
      </div>

      {/* Directory Catalog Grid / list Scroll Area */}
      <div 
        className={`flex-1 overflow-y-auto p-4
          ${isMobileDrawer 
            ? 'space-y-3' 
            : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 content-start'
          }
        `}
      >
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-2 col-span-full">
            <Spinner size="md" />
            <span className="text-xs text-muted font-sans">Loading advocates...</span>
          </div>
        ) : filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))
        ) : (
          <div className="py-12 px-4 text-center col-span-full">
            <p className="text-xs text-muted leading-relaxed font-sans">
              No advocates match that filter. Try a different specialty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
