import React from 'react';
import { Award, Trophy, Star, CheckCircle, ExternalLink } from 'lucide-react';
import { toppers } from '../../data/websiteData';

export default function AchievementsPage() {
  const awards = [
    { title: "CBSE Regional Academic Excellence Shield", issuedBy: "Central Board of Secondary Education", year: "2025–2026", desc: "Awarded for the highest aggregate distinction percentage across secondary and senior secondary cohorts." },
    { title: "J&K State Inter-School Athletics Championship", issuedBy: "Directorate of Youth Services & Sports", year: "2025", desc: "Overall champions trophy secured across 100m sprint, relay, long jump, and cricket championship." },
    { title: "National Science & Robotics Olympiad Rank 1", issuedBy: "Science Olympiad Foundation (SOF)", year: "2025", desc: "Gold medal and national top percentile secured by the Class 10 STEM delegation." },
    { title: "Valley Green Campus & Clean Water Citation", issuedBy: "State Pollution Control Board", year: "2024", desc: "Recognized as the premier eco-friendly zero-plastic educational institution in the district." }
  ];

  const alumni = [
    { name: "Dr. Danish Mushtaq", batch: "Batch of 2012", role: "Resident Cardiothoracic Surgeon, AIIMS New Delhi", note: "Gold Medalist, NEET-UG Regional Topper" },
    { name: "Irshad Ahmad Lone", batch: "Batch of 2014", role: "Senior Software Engineer, Google DeepMind (London)", note: "B.Tech Computer Science, IIT Bombay" },
    { name: "Saba Tariq", batch: "Batch of 2016", role: "Assistant Commissioner (IAS), Government of India", note: "Rank 42, UPSC Civil Services Examination" },
    { name: "Mehak Pandita", batch: "Batch of 2018", role: "Corporate Legal Counsel, Trilegal Advocates", note: "BA LLB (Hons), National Law School Bangalore (NLSIU)" }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Academic & Athletic Laurels
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Honors, Achievements & Alumni Distinction
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Celebrating our students' benchmark performances in CBSE Board Examinations, national STEM competitions, athletic arenas, and prestigious career journeys.
            </p>
          </div>
        </div>
      </section>

      {/* CBSE Board Toppers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Class 10 & 12 Board Broadsheet
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              CBSE Board Examination Merit Achievers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              100% of our Class 10 & 12 cohorts secured 1st division, with 88% surpassing the 90th percentile threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {toppers.map((top, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-7 shadow-xs text-center space-y-4 hover:border-blue-700 hover:shadow-lg transition duration-300">
                <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-blue-900 shadow-md">
                  <img src={top.image} alt={top.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg font-serif">{top.name}</h3>
                  <p className="text-sm text-blue-800 font-semibold">{top.exam}</p>
                  <p className="text-3xl font-black text-blue-950 font-mono mt-1.5">{top.score}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-sm text-slate-600 space-y-1">
                  <p className="font-medium text-slate-800">{top.stream}</p>
                  <p className="text-emerald-700 font-bold">{top.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Accolades */}
      <section id="awards" className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Accreditations & Honors
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Institutional Citations & Trophies
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((aw, idx) => (
              <div key={idx} className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs flex items-start gap-5 hover:shadow-md transition">
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 shrink-0">
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">{aw.year} • {aw.issuedBy}</span>
                  <h3 className="font-bold text-slate-900 text-lg font-serif">{aw.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">{aw.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Network */}
      <section id="alumni" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Legacy of Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Distinguished Alumni Placements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Our graduates are leaders across medicine, engineering, civil service, law, corporate finance, and research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {alumni.map((alum, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-bold rounded-md">
                  {alum.batch}
                </span>
                <h4 className="font-bold text-slate-900 text-base font-serif">{alum.name}</h4>
                <p className="text-sm text-blue-900 font-semibold">{alum.role}</p>
                <p className="text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100 italic">
                  {alum.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
