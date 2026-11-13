import React, { useState } from 'react';
import { 
  UserCheck, CreditCard, Award, Calendar, CheckCircle, 
  FileCheck, Clock, MessageSquare, Send, Printer, Plus, AlertCircle 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ReportCardModal from '../components/common/ReportCardModal';
import ReceiptModal from '../components/common/ReceiptModal';
import { useSchool } from '../context/SchoolContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function ParentPortalPage() {
  const { students, marks, feeTransactions, recordFeePayment, schoolInfo } = useSchool();
  const [selectedChildId, setSelectedChildId] = useState(students[0]?.id || 'STU-001');
  const [showPayModal, setShowPayModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showTeacherMessageModal, setShowTeacherMessageModal] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  // Active child
  const child = students.find(s => s.id === selectedChildId) || students[0];
  const childMarks = marks.find(m => m.studentId === child?.id);
  const childFeeTxns = feeTransactions.filter(t => t.studentId === child?.id);

  // Leave Form
  const [leaveData, setLeaveData] = useState({
    startDate: '2026-02-23',
    endDate: '2026-02-24',
    reason: 'Medical Leave - Viral flu with physician prescription'
  });

  const handleOnlinePay = (e) => {
    e.preventDefault();
    const txn = recordFeePayment({
      studentId: child.id,
      studentName: child.fullName,
      admissionNo: child.admissionNo,
      className: `${child.className}-${child.section}`,
      date: new Date().toISOString().substring(0, 10),
      feeMonth: 'March 2026',
      heads: [
        { name: 'Monthly Tuition Fee', amount: 5200 },
        { name: 'Transport Maintenance', amount: 1200 }
      ],
      discountAmount: 0,
      totalAmount: 6400,
      paidAmount: 6400,
      paymentMode: 'Net Banking (J&K Bank Gateway)',
      transactionRef: `JKB-PG-${Date.now().toString().slice(-6)}`,
      collectedBy: 'Online Parent Gateway'
    });
    setShowPayModal(false);
    setGeneratedReceipt(txn);
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    alert(`Leave application for ${child.fullName} submitted to Class Teacher (Mrs. Sunita Raina) for approval.`);
    setShowLeaveModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Parent & Guardian Digital Portal</h1>
            <Badge variant="navy">Family Access</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time academic monitoring, fee payments, report cards, and communication for your enrolled children.
          </p>
        </div>

        {/* Child Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600">Active Child:</span>
          <select
            value={selectedChildId}
            onChange={(e) => setSelectedChildId(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold border border-blue-600 rounded-md bg-blue-50 text-blue-950 focus:outline-hidden"
          >
            {students.slice(0, 4).map(st => (
              <option key={st.id} value={st.id}>
                {st.fullName} ({st.className}-{st.section})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Child Summary Grid */}
      {child && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Student Profile</p>
            <p className="text-lg font-bold text-slate-900 mt-1">{child.fullName}</p>
            <p className="text-xs text-slate-500 font-mono">Adm: {child.admissionNo} • Roll: {child.rollNo || '1001'}</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Attendance Rate</p>
            <p className="text-lg font-bold text-emerald-700 mt-1">{child.attendanceRate}% Present</p>
            <p className="text-xs text-slate-500">Above CBSE 75% minimum quota</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Fee Account Status</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-bold text-slate-900">
                {child.pendingFeeAmount > 0 ? formatCurrency(child.pendingFeeAmount) : 'Fully Cleared'}
              </span>
              <Badge variant={child.pendingFeeAmount > 0 ? 'danger' : 'success'}>
                {child.feeStatus}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">No overdue fines applicable</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Latest Exam Result</p>
            <p className="text-lg font-bold text-blue-900 mt-1">
              {childMarks ? `${childMarks.percentage}% (Grade ${childMarks.overallGrade})` : 'Grade A1'}
            </p>
            <p className="text-xs text-slate-500">CBSE Pre-Board Examination</p>
          </div>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowPayModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay Term Fee Online</span>
        </button>

        <button
          onClick={() => setReportModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition"
        >
          <Award className="w-4 h-4" />
          <span>View Progress Report Card</span>
        </button>

        <button
          onClick={() => setShowLeaveModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition"
        >
          <Calendar className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>

        <button
          onClick={() => setShowTeacherMessageModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Message Class Teacher</span>
        </button>
      </div>

      {/* Academic Highlights & Recent Fee Receipts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Child Fee Payment History */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Recent Official Fee Payment Receipts</h3>
          <div className="divide-y divide-slate-100">
            {childFeeTxns.length > 0 ? (
              childFeeTxns.map((t) => (
                <div key={t.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{t.receiptNo}</p>
                    <p className="text-[11px] text-slate-500">{t.feeMonth} • {formatDate(t.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-emerald-800">{formatCurrency(t.paidAmount)}</span>
                    <button
                      onClick={() => setGeneratedReceipt(t)}
                      className="p-1 rounded text-blue-700 hover:bg-blue-50"
                      title="Download / Print Receipt"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4">No recent online transactions recorded for this student.</p>
            )}
          </div>
        </div>

        {/* Today's Timetable for Child */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Today's Class Schedule ({child?.className})</h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Period 1 (09:00 - 09:45 AM)</p>
                <p className="text-slate-600">Mathematics • Mrs. Sunita Raina</p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Room 204</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Period 2 (09:45 - 10:30 AM)</p>
                <p className="text-slate-600">Science (Physics) • Mr. Tariq Ahmad Lone</p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Science Lab A</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Period 3 (10:30 - 11:15 AM)</p>
                <p className="text-slate-600">General English • Ms. Neha Gupta</p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Room 204</span>
            </div>
          </div>
        </div>
      </div>

      {/* Online Payment Modal */}
      {showPayModal && (
        <Modal
          isOpen={showPayModal}
          onClose={() => setShowPayModal(false)}
          title={`Pay School Dues for ${child.fullName}`}
          subtitle="Instant Simulated Payment Gateway (UPI / Net Banking)"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleOnlinePay} className="space-y-3 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-slate-800 space-y-1">
              <p><span className="text-slate-500">Student:</span> <strong className="text-slate-900">{child.fullName}</strong> ({child.className})</p>
              <p><span className="text-slate-500">Admission No:</span> <strong className="font-mono">{child.admissionNo}</strong></p>
              <p className="text-base font-bold text-blue-950 pt-1">Total Due: ₹6,400</p>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Select Payment Gateway</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs">
                <option>UPI (Google Pay / PhonePe / Paytm)</option>
                <option>J&K Bank Net Banking (Instant Receipt)</option>
                <option>State Bank of India (SBI)</option>
                <option>HDFC Bank Net Banking</option>
                <option>Debit / Credit Card (RuPay / Visa)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Pay ₹6,400 & Generate Receipt
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <Modal
          isOpen={showLeaveModal}
          onClose={() => setShowLeaveModal(false)}
          title="Apply for Student Leave"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleApplyLeave} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={leaveData.startDate}
                  onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={leaveData.endDate}
                  onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Reason for Absence</label>
              <textarea
                rows={3}
                required
                value={leaveData.reason}
                onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                placeholder="State the reason clearly (Medical / Family emergency)..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowLeaveModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Submit Application
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Message Teacher Modal */}
      {showTeacherMessageModal && (
        <Modal
          isOpen={showTeacherMessageModal}
          onClose={() => setShowTeacherMessageModal(false)}
          title="Message Class Teacher"
          maxWidth="max-w-md"
        >
          <div className="space-y-3 text-xs">
            <p className="text-slate-600">Sending direct message to <strong className="text-slate-900">Mrs. Sunita Raina</strong> (Class Incharge 10-A)</p>
            <textarea
              rows={4}
              placeholder="Ask regarding academic progress, homework clarification, or upcoming exams..."
              className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
            />
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => setShowTeacherMessageModal(false)} className="px-3 py-1.5 border border-slate-300 rounded">Cancel</button>
              <button 
                onClick={() => {
                  alert('Message dispatched to Class Teacher portal.');
                  setShowTeacherMessageModal(false);
                }} 
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded"
              >
                Send Message
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Report Card Modal */}
      {reportModalOpen && (
        <ReportCardModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          student={child}
          marksRecord={childMarks || marks[0]}
        />
      )}

      {/* Receipt Modal */}
      {generatedReceipt && (
        <ReceiptModal
          isOpen={!!generatedReceipt}
          onClose={() => setGeneratedReceipt(null)}
          transaction={generatedReceipt}
        />
      )}
    </div>
  );
}
