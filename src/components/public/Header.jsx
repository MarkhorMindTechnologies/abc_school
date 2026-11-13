import React from 'react';
import { Link } from 'react-router-dom';
import { schoolData } from '../../data/websiteData';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Header({ onOpenAdmissionModal, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 lg:static z-40 h-20 sm:h-[88px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">
        
        {/* Left: School Crest & Dignified Identity */}
        <Link to="/" className="flex items-center gap-3.5 sm:gap-4 group">
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-lg bg-blue-950 border-2 border-amber-500/80 flex flex-col items-center justify-center text-white shrink-0 shadow-sm group-hover:bg-blue-900 transition">
            <span className="font-black text-lg sm:text-xl tracking-wider text-amber-300">ABC</span>
            <span className="text-[8px] font-mono font-bold tracking-widest uppercase text-slate-300">ESTD 1988</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-950 text-xl sm:text-2xl lg:text-3xl tracking-tight leading-tight uppercase font-serif">
                ABC Public School
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-blue-900 mt-0.5 hidden sm:block">
              Senior Secondary Co-Educational Institution • Affiliated to CBSE, New Delhi
            </p>
            <p className="text-xs text-slate-600 italic hidden md:block">
              "{schoolData.motto}"
            </p>
          </div>
        </Link>

        {/* Right: Quick Action & Helpline */}
        <div className="flex items-center gap-3.5 sm:gap-5">
          <div className="hidden lg:flex flex-col text-right pr-4 border-r border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admissions Helpline</span>
            <a href={`tel:${schoolData.helpline}`} className="font-bold text-slate-900 text-base font-mono hover:text-blue-800 transition">
              {schoolData.helpline}
            </a>
          </div>

          <button
            onClick={onOpenAdmissionModal}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Admission Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>
    </header>
  );
}
