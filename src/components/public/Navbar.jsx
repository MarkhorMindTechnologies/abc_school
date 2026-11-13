import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Lock } from 'lucide-react';

export default function Navbar({ onOpenErpModal, mobileMenuOpen, setMobileMenuOpen }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'About Us',
      path: '/about',
      dropdown: [
        { title: 'Heritage & Legacy (Since 1988)', path: '/about' },
        { title: "Chairman's Vision", path: '/about#chairman' },
        { title: "Principal's Address", path: '/about#principal' },
        { title: 'Vision, Mission & Core Values', path: '/about#vision' },
        { title: 'Distinguished Teaching Faculty', path: '/faculty' },
        { title: 'School Managing Committee (SMC)', path: '/about#governance' },
        { title: 'Mandatory Public Disclosure (CBSE)', path: '/mandatory-disclosure' }
      ]
    },
    {
      name: 'Academics',
      path: '/academics',
      dropdown: [
        { title: 'Academic Curriculum & Pedagogy', path: '/academics' },
        { title: 'Pre-Primary Wing (Nursery – UKG)', path: '/academics#pre-primary' },
        { title: 'Primary Wing (Classes 1 – 5)', path: '/academics#primary' },
        { title: 'Middle School Wing (Classes 6 – 8)', path: '/academics#middle' },
        { title: 'Secondary Wing (Classes 9 – 10)', path: '/academics#secondary' },
        { title: 'Senior Secondary Streams (11 & 12)', path: '/academics#senior-secondary' },
        { title: 'Distinguished Teaching Faculty', path: '/faculty' }
      ]
    },
    { name: 'Faculty', path: '/faculty' },
    {
      name: 'Admissions',
      path: '/admissions',
      dropdown: [
        { title: 'Admission Procedure & Age Criteria', path: '/admissions' },
        { title: 'Fee Structure 2026–2027', path: '/admissions#fee-structure' },
        { title: 'Online Admission Enquiry Form', path: '/admissions#enquiry-form' },
        { title: 'Transfer Certificate (TC) Verification', path: '/tc-verification' }
      ]
    },
    {
      name: 'Campus',
      path: '/campus',
      dropdown: [
        { title: '8.5 Acre Campus Overview', path: '/campus' },
        { title: 'STEM & Science Laboratories', path: '/campus#labs' },
        { title: 'Rabindranath Tagore Central Library', path: '/campus#library' },
        { title: 'Major Dhyan Chand Sports Arena', path: '/campus#sports' },
        { title: 'Smart Digitized Classrooms', path: '/campus#smart-classes' },
        { title: 'GPS-Monitored Bus Fleet', path: '/campus#transport' }
      ]
    },
    {
      name: 'Student Life',
      path: '/student-life',
      dropdown: [
        { title: 'Student Societies & Hobby Clubs', path: '/student-life#clubs' },
        { title: 'Athletics & Physical Education', path: '/student-life#athletics' },
        { title: 'Visual & Performing Arts', path: '/student-life#arts' },
        { title: 'Social Service & Environmental Cell', path: '/student-life#community' }
      ]
    },
    {
      name: 'Achievements',
      path: '/achievements',
      dropdown: [
        { title: 'CBSE Board Examination Toppers', path: '/achievements' },
        { title: 'Olympiad & National Awards', path: '/achievements#awards' },
        { title: 'Distinguished Alumni Placement', path: '/achievements#alumni' }
      ]
    },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Circulars', path: '/news' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-md h-[52px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        
        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between h-full">
          <div className="flex items-center space-x-0.5 xl:space-x-1 h-full">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group shrink-0 h-full flex items-center"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-2.5 xl:px-3.5 h-full text-xs xl:text-sm font-semibold tracking-normal transition border-b-2 whitespace-nowrap shrink-0 ${
                      isActive && link.path === window.location.pathname
                        ? 'text-white border-amber-400 bg-slate-800/80'
                        : 'text-slate-200 border-transparent hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.dropdown && <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition shrink-0" />}
                </NavLink>

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute left-0 top-full w-72 rounded-lg bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {link.dropdown.map((subItem, idx) => (
                      <Link
                        key={idx}
                        to={subItem.path}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition font-medium border-b border-slate-100 last:border-none"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right ERP Button */}
          <div className="flex items-center pl-3 shrink-0">
            <button
              onClick={onOpenErpModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-bold uppercase tracking-wider text-amber-300 bg-blue-950 border border-blue-600 hover:bg-blue-900 rounded-lg transition shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>ERP Portal</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 space-y-2 max-h-[80vh] overflow-y-auto bg-slate-900 px-4">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-slate-800/80 pb-1.5">
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-bold text-slate-100 hover:text-white hover:bg-slate-800 rounded-lg"
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="pl-6 space-y-1 py-1">
                    {link.dropdown.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-sm text-slate-300 hover:text-white"
                      >
                        • {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-3 px-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenErpModal();
                }}
                className="w-full text-center py-2.5 text-sm font-bold uppercase tracking-wider text-amber-300 bg-blue-950 border border-blue-600 rounded-lg"
              >
                Access ERP Portal
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
