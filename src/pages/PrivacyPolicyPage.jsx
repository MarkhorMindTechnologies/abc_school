import React from 'react';
import { Shield, Lock, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSchool } from '../context/SchoolContext';

export default function PrivacyPolicyPage() {
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
        <span className="font-mono text-xs text-slate-500">Policy Ref: ABC/POL/2026-DPDP</span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif tracking-tight">Institutional Privacy & Data Protection Policy</h1>
        <p className="text-slate-600 font-medium text-sm sm:text-base">{schoolInfo?.name || 'ABC Public School'} — Affiliated to CBSE, New Delhi</p>
        <p className="text-xs text-slate-400">Effective Date: 01 April 2026 | Last Reviewed: February 2026</p>
      </div>

      <div className="space-y-6 pt-6 border-t border-slate-100">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">1. Institutional Commitment & Governance</h2>
          <p>
            ABC Public Higher Secondary School ("Institution", "We", "Our") is committed to upholding the highest standards of confidentiality, integrity, and security regarding the personal and sensitive data of our students, faculty, parents, and administrative personnel. This policy complies with the Digital Personal Data Protection Act (DPDPA), 2023, CBSE affiliation bye-laws, and prevailing Union Territory of Jammu & Kashmir educational data regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">2. Nature of Data Collected</h2>
          <p>
            In order to deliver school administrative and educational services through the ABC School Digital Platform, we process:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm sm:text-base">
            <li><strong>Student Identifiers:</strong> Legal full name, date of birth, gender, blood group, admission number, Aadhaar number (masked), previous academic records, and enrollment category.</li>
            <li><strong>Guardian Particulars:</strong> Parents' names, verified mobile contacts, occupations, residential addresses, and official email communications.</li>
            <li><strong>Academic & Attendance Records:</strong> Daily attendance records, periodic marksheet evaluations, CBSE pre-board assessments, and conduct registers.</li>
            <li><strong>Financial Transactions:</strong> Fee collection receipts, transaction reference hashes, concession vouchers, and payment mode histories (credit card data is processed directly via bank payment gateways and never stored on local servers).</li>
            <li><strong>Logistics Data:</strong> School bus route stops, boarding times, emergency driver contacts, and hostel room assignments.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">3. Lawful Purpose of Processing</h2>
          <p>
            Collected information is utilized strictly for academic administration, CBSE board exam candidate registrations, attendance verification, parent-teacher communications, transport fleet coordination, and emergency medical contact. At no point is personal or demographic data monetized, sold, or shared with third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">4. Technical Security Safeguards</h2>
          <p>
            The ABC School digital platform employs Transport Layer Security (TLS 1.3 / SSL 256-bit encryption), role-based access control (RBAC), multi-layered firewalls, and immutable system audit trails. Access to student confidential records is restricted strictly to authorized teachers and designated institutional administrators.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">5. Parental Rights & Data Correction</h2>
          <p>
            Parents and legal guardians hold the statutory right to review, update, or request rectification of their ward's academic and contact records through the Parent Portal or by submitting a written application to the Office of the Principal at <span className="font-mono text-blue-700 font-semibold">{schoolInfo?.email || 'admissions@abcschool.edu.in'}</span>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">6. Institutional Grievance Officer</h2>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 space-y-1">
            <p className="font-bold text-slate-900 text-sm sm:text-base">Dr. Farooq Ahmad Mir (Principal / Data Protection Officer)</p>
            <p>ABC Public Higher Secondary School, Airport Road, Humhama, Srinagar (J&K) – 190021</p>
            <p>Direct Grievance Contact: +91 194 2435678 | Email: dpo@abcschool.edu.in</p>
          </div>
        </section>
      </div>
    </div>
  );
}
