import React from 'react';
import { FileText, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSchool } from '../context/SchoolContext';

export default function TermsConditionsPage() {
  const navigate = useNavigate();
  const { schoolInfo } = useSchool();

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-6 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-sm sm:text-base text-slate-700 leading-relaxed">
      <div className="flex items-center justify-between pb-5 border-b border-slate-200">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="font-mono text-xs text-slate-500">Doc Ref: ABC/TOS/2026-V1</span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif tracking-tight">Terms & Conditions of Institutional Service</h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">{schoolInfo?.name || 'ABC Public School'} — Academic Session 2026–2027</p>
        <p className="text-xs text-slate-400">Jurisdiction: Srinagar, Jammu & Kashmir (India)</p>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-100">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">1. General Institutional Acceptance</h2>
          <p>
            By enrolling a student or accessing the ABC Public School digital services, students, parents, guardians, and faculty agree to be bound by these Terms and Conditions, the CBSE Code of Regulations, and the institutional code of discipline.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">2. Academic Attendance Requirements</h2>
          <p>
            In strict compliance with CBSE Board Examination Bye-Laws, every enrolled candidate must maintain a minimum cumulative attendance of <strong>75%</strong> across the academic session to be eligible for board examinations and term promotional consideration. Medical absences must be supported by a registered medical practitioner's certificate submitted within 48 hours.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">3. Fee Schedule, Payment & Receipts</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm sm:text-base">
            <li>Tuition, laboratory, and transport installments are payable on or before the 10th of each calendar month.</li>
            <li>Digital fee receipts issued through the portal with unique receipt numbers and digital timestamps constitute legal evidence of institutional dues clearance.</li>
            <li>In the event of delayed payments exceeding 30 calendar days, standard late administrative surcharges may be applied as approved by the School Managing Committee (SMC).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">4. Code of Digital Conduct</h2>
          <p>
            Users are strictly prohibited from sharing login credentials, attempting unauthorized access to school databases, or tampering with institutional data. Any cyber misuse or academic dishonesty will trigger immediate disciplinary action and potential reporting under the Information Technology Act, 2000.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">5. Legal Jurisdiction</h2>
          <p>
            Any dispute arising out of or relating to admissions, fee structures, or institutional operations shall be subject to the exclusive jurisdiction of the competent civil courts located in Srinagar, Jammu & Kashmir, India.
          </p>
        </section>
      </div>
    </div>
  );
}
