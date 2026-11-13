import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle, XCircle, Clock, UserCheck, 
  Calendar, FileText, Plus, Users, Award 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';
import { formatDate } from '../utils/formatters';

export default function HRManagementPage() {
  const { staff } = useSchool();
  const [activeTab, setActiveTab] = useState('leaves');

  const initialLeaves = [
    { id: 'LV-101', staffName: 'Mr. Rajesh Koul', designation: 'PGT Chemistry', type: 'Casual Leave', fromDate: '2026-02-19', toDate: '2026-02-20', days: 2, reason: 'Family social obligation', status: 'Pending Approval' },
    { id: 'LV-102', staffName: 'Ms. Neha Gupta', designation: 'TGT English', type: 'Medical Leave', fromDate: '2026-02-14', toDate: '2026-02-15', days: 2, reason: 'Fever and medical consultation', status: 'Approved' },
    { id: 'LV-103', staffName: 'Mr. Fayaz Ahmad', designation: 'Computer Teacher', type: 'Earned Leave', fromDate: '2026-02-05', toDate: '2026-02-08', days: 4, reason: 'Higher education research viva', status: 'Approved' }
  ];

  const [leaves, setLeaves] = useState(initialLeaves);

  const initialRecruitments = [
    { id: 'REC-01', candidateName: 'Dr. Sameer Ahmad Bhat', position: 'Senior PGT Chemistry', qualification: 'Ph.D. Chemistry (KU)', experience: '8 Years', interviewScore: '92/100', status: 'Shortlisted' },
    { id: 'REC-02', candidateName: 'Ms. Rubiya Akhtar', position: 'Primary Mathematics Teacher', qualification: 'M.Sc. Maths, B.Ed.', experience: '4 Years', interviewScore: '88/100', status: 'Offer Extended' },
    { id: 'REC-03', candidateName: 'Mr. Zahid Hussain', position: 'Physical Education Instructor', qualification: 'M.P.Ed.', experience: '6 Years', interviewScore: '84/100', status: 'Under Interview' }
  ];

  const [recruitments, setRecruitments] = useState(initialRecruitments);

  const handleLeaveAction = (id, newStatus) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Human Resource Management & Leave Portal</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Faculty leave requests, performance evaluations, teacher recruitment pipelines and HR records.
          </p>
        </div>

        <button
          onClick={() => alert('New faculty job opening published to school recruitment portal.')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Post Faculty Vacancy</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('leaves')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'leaves'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Staff Leave Approvals ({leaves.filter(l => l.status === 'Pending Approval').length} Pending)
        </button>
        <button
          onClick={() => setActiveTab('recruitment')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'recruitment'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Recruitment & Candidate Pipeline ({recruitments.length})
        </button>
      </div>

      {/* Tab 1: Leaves */}
      {activeTab === 'leaves' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Staff Member</th>
                <th className="p-3">Leave Type</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Approval Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {leaves.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-slate-800">{l.id}</td>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{l.staffName}</p>
                    <p className="text-[11px] text-slate-500">{l.designation}</p>
                  </td>
                  <td className="p-3 font-medium">{l.type}</td>
                  <td className="p-3">
                    <p>{formatDate(l.fromDate)} to {formatDate(l.toDate)}</p>
                    <p className="text-[10px] text-slate-500 font-bold">({l.days} Working Days)</p>
                  </td>
                  <td className="p-3 text-slate-600 max-w-xs">{l.reason}</td>
                  <td className="p-3">
                    <Badge variant={l.status === 'Approved' ? 'success' : l.status === 'Rejected' ? 'danger' : 'warning'}>
                      {l.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    {l.status === 'Pending Approval' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleLeaveAction(l.id, 'Approved')}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-700 text-white rounded hover:bg-emerald-800"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleLeaveAction(l.id, 'Rejected')}
                          className="px-2.5 py-1 text-xs font-semibold bg-rose-700 text-white rounded hover:bg-rose-800"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Recruitment Pipeline */}
      {activeTab === 'recruitment' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">App ID</th>
                <th className="p-3">Candidate Name</th>
                <th className="p-3">Applied Position</th>
                <th className="p-3">Qualifications</th>
                <th className="p-3">Interview Rating</th>
                <th className="p-3 text-right">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {recruitments.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-slate-800">{rec.id}</td>
                  <td className="p-3 font-bold text-slate-900">{rec.candidateName}</td>
                  <td className="p-3 font-semibold text-blue-900">{rec.position}</td>
                  <td className="p-3 text-slate-600">{rec.qualification} ({rec.experience})</td>
                  <td className="p-3 font-bold text-emerald-800">{rec.interviewScore}</td>
                  <td className="p-3 text-right">
                    <Badge variant={rec.status === 'Offer Extended' ? 'success' : 'primary'}>
                      {rec.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
