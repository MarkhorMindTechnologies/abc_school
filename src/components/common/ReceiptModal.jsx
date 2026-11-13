import React from 'react';
import Modal from './Modal';
import { Printer, CheckCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useSchool } from '../../context/SchoolContext';

export default function ReceiptModal({ isOpen, onClose, transaction }) {
  const { schoolInfo } = useSchool();

  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Official Fee Receipt" maxWidth="max-w-xl">
      <div className="space-y-6" id="printable-fee-receipt">
        {/* Receipt Container */}
        <div className="border border-slate-300 rounded-lg p-6 bg-white relative print:border-none print:p-0">
          {/* Header */}
          <div className="text-center border-b border-slate-200 pb-4 mb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{schoolInfo.name}</h2>
            <p className="text-xs text-slate-600 mt-0.5">{schoolInfo.affiliation}</p>
            <p className="text-xs text-slate-500">{schoolInfo.address} | Phone: {schoolInfo.phone}</p>
            <div className="inline-block mt-2 px-3 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Student Fee Payment Receipt
            </div>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-4 pb-4 border-b border-slate-100">
            <div>
              <p className="text-slate-500">Receipt Number:</p>
              <p className="font-mono font-semibold text-slate-900 text-sm">{transaction.receiptNo}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Payment Date:</p>
              <p className="font-semibold text-slate-900">{formatDate(transaction.date)}</p>
            </div>
            <div>
              <p className="text-slate-500">Student Name:</p>
              <p className="font-bold text-slate-900">{transaction.studentName}</p>
              <p className="text-slate-600">Adm No: {transaction.admissionNo || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Class & Section:</p>
              <p className="font-bold text-slate-900">{transaction.className}</p>
              <p className="text-slate-600">Month: {transaction.feeMonth || 'Term Installment'}</p>
            </div>
          </div>

          {/* Fee Breakdown Table */}
          <div className="mb-4">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="py-2 text-left">Description / Particulars</th>
                  <th className="py-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {transaction.heads && transaction.heads.map((h, i) => (
                  <tr key={i}>
                    <td className="py-2">{h.name}</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(h.amount)}</td>
                  </tr>
                ))}
                {(!transaction.heads || transaction.heads.length === 0) && (
                  <tr>
                    <td className="py-2">Tuition and Academic Services Fee</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(transaction.paidAmount)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="bg-slate-50 rounded-md p-3 space-y-1.5 text-xs border border-slate-200">
            {transaction.discountAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Fee Concession / Discount:</span>
                <span>-{formatCurrency(transaction.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-bold text-sm pt-1 border-t border-slate-200">
              <span>Total Amount Paid:</span>
              <span className="text-emerald-700">{formatCurrency(transaction.paidAmount)}</span>
            </div>
            {transaction.balanceDue > 0 && (
              <div className="flex justify-between text-rose-700 font-medium">
                <span>Remaining Balance Due:</span>
                <span>{formatCurrency(transaction.balanceDue)}</span>
              </div>
            )}
          </div>

          {/* Payment Details */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between items-center">
            <div>
              <span className="text-slate-500">Payment Mode: </span>
              <span className="font-semibold text-slate-800">{transaction.paymentMode || 'Cash'}</span>
              {transaction.transactionRef && (
                <span className="ml-2 text-slate-500">Ref: {transaction.transactionRef}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Payment Verified</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-8 pt-6 border-t border-dashed border-slate-300 flex justify-between text-xs text-slate-500">
            <div>
              <p className="font-medium text-slate-800">{transaction.collectedBy || 'Accounts Cashier'}</p>
              <p>Cashier / Receiving Officer</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-8 border border-slate-200 bg-slate-50 rounded mb-1 mx-auto flex items-center justify-center text-[10px] text-slate-400 italic">
                School Seal
              </div>
              <p className="font-medium text-slate-800">{schoolInfo.principalName}</p>
              <p>Principal, ABC Public School</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-2 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
