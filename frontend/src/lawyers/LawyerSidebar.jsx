import React, { useState, useEffect } from 'react';
import { Search, X, Scale, Shield, Home, Heart, Briefcase, Cpu, UserCheck, ShoppingBag, Compass } from 'lucide-react';
import { lawyerService } from '../../services/lawyerService';
import LawyerCard from './LawyerCard';
import Spinner from '../UI/spinner';

const CATEGORIES = [
  {
    id: 'all',
    name: 'All Specialties',
    description: 'All registered legal advocates',
    icon: Scale,
    matches: (l) => true
  },
  {
    id: 'criminal',
    name: 'Criminal Law',
    description: 'Bail, trials & defense advocacy',
    icon: Shield,
    matches: (l) => {
      const specs = l.specialities || [l.specialty];
      return specs.some(s => s && /criminal|bail|white collar|defence|violence|pocso/i.test(s));
    }
  },
  {
    id: 'property',
    name: 'Property & Land',
    description: 'Wills, inheritance & RERA disputes',
    icon: Home,
    matches: (l) => {
      const specs = l.specialities || [l.specialty];
      return specs.some(s => s && /property|tenancy|real estate|rera|will|inheritance|partition/i.test(s));
    }
  },
  {
    id: 'family',
    name: 'Family & Custody',
    description: 'Divorce, custody & matrimonial',
    icon: Heart,
    matches: (l) => {
      const specs = l.specialities || [l.specialty];
      return specs.some(s => s && /family|divorce|custody|matrimonial/i.test(s));
    }
  },
  {
    id: 'corporate',
    name: 'Corporate & IP',
    description: 'Compliance, M&A, startups & finance',
    icon: Briefcase,
    matches: (l) => {
      const specs = l.specialities || [l.specialty];
      return specs.some(s => s && /corporate|contract|intellectual|trademark|startup|venture|funding|m&a/i.test(s));
    }
  },
  {
    id: 'cyber',
    name: 'Cyber & Technology',
    description: 'Privacy, IT Act & online scams',
    icon: Cpu,
    matches: (l) => {
      const specs = l.specialities || [l.specialty];
      return specs.some(s => s && /cyber|privacy|it act|data/i.test(s));
    }
  },
  {
    id: 'labour',
    name: 'Labour & Employment',
    description: 'POSH, employment & workplace disputes',
    icon: UserCheck,
    matches: (l) => {
      const specs = l.specialities || [l.specialty];
      return specs.some(s => s && /labour|employment|termination|harassment|wage|severance/i.test(s));
    }
  },
  {
    id: 'consumer',
    name: 'Consumer Protection',
    description: 'Product liability & e-commerce fraud',
    icon: ShoppingBag,
    matches: (l) => {
      const specs = l.specialities || [l.specialty];
      return specs.some(s => s && /consumer|commerce|product|refund/i.test(s));
    }
  }
];

