import React from 'react';
import { Link } from 'react-router-dom';
import { schoolData } from '../../data/websiteData';
import { Phone, Mail, MapPin, Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function PublicFooter({ onOpenAdmissionModal, onOpenErpModal }) {
  return (
    <footer className="bg-slate-950 text-slate-300 text-sm border-t-2 border-amber-500">
      {/* Top Banner inside Footer */}
      <div className="bg-blue-950 border-b border-blue-900/60 py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight">
              Admissions Open for Academic Session 2026–2027
            </h3>
            <p className="text-sm text-blue-200 mt-1">
              Enrollments available for Nursery, Primary, Middle and Class 11 (Science, Commerce, Humanities).
            </p>
          </div>

          <div className="flex items-center gap-3.5">
            <button
              onClick={onOpenAdmissionModal}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold uppercase tracking-wider rounded-lg transition shadow-sm text-sm cursor-pointer"
            >
              Online Admission Enquiry
            </button>
            <Link
              to="/admissions"
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg border border-blue-700 transition text-sm"
            >
              Fee Structure & Guidelines
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-blue-700 border border-amber-400/80 flex items-center justify-center font-black text-white text-base">
                ABC
              </div>
              <div>
                <p className="font-extrabold text-white text-base uppercase font-serif tracking-tight">ABC Public School</p>
                <p className="text-xs text-amber-400 font-mono font-bold">ESTABLISHED 1988</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm">
              Affiliated to the Central Board of Secondary Education (CBSE), New Delhi. Dedicated to academic rigor, scientific inquiry, moral fortitude, and character leadership.
            </p>

            <div className="pt-2 text-sm space-y-1.5 text-slate-300">
              <p><span className="text-slate-400 font-medium">CBSE Affiliation No:</span> <span className="font-mono font-bold text-white">{schoolData.affiliationNo}</span></p>
              <p><span className="text-slate-400 font-medium">School Code:</span> <span className="font-mono font-bold text-white">{schoolData.schoolCode}</span></p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-slate-800 pb-2.5">
              Institutional Wings
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/about" className="hover:text-white transition">• School Heritage & Legacy</Link></li>
              <li><Link to="/academics" className="hover:text-white transition">• CBSE Curriculum & Pedagogy</Link></li>
              <li><Link to="/faculty" className="hover:text-white transition text-amber-300 font-medium">• Teaching Faculty Directory</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition">• Admission Roadmap & Criteria</Link></li>
              <li><Link to="/campus" className="hover:text-white transition">• Laboratories & Smart Campus</Link></li>
              <li><Link to="/student-life" className="hover:text-white transition">• Student Clubs & Sports Leagues</Link></li>
              <li><Link to="/achievements" className="hover:text-white transition">• Board Examination Toppers</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition">• Campus Photo & Video Archive</Link></li>
            </ul>
          </div>

          {/* Col 3: Statutory & CBSE Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-slate-800 pb-2.5">
              Statutory Disclosures
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/mandatory-disclosure" className="text-amber-400 font-semibold hover:underline">• Mandatory Public Disclosure (Appendix IX)</Link></li>
              <li><Link to="/tc-verification" className="hover:text-white transition">• Transfer Certificate (TC) Verification</Link></li>
              <li><Link to="/admissions#fee-structure" className="hover:text-white transition">• Approved Fee Structure 2026–27</Link></li>
              <li><Link to="/news" className="hover:text-white transition">• Official Circulars & Notices</Link></li>
              <li><a href="https://cbse.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">• CBSE Official Portal <ExternalLink className="w-3.5 h-3.5 text-slate-400" /></a></li>
              <li><a href="https://ncert.nic.in" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">• NCERT Textbooks <ExternalLink className="w-3.5 h-3.5 text-slate-400" /></a></li>
            </ul>
          </div>

          {/* Col 4: Campus Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm border-b border-slate-800 pb-2.5">
              Campus Administration
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>{schoolData.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono">{schoolData.helpline} / {schoolData.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{schoolData.email}</span>
              </p>
            </div>

            <div className="pt-2 text-xs sm:text-sm">
              <p className="text-slate-400 font-medium">Visiting Hours:</p>
              <p className="font-medium text-slate-200 mt-0.5">{schoolData.visitingHours}</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs sm:text-sm">
          <div>
            © {new Date().getFullYear()} ABC Public Higher Secondary School, Srinagar. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition">Privacy Policy (DPDP Act)</Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-slate-200 transition">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/mandatory-disclosure" className="hover:text-slate-200 transition">CBSE Disclosure</Link>
            <span>•</span>
            <button onClick={onOpenErpModal} className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer">
              ERP Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
