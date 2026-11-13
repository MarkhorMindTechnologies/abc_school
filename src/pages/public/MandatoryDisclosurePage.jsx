import React from 'react';
import { Award, FileText, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { schoolData, mandatoryDisclosureDocs } from '../../data/websiteData';

export default function MandatoryDisclosurePage() {
  const generalInfo = [
    { label: "Name of the School", value: schoolData.name },
    { label: "Affiliation No. (CBSE)", value: schoolData.affiliationNo },
    { label: "School Code", value: schoolData.schoolCode },
    { label: "Complete Campus Address", value: schoolData.address },
    { label: "Principal Name & Qualification", value: "Dr. Farooq Ahmad Mir, M.Sc. (Physics), M.Ed., Ph.D." },
    { label: "Official School Email", value: schoolData.infoEmail },
    { label: "Institutional Helpline Phone", value: `${schoolData.phone} / ${schoolData.helpline}` }
  ];

  const staffDetails = [
    { label: "Total Number of Teachers", value: "84" },
    { label: "Post Graduate Teachers (PGT)", value: "18" },
    { label: "Trained Graduate Teachers (TGT)", value: "32" },
    { label: "Primary Teachers (PRT)", value: "24" },
    { label: "Pre-Primary / Activity Instructors", value: "10" },
    { label: "Teacher to Section Ratio", value: "1 : 1.5 (Optimum compliance)" },
    { label: "Details of Special Educator", value: "Appointed (M.A. Clinical Psychology & Special Ed)" },
    { label: "Details of Counselor & Wellness Teacher", value: "Full-Time Appointed" }
  ];

  const infraDetails = [
    { label: "Total Campus Area (in Square Meters)", value: "34,398 Sq. Meters (8.5 Acres)" },
    { label: "Number and Size of Classrooms", value: "48 Classrooms (600 sq. ft. each)" },
    { label: "Laboratories (Physics, Chem, Bio, STEM, CS)", value: "6 Labs (1,200 sq. ft. each)" },
    { label: "Internet Facility & Bandwidth", value: "Yes, Dedicated 1 Gbps Leased Line" },
    { label: "Number of Girls Toilets", value: "28 Functional Units" },
    { label: "Number of Boys Toilets", value: "28 Functional Units" },
    { label: "YouTube Link of Campus Inspection", value: "Available on Institutional Video Archive" }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              CBSE Statutory Compliance (Appendix IX)
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Mandatory Public Disclosure
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Published in strict compliance with Central Board of Secondary Education (CBSE) Affiliation Bye-Laws 2018 for transparency and public verification.
            </p>
          </div>
        </div>
      </section>

      {/* Part A: General Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-serif border-b border-slate-200 pb-3">
            A. General Information
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                  {generalInfo.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-4 sm:p-5 w-1/3 font-semibold bg-slate-50 text-slate-700">{row.label}</td>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Part B: Documents and Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-serif border-b border-slate-200 pb-3">
            B. Statutory Documents & Information
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <tr>
                    <th className="p-4 sm:p-5 w-16">S.No</th>
                    <th className="p-4 sm:p-5">Statutory Document Particulars</th>
                    <th className="p-4 sm:p-5">Certificate / Reference No</th>
                    <th className="p-4 sm:p-5">Validity</th>
                    <th className="p-4 sm:p-5 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                  {mandatoryDisclosureDocs.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-4 sm:p-5 font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-4 sm:p-5 font-semibold text-slate-900">{doc.title}</td>
                      <td className="p-4 sm:p-5 font-mono text-slate-600">{doc.docRef}</td>
                      <td className="p-4 sm:p-5 text-slate-700">{doc.date}</td>
                      <td className="p-4 sm:p-5 text-right">
                        <button
                          onClick={() => alert(`Viewing certified copy of: ${doc.title}`)}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-800 hover:text-blue-950 hover:underline cursor-pointer"
                        >
                          <span>View Document</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Part C & D: Staff and Infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Staff Details */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-serif border-b border-slate-200 pb-3">
              C. Staff (Teaching)
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                    {staffDetails.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="p-4 sm:p-5 font-medium bg-slate-50 text-slate-700">{s.label}</td>
                        <td className="p-4 sm:p-5 font-bold text-slate-900">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Infrastructure Details */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-serif border-b border-slate-200 pb-3">
              D. School Infrastructure
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                    {infraDetails.map((inf, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="p-4 sm:p-5 font-medium bg-slate-50 text-slate-700">{inf.label}</td>
                        <td className="p-4 sm:p-5 font-bold text-slate-900">{inf.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