export default function LawyerSidebar({ onClose, isMobileDrawer = false }) {
  const [allLawyers, setAllLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

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

  // Filter search and category selection
  useEffect(() => {
    let filtered = allLawyers;

    // Filter by category
    const activeCategory = CATEGORIES.find(c => c.id === selectedCategoryId);
    if (activeCategory) {
      filtered = filtered.filter(activeCategory.matches);
    }

    // Filter by search text
    if (search.trim() !== '') {
      const term = search.toLowerCase();
      filtered = filtered.filter((l) => {
        const specialtyStr = l.specialty
          || (Array.isArray(l.specialities) ? l.specialities.join(' ') : '');
        const cityStr = l.city || '';
        return (
          l.name.toLowerCase().includes(term) ||
          specialtyStr.toLowerCase().includes(term) ||
          cityStr.toLowerCase().includes(term)
        );
      });
    }

    setFilteredLawyers(filtered);
  }, [search, selectedCategoryId, allLawyers]);

  // Helper to count how many lawyers fall into each category dynamically
  const getCategoryCount = (categoryId) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) return 0;
    return allLawyers.filter(category.matches).length;
  };

  // Reset page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategoryId]);

  const activeCategoryObject = CATEGORIES.find(c => c.id === selectedCategoryId) || CATEGORIES[0];
  
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredLawyers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLawyers.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-surface flex flex-col md:flex-row h-full w-full overflow-hidden select-none">
      
      {/* LEFT COLUMN: Categories Sidebar (Hidden on mobile, beautiful column on desktop) */}
      <div className="hidden md:flex flex-col w-72 bg-card shrink-0 h-full overflow-hidden shadow-sm">
        <div className="p-5 shrink-0 bg-card flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-accent" />
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-ink font-sans">
              Practice Areas
            </h3>
          </div>
          <span className="text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
            {allLawyers.length} Total
          </span>
        </div>

        {/* Category list scroll area */}
        <div className="flex-1 min-h-0 overflow-y-auto py-3 px-3 space-y-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategoryId === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 group
                  ${isActive 
                    ? 'bg-accent text-white shadow-md shadow-accent/10 translate-x-1' 
                    : 'hover:bg-accent-light text-ink hover:text-accent'
                  }
                `}
              >
                <div className={`p-2 rounded-md shrink-0 transition-colors
                  ${isActive ? 'bg-white/15 text-white' : 'bg-surface text-muted group-hover:text-accent'}
                `}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-xs truncate">{cat.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0
                      ${isActive ? 'bg-white/20 text-white' : 'bg-surface text-muted'}
                    `}>
                      {count}
                    </span>
                  </div>
                  <p className={`text-[10px] mt-0.5 truncate leading-relaxed
                    ${isActive ? 'text-white/70' : 'text-muted'}
                  `}>
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Search Header & Grid (occupies the main space) */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        
        {/* Search and Filters Header */}
        <div className="p-5 space-y-4 shrink-0 bg-surface">
          <div className="flex items-center justify-between">
            <div className="md:hidden flex items-center gap-2">
              <Compass className="w-4.5 h-4.5 text-accent" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted font-sans">
                Advocate Directory
              </h3>
            </div>
            <div className="hidden md:block">
              <h2 className="font-sans font-bold text-base text-ink">
                {activeCategoryObject.name}
              </h2>
              <p className="text-[11px] text-muted font-sans font-medium mt-0.5">
                {filteredLawyers.length} advocate{filteredLawyers.length === 1 ? '' : 's'} found matches
              </p>
            </div>
            
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

          {/* Search Input and Mobile Category Selector */}
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
              <input
                type="text"
                placeholder="Search by name, specialty, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-3.5 bg-card rounded-md font-sans text-xs text-ink outline-none transition-all focus:shadow-focus"
              />
            </div>

            {/* Mobile Category Scroll Pills (Visible ONLY on mobile/drawer) */}
            <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategoryId === cat.id;
                const count = getCategoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-sans whitespace-nowrap transition-all duration-200
                      ${isActive 
                        ? 'bg-accent text-white shadow-sm' 
                        : 'bg-card text-muted hover:bg-accent-light/50 shadow-sm'
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full
                      ${isActive ? 'bg-white/20 text-white' : 'bg-surface text-muted'}
                    `}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Directory Card Grid Area */}
        <div 
          className={`flex-1 min-h-0 overflow-y-auto p-5
            ${isMobileDrawer 
              ? 'space-y-3' 
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 content-start'
            }
          `}
        >
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-2 col-span-full">
              <Spinner size="md" />
              <span className="text-xs text-muted font-sans font-semibold">Loading advocates...</span>
            </div>
          ) : currentItems.length > 0 ? (
            currentItems.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))
          ) : (
            <div className="py-24 px-4 text-center col-span-full space-y-3">
              <Scale className="w-10 h-10 text-muted/40 mx-auto" />
              <p className="text-xs text-muted font-sans font-semibold">
                No matching advocates found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredLawyers.length > ITEMS_PER_PAGE && (
          <div className="p-4 bg-surface flex items-center justify-between shrink-0 select-none">
            <span className="text-[11px] text-muted font-sans font-medium">
              Showing <span className="text-ink font-bold">{indexOfFirstItem + 1}</span>–
              <span className="text-ink font-bold">{Math.min(indexOfLastItem, filteredLawyers.length)}</span> of{' '}
              <span className="text-ink font-bold">{filteredLawyers.length}</span> advocates
            </span>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-card text-muted hover:bg-accent-light hover:text-accent shadow-sm transition-colors outline-none disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted disabled:shadow-none"
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-8 h-8 px-2 rounded text-xs font-bold font-sans transition-all duration-200 outline-none
                    ${currentPage === page
                      ? 'bg-accent text-white shadow-sm'
                      : 'bg-card text-muted hover:bg-accent-light hover:text-accent shadow-sm'
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded bg-card text-muted hover:bg-accent-light hover:text-accent shadow-sm transition-colors outline-none disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted disabled:shadow-none"
                aria-label="Next page"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
