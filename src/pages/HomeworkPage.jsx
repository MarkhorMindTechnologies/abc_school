import React, { useState } from 'react';
import { 
  FileCheck, Plus, Calendar, Clock, CheckCircle, 
  Users, BookOpen, AlertCircle, Eye, MessageSquare 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';
import { formatDate } from '../utils/formatters';

export default function HomeworkPage() {
  const { homework, addHomework, classes, subjects, staff } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedHw, setSelectedHw] = useState(null);

  // Form State
  const [hwForm, setHwForm] = useState({
    title: '',
    subject: 'Mathematics',
    className: 'Class 10',
    section: 'A',
    teacherName: 'Mrs. Sunita Raina',
    dueDate: '2026-02-18',
    instructions: ''
  });

  const handleCreateHw = (e) => {
    e.preventDefault();
    if (!hwForm.title || !hwForm.instructions) return;
    addHomework(hwForm);
    setShowAddModal(false);
    setHwForm({
      title: '',
      subject: 'Mathematics',
      className: 'Class 10',
      section: 'A',
      teacherName: 'Mrs. Sunita Raina',
      dueDate: '2026-02-18',
      instructions: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Homework & Assignment Central</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Assign curriculum tasks, track student submissions, and deliver faculty remarks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Homework</span>
        </button>
      </div>

      {/* Homework Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homework.map((hw) => (
          <div key={hw.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                  {hw.subject} • {hw.className}-{hw.section}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1.5">{hw.title}</h3>
              </div>
              <Badge variant={hw.status === 'Active' ? 'primary' : 'success'}>
                {hw.status}
              </Badge>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
              {hw.instructions}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span>Due: <strong className="text-slate-800">{formatDate(hw.dueDate)}</strong></span>
              </span>
              <span className="font-semibold text-slate-800">
                {hw.submissionsCount} / {hw.totalStudents} Submissions
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">By: {hw.teacherName}</span>
              <button
                onClick={() => setSelectedHw(hw)}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
              >
                <span>View Details & Submissions</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Assignment Modal */}
      {selectedHw && (
        <Modal
          isOpen={!!selectedHw}
          onClose={() => setSelectedHw(null)}
          title={selectedHw.title}
          subtitle={`${selectedHw.subject} — ${selectedHw.className}-${selectedHw.section}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-1">
              <p><span className="text-slate-500">Assigned By:</span> <span className="font-bold text-slate-900">{selectedHw.teacherName}</span></p>
              <p><span className="text-slate-500">Assigned Date:</span> {formatDate(selectedHw.assignedDate)}</p>
              <p><span className="text-slate-500">Submission Due:</span> <span className="font-bold text-rose-700">{formatDate(selectedHw.dueDate)}</span></p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                Teacher Instructions
              </h4>
              <p className="p-3 bg-white border border-slate-200 rounded text-slate-700 leading-relaxed">
                {selectedHw.instructions}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                Recent Submissions Received ({selectedHw.submissionsCount})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded">
                <div className="p-2.5 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <p className="font-bold text-slate-900">Aarav Sharma (Class 10-A)</p>
                    <p className="text-[10px] text-slate-500">Submitted on 2026-02-13 • 2 pages handwritten PDF</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                    Evaluated (10/10)
                  </span>
                </div>
                <div className="p-2.5 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">Zoya Fatima Khan (Class 10-A)</p>
                    <p className="text-[10px] text-slate-500">Submitted on 2026-02-13 • Ray diagram scans</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                    Evaluated (10/10)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedHw(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Homework Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Create & Assign New Homework"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateHw} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Homework Topic / Title *</label>
              <input
                type="text"
                required
                value={hwForm.title}
                onChange={(e) => setHwForm({ ...hwForm, title: e.target.value })}
                placeholder="e.g. Chapter 4 Quadratic Formula Exercises"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Subject</label>
                <select
                  value={hwForm.subject}
                  onChange={(e) => setHwForm({ ...hwForm, subject: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {subjects.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Class</label>
                <select
                  value={hwForm.className}
                  onChange={(e) => setHwForm({ ...hwForm, className: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Section</label>
                <select
                  value={hwForm.section}
                  onChange={(e) => setHwForm({ ...hwForm, section: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={hwForm.dueDate}
                  onChange={(e) => setHwForm({ ...hwForm, dueDate: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Instructions & Page References *</label>
              <textarea
                required
                rows={3}
                value={hwForm.instructions}
                onChange={(e) => setHwForm({ ...hwForm, instructions: e.target.value })}
                placeholder="Specific NCERT questions, formatting rules, diagrams to include..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
