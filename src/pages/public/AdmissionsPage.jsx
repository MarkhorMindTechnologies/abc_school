import React from 'react';
import { 
  CheckCircle, ArrowRight, Download, FileText, 
  HelpCircle, Calendar, ShieldCheck, Phone 
} from 'lucide-react';
import { feeStructureData, schoolData } from '../../data/websiteData';
import { useOutletContext } from 'react-router-dom';

export default function AdmissionsPage() {
  const { openAdmissionModal } = useOutletContext();

  const ageMatrix = [
    { class: "Nursery", ageRequired: "3+ Years as on 31st March 2026", dobRange: "Born between 01 April 2022 and 31 March 2023" },
    { class: "LKG", ageRequired: "4+ Years as on 31st March 2026", dobRange: "Born between 01 April 2021 and 31 March 2022" },
    { class: "UKG", ageRequired: "5+ Years as on 31st March 2026", dobRange: "Born between 01 April 2020 and 31 March 2021" },
    { class: "Class 1", ageRequired: "6+ Years (As per NEP 2020 Guidelines)", dobRange: "Born between 01 April 2019 and 31 March 2020" },
    { class: "Classes 2 to 9", ageRequired: "Transfer Certificate & Prior Class Marksheet", dobRange: "Subject to seat availability & entrance evaluation" },
    { class: "Class 11", ageRequired: "CBSE Class 10 Board Percentage / Criteria", dobRange: "Science: 80%+, Commerce: 70%+, Humanities: 60%+" }
  ];

  const steps = [
    { step: "01", title: "Online Registration", desc: "Submit the preliminary online enquiry form with candidate particulars and academic background." },
    { step: "02", title: "Document Review", desc: "Submit birth certificate, Aadhaar card, past marksheets, and transfer certificate for verification." },
    { step: "03", title: "Diagnostic Interaction", desc: "Informal student-teacher interaction for foundational wings; baseline diagnostic test for Classes 6 to 11." },
    { step: "04", title: "Offer of Admission", desc: "Successful candidates receive an official offer letter and fee installment schedule." },
    { step: "05", title: "Orientation & Induction", desc: "Welcome briefing with Principal, class incharge, uniform issuing, and school bus route allocation." }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Academic Session 2026–2027
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Admissions & Enrollment Guidelines
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Welcome to the admission gateway for ABC Public Higher Secondary School. Admissions are granted on merit, age suitability, and verified academic credentials.
            </p>
          </div>

          <div className="shrink-0 space-y-3">
            <button
              onClick={openAdmissionModal}
              className="w-full px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold uppercase tracking-wider rounded-lg text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Online Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert('Downloading official ABC Public School Information Prospectus 2026–2027 (PDF)...')}
              className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm uppercase tracking-wider rounded-lg border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Download Prospectus</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Step-by-Step Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Admission Procedure & Onboarding
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((st) => (
              <div key={st.step} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition">
                <span className="text-3xl font-black text-blue-900 font-mono block">{st.step}</span>
                <h3 className="font-bold text-slate-900 text-base font-serif">{st.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Eligibility Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Eligibility Criteria
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Age Criteria for Session 2026–2027
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Formulated in accordance with the National Education Policy (NEP 2020) and CBSE Foundational Stage directives.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <tr>
                    <th className="p-4 sm:p-5 w-48">Class Level</th>
                    <th className="p-4 sm:p-5">Prescribed Minimum Age</th>
                    <th className="p-4 sm:p-5">Applicable Date of Birth Bracket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                  {ageMatrix.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-4 sm:p-5 font-bold text-blue-950">{item.class}</td>
                      <td className="p-4 sm:p-5 font-semibold text-slate-800">{item.ageRequired}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.dobRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Approved Fee Structure Table */}
      <section id="fee-structure" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Transparent Financial Structure
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Approved Fee Schedule (Academic Session 2026–2027)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Approved by the School Managing Committee (SMC). No arbitrary capitation fee, donation, or hidden charges.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <tr>
                    <th className="p-4 sm:p-5">Class Bracket</th>
                    <th className="p-4 sm:p-5">Tuition Fee (Monthly)</th>
                    <th className="p-4 sm:p-5">Annual Charges</th>
                    <th className="p-4 sm:p-5">Science Lab</th>
                    <th className="p-4 sm:p-5">Computer Lab</th>
                    <th className="p-4 sm:p-5">Exam Fee (Annual)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                  {feeStructureData.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{fee.classGroup}</td>
                      <td className="p-4 sm:p-5 font-bold text-emerald-800">₹{fee.tuitionFee.toLocaleString('en-IN')}/mo</td>
                      <td className="p-4 sm:p-5">₹{fee.annualCharges.toLocaleString('en-IN')}</td>
                      <td className="p-4 sm:p-5">{fee.labCharges > 0 ? `₹${fee.labCharges.toLocaleString('en-IN')}` : 'Nil'}</td>
                      <td className="p-4 sm:p-5">₹{fee.compFee.toLocaleString('en-IN')}</td>
                      <td className="p-4 sm:p-5 font-medium">₹{fee.examCharges.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 space-y-2">
            <p><strong>Payment Instructions:</strong> Fees may be paid monthly or quarterly via Net Banking, UPI, or Bank Demand Draft in favor of <em>ABC Public Higher Secondary School</em>.</p>
            <p><strong>Merit Scholarships:</strong> 25% to 50% tuition fee waiver available for candidates securing top regional ranks in CBSE Class 10 examinations and recognized national sports champions.</p>
          </div>
        </div>
      </section>

      {/* Dedicated Admissions Contact Helpline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-bold text-blue-950 text-base sm:text-lg">Need Guidance Regarding Admissions or Stream Selection?</h4>
            <p className="text-sm sm:text-base text-blue-900">Our Admissions Desk is open Monday through Saturday from 09:00 AM to 03:30 PM.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <a 
              href={`tel:${schoolData.helpline}`}
              className="px-5 py-2.5 bg-blue-800 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-blue-900 text-sm transition shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call {schoolData.helpline}</span>
            </a>
            <button
              onClick={openAdmissionModal}
              className="px-5 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 text-sm transition shadow-xs cursor-pointer"
            >
              Submit Online Form
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
