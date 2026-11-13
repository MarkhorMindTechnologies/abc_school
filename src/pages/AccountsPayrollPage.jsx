import React, { useState } from 'react';
import { 
  DollarSign, Plus, Printer, Download, CheckCircle, 
  ArrowUpRight, ArrowDownRight, CreditCard, FileText 
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function AccountsPayrollPage() {
  const { expenses, addExpense, staff, schoolInfo, feeTransactions } = useSchool();
  const [activeTab, setActiveTab] = useState('payroll');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  // New Expense form
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    category: 'Utilities',
    amount: 15000,
    paidTo: '',
    paymentMode: 'Net Banking'
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.paidTo) return;
    addExpense({
      ...expenseForm,
      approvedBy: 'Dr. Farooq Ahmad Mir'
    });
    setShowAddExpenseModal(false);
    setExpenseForm({
      title: '',
      category: 'Utilities',
      amount: 15000,
      paidTo: '',
      paymentMode: 'Net Banking'
    });
  };

  const totalFeeCollected = feeTransactions.reduce((acc, t) => acc + (t.paidAmount || 0), 0) + 1850000;
  const totalExpenses = expenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);
  const totalPayroll = staff.reduce((acc, st) => acc + (st.salaryMonthly || 0), 0);

  const expenseColumns = [
    {
      header: 'Voucher ID',
      accessor: 'id',
      className: 'w-24',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-800">{row.id}</span>
    },
    {
      header: 'Expense Description',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.title}</p>
          <p className="text-[11px] text-slate-500">Paid to: {row.paidTo} • By: {row.paymentMode}</p>
        </div>
      )
    },
    {
      header: 'Category',
      render: (row) => <Badge variant="neutral">{row.category}</Badge>
    },
    {
      header: 'Expense Date',
      render: (row) => <span className="text-xs text-slate-700">{formatDate(row.date)}</span>
    },
    {
      header: 'Amount',
      className: 'text-right',
      render: (row) => (
        <span className="font-bold text-rose-700 text-xs">
          -{formatCurrency(row.amount)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Accounts & Staff Payroll</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational expenditure ledger, vendor payments, and monthly staff salary disbursements.
          </p>
        </div>

        <button
          onClick={() => setShowAddExpenseModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Record Campus Expense</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Institutional Inflow</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(totalFeeCollected)}</p>
          <p className="text-[11px] text-slate-400 mt-1">Tuition, Transport & Development</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Monthly Faculty Payroll</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">{formatCurrency(totalPayroll)}</p>
          <p className="text-[11px] text-slate-400 mt-1">{staff.length} Active Staff Members</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Operating Expenditures</p>
          <p className="text-2xl font-bold text-rose-700 mt-1">{formatCurrency(totalExpenses)}</p>
          <p className="text-[11px] text-slate-400 mt-1">Fuel, Internet, Heating & Supplies</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('payroll')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'payroll'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Faculty & Staff Payroll ({staff.length})
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'expenses'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Institutional Expense Ledger ({expenses.length})
        </button>
      </div>

      {/* Tab 1: Staff Payroll */}
      {activeTab === 'payroll' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-800">
            <span>Salary Disbursement Register — February 2026</span>
            <span className="text-emerald-700">Bank Transfer via J&K Bank Corporate</span>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Emp Code</th>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Basic Pay</th>
                <th className="p-3">HRA / DA</th>
                <th className="p-3">PF / Tax</th>
                <th className="p-3 font-bold">Net Salary</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {staff.map((st) => {
                const basic = Math.round(st.salaryMonthly * 0.6);
                const allowances = Math.round(st.salaryMonthly * 0.4);
                const deductions = Math.round(st.salaryMonthly * 0.1);
                const net = basic + allowances - deductions;

                return (
                  <tr key={st.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-slate-800">{st.employeeCode}</td>
                    <td className="p-3 font-bold text-slate-900">{st.fullName}</td>
                    <td className="p-3 text-slate-600">{st.designation}</td>
                    <td className="p-3">{formatCurrency(basic)}</td>
                    <td className="p-3">{formatCurrency(allowances)}</td>
                    <td className="p-3 text-rose-700">-{formatCurrency(deductions)}</td>
                    <td className="p-3 font-bold text-emerald-800 text-sm">{formatCurrency(net)}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedPayslip({ staff: st, basic, allowances, deductions, net })}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Pay Slip</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Institutional Expense Ledger */}
      {activeTab === 'expenses' && (
        <DataTable
          columns={expenseColumns}
          data={expenses}
          searchPlaceholder="Search expense voucher, vendor, or category..."
          searchKeys={['title', 'paidTo', 'category', 'paymentMode']}
          exportFilename="abc_school_expense_ledger_2026"
        />
      )}

      {/* Pay Slip Modal */}
      {selectedPayslip && (
        <Modal
          isOpen={!!selectedPayslip}
          onClose={() => setSelectedPayslip(null)}
          title="Staff Monthly Salary Slip"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs">
            <div className="border border-slate-300 p-5 rounded-lg bg-white space-y-3 print:border-none print:p-0">
              <div className="text-center border-b border-slate-200 pb-3">
                <h3 className="font-bold text-slate-900 text-sm uppercase">{schoolInfo.name}</h3>
                <p className="text-[11px] text-slate-500">Salary Slip for February 2026</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                <p><span className="text-slate-500">Employee:</span> <span className="font-bold">{selectedPayslip.staff.fullName}</span></p>
                <p className="text-right"><span className="text-slate-500">Code:</span> <span className="font-mono">{selectedPayslip.staff.employeeCode}</span></p>
                <p><span className="text-slate-500">Designation:</span> {selectedPayslip.staff.designation}</p>
                <p className="text-right"><span className="text-slate-500">Department:</span> {selectedPayslip.staff.department}</p>
              </div>

              <div className="border-t border-b border-slate-200 py-2 space-y-1 text-slate-700">
                <div className="flex justify-between">
                  <span>Basic Pay (60%):</span>
                  <span>{formatCurrency(selectedPayslip.basic)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dearness & House Rent Allowance (DA/HRA):</span>
                  <span>{formatCurrency(selectedPayslip.allowances)}</span>
                </div>
                <div className="flex justify-between text-rose-700">
                  <span>Provident Fund (PF) & TDS:</span>
                  <span>-{formatCurrency(selectedPayslip.deductions)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200 text-sm">
                  <span>Net Take-Home Salary:</span>
                  <span className="text-emerald-800">{formatCurrency(selectedPayslip.net)}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 text-center italic">
                Direct Credit to J&K Bank Account • Ref: SAL-2026-02-B88
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Print Salary Voucher
              </button>
              <button
                type="button"
                onClick={() => setSelectedPayslip(null)}
                className="px-3.5 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <Modal
          isOpen={showAddExpenseModal}
          onClose={() => setShowAddExpenseModal(false)}
          title="Record Institutional Expenditure"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Expense Title / Purpose *</label>
              <input
                type="text"
                required
                value={expenseForm.title}
                onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                placeholder="e.g. Science Lab Consumables"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  <option value="Utilities">Utilities</option>
                  <option value="Transport">Transport & Fuel</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Maintenance">Maintenance & Heating</option>
                  <option value="Sports">Sports Equipment</option>
                  <option value="Stationery">Stationery & Print</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Paid To (Vendor / Entity) *</label>
              <input
                type="text"
                required
                value={expenseForm.paidTo}
                onChange={(e) => setExpenseForm({ ...expenseForm, paidTo: e.target.value })}
                placeholder="e.g. Valley Thermal Solutions"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Payment Mode</label>
              <select
                value={expenseForm.paymentMode}
                onChange={(e) => setExpenseForm({ ...expenseForm, paymentMode: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                <option value="Net Banking">Net Banking</option>
                <option value="Cheque">Cheque</option>
                <option value="Corporate Card">Corporate Card</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddExpenseModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Record Expenditure
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
