import React from 'react';
import { Award, Compass, Heart, Users, Sparkles, CheckCircle } from 'lucide-react';

export default function StudentLifePage() {
  const clubs = [
    { name: "Kalam STEM & Robotics Society", desc: "Design, 3D printing, Arduino microcontrollers, and competitive robotics hackathons.", mentor: "Mr. Fayaz Ahmad" },
    { name: "Parliamentary Debating & MUN Forum", desc: "Oxford-style debate training, public discourse, resolution drafting, and national MUN delegations.", mentor: "Ms. Neha Gupta" },
    { name: "Ramanujan Mathematics Guild", desc: "Mathematical puzzles, Vedic math acceleration, Olympiad coaching, and inter-school quiz preparation.", mentor: "Mrs. Sunita Raina" },
    { name: "Dal Conservation & Eco-Club", desc: "Tree plantation drives, environmental impact surveys, plastic-free campus audits, and wetland preservation.", mentor: "Mrs. Shazia Parveen" },
    { name: "Tagore Visual Arts & Calligraphy Guild", desc: "Oil painting, Kashmiri traditional motifs, wood carving aesthetics, graphic arts, and annual exhibitions.", mentor: "Mr. Mohammad Amin" },
    { name: "Campus Symphony & Choral Troupe", desc: "Vocal training in Hindustani classical, Sufiyana music, acoustic guitar, violin, and keyboard compositions.", mentor: "Mrs. Neelam Pandita" }
  ];

  const houses = [
    { name: "Chinar House", color: "bg-amber-600", motto: "Strength in Heritage & Perseverance" },
    { name: "Zabarwan House", color: "bg-blue-800", motto: "Steadfast Integrity & High Aspirations" },
    { name: "Jhelum House", color: "bg-emerald-700", motto: "Continuous Learning & Grace in Action" },
    { name: "Gulmarg House", color: "bg-slate-800", motto: "Courage, Innovation & Victory" }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Co-Curricular Immersion
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Student Life, Athletics & Beyond
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Discover a vibrant campus culture where leadership, creative expression, athletic rigor, and environmental responsibility thrive side by side with academic pursuits.
            </p>
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section id="clubs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Student Societies
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Active Hobby Guilds & Specialized Societies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Students dedicate Friday and Saturday afternoons to hands-on enrichment under faculty mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {clubs.map((club, idx) => (
              <div key={idx} className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4 hover:border-blue-700 hover:shadow-lg transition duration-300">
                <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </span>
                <h3 className="font-bold text-slate-900 text-lg font-serif">{club.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{club.desc}</p>
                <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
                  <span>Faculty Mentor: </span>
                  <strong className="text-slate-800 font-semibold">{club.mentor}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inter-House System */}
      <section id="houses" className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              House Spirit & Comradeship
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              The Four Houses of ABC Public School
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5">
              Every student is assigned to one of four historic houses, fostering peer mentorship, healthy athletic rivalry, and organizational leadership.
            </p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {houses.map((h, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs text-center p-7 sm:p-8 space-y-3.5 hover:shadow-md transition">
                <div className={`w-14 h-14 rounded-full ${h.color} mx-auto flex items-center justify-center text-white font-bold text-base shadow-xs`}>
                  {h.name.charAt(0)}
                </div>
                <h3 className="font-bold text-slate-900 text-lg font-serif">{h.name}</h3>
                <p className="text-sm text-slate-600 italic">"{h.motto}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Athletics & Physical Education */}
      <section id="athletics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Physical Fitness
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Comprehensive Sports Disciplines & Athletic Training
            </h2>
            <p>
              We view athletics not as a recreation, but as a critical laboratory of character, resilience, team coordination, and physical health.
            </p>
            <div className="grid grid-cols-2 gap-3.5 pt-2 text-sm font-medium text-slate-800">
              <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Cricket Turf Pitch</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>FIFA-Standard Football Turf</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Outdoor Basketball Arena</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Indoor Badminton Hall</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
              alt="ABC School Sports Grounds"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
