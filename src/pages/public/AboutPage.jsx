import React from 'react';
import { Award, Compass, ShieldCheck, CheckCircle, Users, BookOpen, Clock } from 'lucide-react';
import { schoolData, leadership } from '../../data/websiteData';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const smcMembers = [
    { name: "Prof. Mohammad Shafi Mir", designation: "Chairman", role: "Trust Nominee / Former Dean of Education" },
    { name: "Dr. Farooq Ahmad Mir", designation: "Member Secretary", role: "Principal, ABC Public School" },
    { name: "Mrs. Sunita Raina", designation: "Teacher Representative", role: "HOD Mathematics, ABC Public School" },
    { name: "Mr. Tariq Ahmad Lone", designation: "Teacher Representative", role: "Senior Faculty, Science Wing" },
    { name: "Dr. Tariq Ahmad Khan", designation: "Parent Representative", role: "Physician, GMC Srinagar" },
    { name: "Mrs. Pooja Verma", designation: "Parent Representative", role: "Chartered Accountant" },
    { name: "Dr. Nuzhat Ara", designation: "Educationist Nominee", role: "Associate Professor, University of Kashmir" },
    { name: "Mr. Kuldeep Bhat", designation: "Legal Advisor", role: "Advocate, J&K High Court" }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Page Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 relative overflow-hidden shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Institutional Heritage Since 1988
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              About ABC Public School
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Founded on the belief that high-quality education transforms societies, ABC Public School has evolved over nearly four decades into a premier CBSE institution dedicated to scholastic rigor, scientific inquiry, and ethical leadership.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
            <Award className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

      {/* History & Legacy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              A Tradition of Academic Distinction in Jammu & Kashmir
            </h2>
            <p>
              Established in 1988 with an inaugural cohort of 60 students, ABC Public Higher Secondary School was established by visionary educators who recognized the imperative for modern, values-based schooling aligned with national standards in the Kashmir valley.
            </p>
            <p>
              Today, situated on an expansive 8.5-acre green campus along Airport Road, Humhama, the school serves over 1,400 students from Nursery through Class 12. As a permanently affiliated institution under the Central Board of Secondary Education (CBSE Affiliation No. 730045), the school maintains an impeccable record of 100% board examination distinction and regional athletic championships.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="font-bold text-slate-900 block text-sm">Affiliation Body:</span>
                <span className="text-slate-600 text-sm mt-0.5 block">CBSE New Delhi (All-India)</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="font-bold text-slate-900 block text-sm">Campus Area:</span>
                <span className="text-slate-600 text-sm mt-0.5 block">8.5 Acres Purpose-Built</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80"
              alt="ABC Public School Campus Building"
              className="w-full h-96 sm:h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values */}
      <section id="vision" className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Ethos & Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Vision, Mission & Core Commitments
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-serif">Our Vision</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To be a beacon of intellectual brilliance and moral courage, nurturing students who are intellectually confident, culturally rooted, globally adaptable, and driven by an enduring commitment to public good.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-serif">Our Mission</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To deliver rigorous, experiential CBSE education that stimulates critical inquiry, technological competence, athletic discipline, and artistic sensitivity in a secure, inclusive, and modern learning ecosystem.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-serif">Core Values</h3>
              <ul className="text-sm sm:text-base text-slate-600 space-y-2.5 list-disc pl-5">
                <li><strong>Academic Integrity:</strong> Uncompromising pursuit of empirical knowledge.</li>
                <li><strong>Empathy & Inclusivity:</strong> Deep respect for diverse cultures and viewpoints.</li>
                <li><strong>Civic Responsibility:</strong> Passionate stewardship of our community and natural environment.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman's Full Statement */}
      <section id="chairman" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <span className="inline-block px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            Leadership Perspective
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif">Message from the Chairman</h2>
          <div className="text-base sm:text-lg text-slate-700 space-y-4 leading-relaxed italic font-serif">
            <p>"{leadership.chairman.message}"</p>
            <p>
              "Our classrooms are centers of spirited dialogue rather than passive recitation. We believe that true education occurs when a student learns how to think critically, verify facts, question assumptions, and formulate ethical solutions. As we prepare our students for premier universities across India and the globe, we instill in them humility, reverence for heritage, and an insatiable zest for discovery."
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100">
            <p className="font-bold text-slate-900 text-base sm:text-lg font-serif">{leadership.chairman.name}</p>
            <p className="text-sm sm:text-base text-blue-800 font-semibold">{leadership.chairman.designation}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{leadership.chairman.credentials}</p>
          </div>
        </div>
      </section>

      {/* Principal's Full Statement */}
      <section id="principal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            Academic Oversight
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif">Message from the Principal</h2>
          <div className="text-base sm:text-lg text-slate-700 space-y-4 leading-relaxed italic font-serif">
            <p>"{leadership.principal.message}"</p>
            <p>
              "In our laboratories, classrooms, and sports fields, we place special emphasis on experiential learning as envisaged by the National Education Policy 2020. Our teachers undergo regular continuous professional development (CPD) to ensure cutting-edge pedagogical tools are deployed in every period. I invite parents to partner with us as co-architects in building the bright future of our youth."
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100">
            <p className="font-bold text-slate-900 text-base sm:text-lg font-serif">{leadership.principal.name}</p>
            <p className="text-sm sm:text-base text-blue-800 font-semibold">{leadership.principal.designation}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{leadership.principal.credentials}</p>
          </div>
        </div>
      </section>

      {/* School Managing Committee SMC */}
      <section id="governance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Institutional Governance
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              School Managing Committee (SMC)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Formed in strict accordance with Rule 20 of the CBSE Affiliation Bye-Laws 2018.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <tr>
                    <th className="p-4 sm:p-5">Member Name</th>
                    <th className="p-4 sm:p-5">Designation on Committee</th>
                    <th className="p-4 sm:p-5">Institutional Role & Background</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                  {smcMembers.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{m.name}</td>
                      <td className="p-4 sm:p-5 font-semibold text-blue-900">{m.designation}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{m.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
