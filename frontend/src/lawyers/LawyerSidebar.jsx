import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import LawyerCard from './LawyerCard';
import Input from '../UI/input';

// Static lawyers for Step 6 (mock data first)
const MOCK_LAWYERS = [
  {
    id: '1',
    name: 'Rohan Sharma',
    specialty: 'Criminal Defence',
    rating: '4.8',
    fee: '₹1,500',
    experience: 12,
    avatar: '',
  },
  {
    id: '2',
    name: 'Priya Menon',
    specialty: 'Property Disputes',
    rating: '4.9',
    fee: '₹2,000',
    experience: 15,
    avatar: '',
  },
  {
    id: '3',
    name: 'Amit Patel',
    specialty: 'Family Law',
    rating: '4.7',
    fee: '₹1,200',
    experience: 8,
    avatar: '',
  },
  {
    id: '4',
    name: 'Siddharth Sen',
    specialty: 'Labour Law',
    rating: '4.8',
    fee: '₹1,800',
    experience: 10,
    avatar: '',
  },
  {
    id: '5',
    name: 'Anjali Deshmukh',
    specialty: 'Corporate Law',
    rating: '4.9',
    fee: '₹3,000',
    experience: 14,
    avatar: '',
  },
];

const SPECIALTIES = [
  'All Specialties',
  'Criminal Defence',
  'Property Disputes',
  'Family Law',
  'Labour Law',
  'Corporate Law',
];

export default function LawyerSidebar() {
  const [lawyers, setLawyers] = useState(MOCK_LAWYERS);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');

  // Client-side search and filter logic
  useEffect(() => {
    let filtered = MOCK_LAWYERS;

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

    setLawyers(filtered);
  }, [search, specialty]);

  return (
    <aside className="w-full md:w-[320px] bg-card border-t md:border-t-0 md:border-l border-border flex flex-col h-full shrink-0">
      {/* Search & Filter Header */}
      <div className="p-4 border-b border-border space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted font-sans">
          Advocate Directory
        </h3>

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

        {/* Specialty Select Dropdown */}
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
          {/* Custom Select Arrow Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lawyers Catalog Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {lawyers.length > 0 ? (
          lawyers.map((lawyer) => (
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
