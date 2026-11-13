import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, GraduationCap, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { academicWings, facultyData } from '../../data/websiteData';

export default function AcademicsPage() {
  const [selectedWing, setSelectedWing] = useState('pre-primary');

  const seniorStreams = [
    {
      stream: "Science Stream (Medical & Non-Medical)",
      coreSubjects: "General English, Physics, Chemistry",
      electives: "Mathematics / Biology / Computer Science / Physical Education",
      careerPathways: "Engineering (JEE Advanced/Main), Medical (NEET-UG), Biotechnology, Data Science, Architecture."
    },
    {
      stream: "Commerce Stream",
      coreSubjects: "General English, Accountancy, Business Studies, Economics",
      electives: "Mathematics / Informatics Practices / Entrepreneurship / Physical Education",
      careerPathways: "Chartered Accountancy (CA), Corporate Finance, Management (IIM IPMAT), Economics, Banking."
    },
    {
      stream: "Humanities Stream",
      coreSubjects: "General English, Political Science, History, Economics",
      electives: "Psychology / Sociology / Urdu / Physical Education",
      careerPathways: "Civil Services (UPSC), Law (CLAT), International Relations, Journalism, Public Policy."
    }
  ];

  const activeWingObj = academicWings.find(w => w.id === selectedWing) || academicWings[0];

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Academic Excellence
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              CBSE Academic Curriculum & Pedagogy
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              A comprehensive curriculum balancing cognitive depth, scientific empiricism, and ethical values across all developmental stages.
            </p>
          </div>
        </div>
      </section>

      {/* Wings Interactive Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200 overflow-x-auto text-sm sm:text-base font-semibold">
          {academicWings.map((wing) => (
            <button
              key={wing.id}
              onClick={() => setSelectedWing(wing.id)}
              className={`px-5 py-3.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
                selectedWing === wing.id
                  ? 'border-blue-800 text-blue-900 font-bold bg-blue-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {wing.name.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Selected Wing Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs mt-6 space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs sm:text-sm font-bold font-mono text-amber-600 uppercase tracking-wider">{activeWingObj.subtitle}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif mt-1">{activeWingObj.name}</h2>
            </div>
            <span className="px-3.5 py-1.5 bg-slate-100 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold border border-slate-200 self-start sm:self-auto">
              {activeWingObj.curriculum}
            </span>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
            {activeWingObj.description}
          </p>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Distinct Pedagogical Features & Learning Milestones
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeWingObj.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-sm text-slate-600">
            <span>Academic Leadership: </span>
            <strong className="text-slate-900 font-semibold">{activeWingObj.headTeacher}</strong>
          </div>
        </div>
      </section>

      {/* Senior Secondary Specialized Streams */}
      <section id="senior-secondary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Class 11 & 12 Academic Branches
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Senior Secondary Specialized Streams
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Comprehensive subject choices preparing students for board exams and national competitive entrance examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seniorStreams.map((st, idx) => (
              <div key={idx} className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition duration-300">
                <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-md text-xs font-bold uppercase tracking-wider block w-fit">
                  {st.stream.split('(')[0]}
                </span>
                <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-serif">{st.stream}</h3>
                
                <div className="space-y-3 text-sm text-slate-700">
                  <p><strong className="text-slate-900">Core Subjects:</strong> {st.coreSubjects}</p>
                  <p><strong className="text-slate-900">Electives:</strong> {st.electives}</p>
                  <p className="pt-3 text-slate-600 border-t border-slate-100 leading-relaxed"><strong className="text-slate-900">Career Trajectories:</strong> {st.careerPathways}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distinguished Faculty Directory */}
      <section id="faculty" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Teaching Faculty
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                Distinguished Educators & Department Heads
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
                Highly certified postgraduate faculty with decades of specialized CBSE board examination mentoring and holistic student guidance.
              </p>
            </div>
            <Link
              to="/faculty"
              className="text-sm font-bold uppercase tracking-wider text-blue-800 hover:text-blue-950 inline-flex items-center gap-1.5 group shrink-0"
            >
              <span>View Full 84+ Faculty Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyData.slice(0, 8).map((fac) => (
              <div key={fac.id} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:border-blue-700 hover:shadow-lg transition duration-300 flex flex-col justify-between group">
                <div>
                  <div className="h-48 overflow-hidden bg-slate-100 relative">
                    <img 
                      src={fac.image} 
                      alt={fac.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-semibold rounded uppercase tracking-wider">
                      {fac.department.split('&')[0].trim()}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-amber-400 text-slate-950 text-[11px] font-bold font-mono rounded">
                      {fac.experience}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-base font-serif group-hover:text-blue-800 transition">{fac.name}</h4>
                    <p className="text-xs text-blue-800 font-semibold">{fac.designation}</p>
                    <p className="text-xs text-slate-500 pt-1 leading-snug">{fac.qualification}</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-600 line-clamp-1">
                  <span className="font-semibold text-slate-700">Specialty:</span> {fac.specialization}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded-lg transition shadow-xs"
            >
              <span>Explore All Faculty, Qualifications & Departments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
