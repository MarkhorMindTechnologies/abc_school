import React from 'react';
import { Phone, Award, Lock, ExternalLink } from 'lucide-react';
import { schoolData } from '../../data/websiteData';
import { Link } from 'react-router-dom';

export default function TopBar({ onOpenErpModal }) {
  return (
    <div className="bg-slate-950 text-slate-200 text-xs border-b border-slate-800 hidden md:block h-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        
        {/* Left: Affiliation & Accreditation */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-slate-300">
          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>CBSE Affiliation: <strong className="text-white font-semibold">{schoolData.affiliationNo}</strong></span>
          <span className="text-slate-600">|</span>
          <span>Code: <strong className="text-white font-semibold">{schoolData.schoolCode}</strong></span>
          <span className="text-slate-600">•</span>
          <span>Session {schoolData.activeSession}</span>
        </div>

        {/* Center: Live Admissions Notification (Shown on xl screens where plenty of space exists) */}
        <div className="hidden xl:flex items-center gap-2 bg-blue-950/90 px-3 py-1 rounded-md border border-blue-800 text-blue-200 text-xs whitespace-nowrap shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span>Admissions Open 2026–2027 (Nursery to Class 11)</span>
          <span className="text-slate-500">•</span>
          <Link to="/admissions" className="font-semibold text-amber-300 underline hover:text-amber-200">
            Apply Online →
          </Link>
        </div>

        {/* Right: Contact & Portal Gateway */}
        <div className="flex items-center gap-3.5 whitespace-nowrap shrink-0 text-slate-300">
          <a href={`tel:${schoolData.helpline}`} className="flex items-center gap-1.5 font-medium hover:text-white transition">
            <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="font-mono">{schoolData.helpline}</span>
          </a>
          <span className="text-slate-600">•</span>
          <Link to="/mandatory-disclosure" className="text-slate-300 hover:text-white transition font-medium">
            Mandatory Disclosure
          </Link>
          <span className="text-slate-600">•</span>
          <button
            onClick={onOpenErpModal}
            className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>ERP Portal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
