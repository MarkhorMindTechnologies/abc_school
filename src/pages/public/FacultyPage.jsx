import React, { useState } from 'react';
import { Award, GraduationCap, BookOpen, Search, Filter, CheckCircle, Mail, Phone, Users, Sparkles } from 'lucide-react';
import { facultyData, schoolData } from '../../data/websiteData';
import { Link } from 'react-router-dom';

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    'All',
    'Senior Secondary Sciences',
    'Mathematics & Computing',
    'Senior Secondary Commerce & Humanities',
    'Languages & Literature',
    'Foundational & Middle Wing',
    'Sports & Holistic Development'
  ];

  const filteredFaculty = facultyData.filter((fac) => {
    const matchesDept = selectedDept === 'All' || fac.department === selectedDept;
    const matchesSearch = 
      fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Academic Mentorship & Calibre
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Distinguished Teaching Faculty & Department Heads
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Our classrooms and laboratories are led by seasoned postgraduate scholars, CBSE master trainers, and national mentors committed to intellectual excellence, critical thinking, and character formation.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
            <GraduationCap className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

      {/* Institutional Faculty Highlights Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-900 font-serif">84+</div>
            <p className="text-sm font-bold text-slate-900 mt-1 uppercase tracking-wider">Certified Faculty</p>
            <p className="text-xs text-slate-500 mt-0.5">100% B.Ed. & Master's Certified</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-900 font-serif">14.5 Yrs</div>
            <p className="text-sm font-bold text-slate-900 mt-1 uppercase tracking-wider">Average Experience</p>
            <p className="text-xs text-slate-500 mt-0.5">Senior CBSE Board Examiners</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-900 font-serif">1 : 1.5</div>
            <p className="text-sm font-bold text-slate-900 mt-1 uppercase tracking-wider">Teacher–Section Ratio</p>
            <p className="text-xs text-slate-500 mt-0.5">Optimum CBSE Standard</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-blue-900 font-serif">50+ Hrs</div>
            <p className="text-sm font-bold text-slate-900 mt-1 uppercase tracking-wider">Annual CPD Training</p>
            <p className="text-xs text-slate-500 mt-0.5">CBSE & NEP Pedagogical Workshops</p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search teacher by name, subject, degree, or role..."
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
              />
            </div>

            {/* Department Quick Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
                <Filter className="w-4 h-4" />
                <span>Department:</span>
              </span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-8">
          {filteredFaculty.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-700 hover:shadow-xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="h-56 overflow-hidden relative bg-slate-900">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-xs text-amber-400 rounded-md font-mono font-bold text-xs">
                    {fac.experience}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-blue-950/90 backdrop-blur-xs text-blue-200 rounded-md font-semibold text-xs">
                    {fac.department}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg font-serif group-hover:text-blue-800 transition">
                      {fac.name}
                    </h3>
                    <p className="text-sm text-blue-900 font-semibold mt-0.5">
                      {fac.designation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-2">
                    <p>
                      <strong className="text-slate-800 block text-xs uppercase tracking-wider">Qualifications:</strong>
                      <span className="font-mono text-slate-700 text-xs">{fac.qualification}</span>
                    </p>
                    <p>
                      <strong className="text-slate-800 block text-xs uppercase tracking-wider">Domain Specialization:</strong>
                      <span>{fac.specialization}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Achievement Citation */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-medium text-[11px] leading-snug">{fac.achievements}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-8 space-y-3">
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900 font-serif">No Faculty Members Found</h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No educators found matching "{searchTerm}". Try clearing your search keywords or switching department filter.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDept('All'); }}
              className="px-5 py-2 bg-blue-800 text-white rounded-lg text-sm font-semibold hover:bg-blue-900"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Teaching Philosophy & Faculty Standards */}
      <section className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-5">
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Institutional Quality Assurance
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
                Empowered Educators, Transformative Pedagogy
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                At ABC Public School, our recruitment strictly adheres to the National Council for Teacher Education (NCTE) norms and CBSE Affiliation Bye-Laws. Every educator undergoes systematic peer reviews, technology integration bootcamps, and board assessment workshops.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm font-medium text-slate-800">
                <div className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Mandatory UGC-NET / CTET</span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Annual CBSE CPD Certification</span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Experiential & STEM Training</span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Mental Health & Child Welfare</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
                alt="ABC School Faculty Collaborative Meeting"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
