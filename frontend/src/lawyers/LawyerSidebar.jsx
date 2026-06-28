import React, { useState, useEffect } from 'react';
import { Search, X, Scale } from 'lucide-react';
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
    <div className="bg-card flex flex-col h-full w-full overflow-hidden select-none">
      {/* Search & Filter Header */}
      <div className="p-5 border-b border-border/50 space-y-4 shrink-0 bg-surface/10">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted font-sans">
            Advocate Directory
          </h3>
          {/* Close button for mobile drawers */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-muted hover:bg-accent-light hover:text-accent transition-colors md:hidden outline-none"
              aria-label="Close sidebar directory"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className={`grid gap-3 ${isMobileDrawer ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-3.5 bg-surface border border-border/80 rounded-md font-sans text-xs text-ink outline-none transition-all focus:shadow-focus focus:border-accent"
            />
          </div>

          {/* Specialty Dropdown */}
          <div className="relative">
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full h-10 px-3.5 bg-surface border border-border/80 rounded-md font-sans text-xs text-ink outline-none appearance-none cursor-pointer focus:shadow-focus focus:border-accent"
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Catalog Grid Scroll Area */}
      <div 
        className={`flex-1 overflow-y-auto p-5
          ${isMobileDrawer 
            ? 'space-y-3' 
            : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 content-start'
          }
        `}
      >
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-2 col-span-full">
            <Spinner size="md" />
            <span className="text-xs text-muted font-sans font-semibold">Loading advocates...</span>
          </div>
        ) : filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))
        ) : (
          <div className="py-16 px-4 text-center col-span-full space-y-2">
            <Scale className="w-8 h-8 text-muted/40 mx-auto" />
            <p className="text-xs text-muted font-sans font-medium">
              No matching advocates found. Try adjusting filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
