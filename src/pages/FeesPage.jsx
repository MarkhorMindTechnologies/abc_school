import React, { useState } from 'react';
import { 
  CreditCard, Search, CheckCircle, Printer, Download, 
  Send, AlertCircle, FileText, Plus, ArrowUpRight 
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ReceiptModal from '../components/common/ReceiptModal';
import { useSchool } from '../context/SchoolContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function FeesPage() {
  const { 
    feeTransactions, 
    feeStructures, 
    students, 
    recordFeePayment, 
    schoolInfo 
  } = useSchool();

  const [activeTab, setActiveTab] = useState('transactions');
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Fee collection form state
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [paymentAmount, setPaymentAmount] = useState(5200);
  const [paymentMode, setPaymentMode] = useState('UPI (Google Pay / PhonePe)');
  const [transactionRef, setTransactionRef] = useState('UPI-26021299881');
  const [feeMonth, setFeeMonth] = useState('February 2026');
  const [discount, setDiscount] = useState(0);

  const handleStudentSelect = (e) => {
    const sId = e.target.value;
    setSelectedStudentId(sId);
    const st = students.find(s => s.id === sId);
    if (st && st.pendingFeeAmount > 0) {
      setPaymentAmount(st.pendingFeeAmount);
    } else {
      setPaymentAmount(5200);
    }
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId);
    if (!st) return;

    const newTxn = recordFeePayment({
      studentId: st.id,
      studentName: st.fullName,
      admissionNo: st.admissionNo,
      className: `${st.className}-${st.section}`,
      date: new Date().toISOString().substring(0, 10),
      feeMonth,
      heads: [
        { name: 'Monthly Tuition Fee', amount: paymentAmount - 1200 > 0 ? paymentAmount - 1200 : paymentAmount },
        { name: 'Transport & Campus Logistics', amount: 1200 }
      ],
      discountAmount: Number(discount) || 0,
      totalAmount: Number(paymentAmount),
      paidAmount: Number(paymentAmount),
      paymentMode,
      transactionRef,
      collectedBy: 'Mrs. Rehana Qadir'
    });

    setShowCollectModal(false);
    // Show generated official receipt immediately
    setActiveReceipt(newTxn);
  };

  const outstandingStudents = students.filter(s => (s.pendingFeeAmount || 0) > 0);
  const totalOutstanding = outstandingStudents.reduce((sum, s) => sum + s.pendingFeeAmount, 0);

  const columns = [
    {
      header: 'Receipt No',
      accessor: 'receiptNo',
      className: 'w-28',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-800">{row.receiptNo}</span>
    },
    {
      header: 'Student & Class',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.studentName}</p>
          <p className="text-[11px] text-slate-500">{row.className} • Adm: {row.admissionNo}</p>
        </div>
      )
    },
    {
      header: 'Payment Date',
      render: (row) => <span className="text-xs text-slate-700">{formatDate(row.date)}</span>
    },
    {
      header: 'Amount Paid',
      render: (row) => (
        <span className="text-xs font-bold text-emerald-800">
          {formatCurrency(row.paidAmount)}
        </span>
      )
    },
    {
      header: 'Payment Mode',
      render: (row) => (
        <div className="text-xs">
          <p className="font-medium text-slate-800">{row.paymentMode}</p>
          {row.transactionRef && <p className="text-[10px] text-slate-500 font-mono">Ref: {row.transactionRef}</p>}
        </div>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <button
          onClick={() => setActiveReceipt(row)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition"
          title="Print Official Receipt"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Receipt</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Fee Collection & Revenue Desk</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Student fee collection, instant GST/official receipt generation, dues follow-up and fee structures.
          </p>
        </div>

        <button
          onClick={() => setShowCollectModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Collect Student Fee</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'transactions'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Collection Receipts Ledger ({feeTransactions.length})
        </button>
        <button
          onClick={() => setActiveTab('dues')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'dues'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Outstanding Dues Register ({outstandingStudents.length})
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'structure'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Approved Fee Structures (2026–2027)
        </button>
      </div>

      {/* Tab 1: Transactions Ledger */}
      {activeTab === 'transactions' && (
        <DataTable
          columns={columns}
          data={feeTransactions}
          searchPlaceholder="Search student name, receipt number, admission number..."
          searchKeys={['studentName', 'receiptNo', 'admissionNo', 'className', 'paymentMode']}
          exportFilename="abc_school_fee_collection_ledger_2026"
        />
      )}

      {/* Tab 2: Outstanding Dues */}
      {activeTab === 'dues' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-amber-900 text-sm">Total Outstanding Fee Dues: {formatCurrency(totalOutstanding)}</p>
              <p className="text-amber-700 mt-0.5">{outstandingStudents.length} students currently have pending tuition or transport installments.</p>
            </div>
            <button
              onClick={() => alert(`Simulated SMS Reminders sent to all ${outstandingStudents.length} parent mobile contacts via J&K Bank / School SMS gateway!`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 text-white font-semibold rounded hover:bg-amber-800 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Fee SMS Reminders</span>
            </button>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Admission No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Parent Contact</th>
                  <th className="p-3">Pending Dues</th>
                  <th className="p-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {outstandingStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-slate-800">{st.admissionNo}</td>
                    <td className="p-3 font-bold text-slate-900">{st.fullName}</td>
                    <td className="p-3">{st.className}-{st.section}</td>
                    <td className="p-3 font-mono text-slate-600">{st.fatherPhone}</td>
                    <td className="p-3 font-bold text-rose-700">{formatCurrency(st.pendingFeeAmount)}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedStudentId(st.id);
                          setPaymentAmount(st.pendingFeeAmount);
                          setShowCollectModal(true);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-700 text-white rounded hover:bg-emerald-800"
                      >
                        Clear Dues
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Approved Fee Structures */}
      {activeTab === 'structure' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Class Bracket</th>
                <th className="p-3">Monthly Tuition</th>
                <th className="p-3">Annual Charges</th>
                <th className="p-3">Science Lab</th>
                <th className="p-3">Computer Lab</th>
                <th className="p-3">Exam Fee (Annual)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {feeStructures.map((fs) => (
                <tr key={fs.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{fs.classRange}</td>
                  <td className="p-3 font-semibold text-emerald-800">{formatCurrency(fs.tuitionMonthly)}/mo</td>
                  <td className="p-3 font-medium">{formatCurrency(fs.annualCharges)}</td>
                  <td className="p-3">{formatCurrency(fs.labFee)}</td>
                  <td className="p-3">{formatCurrency(fs.computerFee)}</td>
                  <td className="p-3 font-medium">{formatCurrency(fs.examFeeAnnual)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Collect Fee Modal */}
      {showCollectModal && (
        <Modal
          isOpen={showCollectModal}
          onClose={() => setShowCollectModal(false)}
          title="Record Student Fee Payment"
          subtitle="Generate GST compliant official receipt and update ledger"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Select Student *</label>
              <select
                value={selectedStudentId}
                onChange={handleStudentSelect}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                {students.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.fullName} ({st.className}-{st.section}) — Adm: {st.admissionNo} {st.pendingFeeAmount > 0 ? `[Dues: ₹${st.pendingFeeAmount}]` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Fee Month / Installment</label>
              <select
                value={feeMonth}
                onChange={(e) => setFeeMonth(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                <option value="February 2026">February 2026</option>
                <option value="March 2026">March 2026</option>
                <option value="Term 1 Full Installment">Term 1 Full Installment</option>
                <option value="Annual Charges 2026–27">Annual Charges 2026–27</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Payment Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Discount / Scholarship (₹)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                <option value="UPI (Google Pay / PhonePe)">UPI (Google Pay / PhonePe)</option>
                <option value="Net Banking (J&K Bank)">Net Banking (J&K Bank)</option>
                <option value="Cash Counter">Cash Counter</option>
                <option value="Cheque / Draft">Cheque / Demand Draft</option>
                <option value="Debit / Credit Card (POS)">Debit / Credit Card (POS)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Transaction Ref / Cheque No</label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="e.g. UPI-99882211"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowCollectModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Confirm Payment & Generate Receipt
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Official Receipt Modal */}
      {activeReceipt && (
        <ReceiptModal
          isOpen={!!activeReceipt}
          onClose={() => setActiveReceipt(null)}
          transaction={activeReceipt}
        />
      )}
    </div>
  );
}
