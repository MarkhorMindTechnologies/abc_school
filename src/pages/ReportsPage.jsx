import React, { useState } from 'react';
import { 
  BarChart3, Download, Printer, Users, CreditCard, 
  CheckSquare, Award, DollarSign, Calendar 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { exportToCSV, formatCurrency } from '../utils/formatters';

export default function ReportsPage() {
  const { students, staff, feeTransactions, marks, classes, schoolInfo } = useSchool();
  const [selectedReport, setSelectedReport] = useState('student');

  const handleExportCSV = (data, name) => {
    exportToCSV(data, name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Reports & Executive Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready academic, financial, attendance and demographic exports for CBSE and state regulatory bodies.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print Formal Report</span>
        </button>
      </div>

      {/* Report Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {[
          { id: 'student', title: 'Student Demographics', icon: Users },
          { id: 'fees', title: 'Fee Revenue Ledger', icon: CreditCard },
          { id: 'exams', title: 'CBSE Exam Broadsheet', icon: Award },
          { id: 'payroll', title: 'Faculty Payroll Archive', icon: DollarSign }
        ].map((rep) => {
          const Icon = rep.icon;
          const isActive = selectedReport === rep.id;
          return (
            <button
              key={rep.id}
              onClick={() => setSelectedReport(rep.id)}
              className={`p-3.5 rounded-lg border text-left flex items-center gap-2.5 transition ${
                isActive 
                  ? 'bg-blue-900 text-white border-blue-900 shadow-xs' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-slate-500'}`} />
              <span className="font-bold truncate">{rep.title}</span>
            </button>
          );
        })}
      </div>

      {/* Report Detail Box */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-4">
        
        {/* Report 1: Student Demographics */}
        {selectedReport === 'student' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Student Enrollment & Class Strength Broadsheet</h3>
                <p className="text-xs text-slate-500">Academic Session 2026–2027 • Total Enrolled: {students.length} demo records</p>
              </div>
              <button
                onClick={() => handleExportCSV(students, 'student_enrollment_2026')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs font-semibold hover:bg-blue-100"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5">Admission No</th>
                  <th className="p-2.5">Student Name</th>
                  <th className="p-2.5">Class & Section</th>
                  <th className="p-2.5">Gender</th>
                  <th className="p-2.5">Parent Contact</th>
                  <th className="p-2.5 text-right">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {students.map(s => (
                  <tr key={s.id}>
                    <td className="p-2.5 font-mono">{s.admissionNo}</td>
                    <td className="p-2.5 font-bold">{s.fullName}</td>
                    <td className="p-2.5">{s.className}-{s.section}</td>
                    <td className="p-2.5">{s.gender}</td>
                    <td className="p-2.5 font-mono">{s.fatherPhone}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-800">{s.attendanceRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report 2: Fee Revenue */}
        {selectedReport === 'fees' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Fee Collection & Institutional Receipts Audit</h3>
                <p className="text-xs text-slate-500">All payment modes and bank references verified</p>
              </div>
              <button
                onClick={() => handleExportCSV(feeTransactions, 'fee_receipts_audit_2026')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs font-semibold hover:bg-blue-100"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5">Receipt #</th>
                  <th className="p-2.5">Student</th>
                  <th className="p-2.5">Month</th>
                  <th className="p-2.5">Payment Mode</th>
                  <th className="p-2.5 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {feeTransactions.map(t => (
                  <tr key={t.id}>
                    <td className="p-2.5 font-mono font-bold">{t.receiptNo}</td>
                    <td className="p-2.5 font-bold">{t.studentName}</td>
                    <td className="p-2.5">{t.feeMonth}</td>
                    <td className="p-2.5">{t.paymentMode}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-800">{formatCurrency(t.paidAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report 3: Exams */}
        {selectedReport === 'exams' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">CBSE Pre-Board 2026 Examination Broadsheet</h3>
                <p className="text-xs text-slate-500">Student rankings, grand totals, and CBSE 9-point scale</p>
              </div>
              <button
                onClick={() => handleExportCSV(marks, 'cbse_exam_results_2026')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs font-semibold hover:bg-blue-100"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5">Rank</th>
                  <th className="p-2.5">Student Name</th>
                  <th className="p-2.5">Class</th>
                  <th className="p-2.5">Marks Obtained</th>
                  <th className="p-2.5">Percentage</th>
                  <th className="p-2.5 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {marks.map(m => (
                  <tr key={m.studentId}>
                    <td className="p-2.5 font-bold text-blue-900">#{m.classRank}</td>
                    <td className="p-2.5 font-bold">{m.studentName}</td>
                    <td className="p-2.5">{m.className}</td>
                    <td className="p-2.5 font-bold">{m.totalObtained} / {m.maxTotal}</td>
                    <td className="p-2.5 font-bold text-emerald-700">{m.percentage}%</td>
                    <td className="p-2.5 text-right font-black text-blue-900">{m.overallGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report 4: Payroll */}
        {selectedReport === 'payroll' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Monthly Faculty & Staff Payroll Register</h3>
                <p className="text-xs text-slate-500">Gross salary, allowances and institutional deductions</p>
              </div>
              <button
                onClick={() => handleExportCSV(staff, 'staff_payroll_register_2026')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs font-semibold hover:bg-blue-100"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5">Code</th>
                  <th className="p-2.5">Staff Name</th>
                  <th className="p-2.5">Designation</th>
                  <th className="p-2.5">Department</th>
                  <th className="p-2.5 text-right">Monthly Remuneration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {staff.map(st => (
                  <tr key={st.id}>
                    <td className="p-2.5 font-mono">{st.employeeCode}</td>
                    <td className="p-2.5 font-bold">{st.fullName}</td>
                    <td className="p-2.5">{st.designation}</td>
                    <td className="p-2.5">{st.department}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{formatCurrency(st.salaryMonthly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
