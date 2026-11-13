import React from 'react';
import { Link } from 'react-router-dom';
import { useSchool } from '../../context/SchoolContext';
import { Globe, Shield } from 'lucide-react';

export default function Footer() {
  const { schoolInfo } = useSchool();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-5 px-4 sm:px-6 text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: School legal info */}
        <div>
          <p className="font-semibold text-slate-800">
            {schoolInfo.name} — {schoolInfo.affiliation}
          </p>
          <p className="text-[11px] text-slate-500">
            Affiliation No: {schoolInfo.affiliationNo} | School Code: {schoolInfo.schoolCode} | Session: {schoolInfo.activeSession}
          </p>
        </div>

        {/* Center: Domain & Security status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] text-slate-600">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-mono font-medium">{schoolInfo.customDomain}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-[11px] text-emerald-800">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-medium">SSL Secured (TLS 1.3)</span>
          </div>
        </div>

        {/* Right: Policy Links */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link to="/privacy-policy" className="text-slate-600 hover:text-blue-700 transition">
            Privacy Policy
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="/terms-and-conditions" className="text-slate-600 hover:text-blue-700 transition">
            Terms & Conditions
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="/settings" className="text-slate-600 hover:text-blue-700 transition">
            System Administration
          </Link>
        </div>
      </div>
    </footer>
  );
}
