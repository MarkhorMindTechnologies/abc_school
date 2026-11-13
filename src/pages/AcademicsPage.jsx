import React, { useState } from 'react';
import { 
  BookOpen, Plus, CheckCircle, Clock, BookMarked, 
  Layers, Users, Calendar, Award
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';

export default function AcademicsPage() {
  const { classes, subjects, schoolInfo } = useSchool();
  const [activeTab, setActiveTab] = useState('classes');
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);

  // Subject Form
  const [subjectData, setSubjectData] = useState({
    code: 'BIO102',
    name: '',
    category: 'Science',
    classes: 'Class 11 (Science), Class 12 (Science)'
  });

  // Syllabus Tracker data
  const syllabusList = [
    { subject: 'Mathematics', class: 'Class 10-A', teacher: 'Mrs. Sunita Raina', totalUnits: 15, completedUnits: 13, percentage: 86.6, status: 'On Track' },
    { subject: 'Integrated Science', class: 'Class 10-A', teacher: 'Mr. Tariq Ahmad Lone', totalUnits: 16, completedUnits: 14, percentage: 87.5, status: 'On Track' },
    { subject: 'General English', class: 'Class 10-A', teacher: 'Ms. Neha Gupta', totalUnits: 12, completedUnits: 11, percentage: 91.6, status: 'Completed Ahead' },
    { subject: 'Physics', class: 'Class 12 (Science)', teacher: 'Dr. Farooq Ahmad Mir', totalUnits: 14, completedUnits: 12, percentage: 85.7, status: 'On Track' },
    { subject: 'Chemistry', class: 'Class 12 (Science)', teacher: 'Mr. Rajesh Koul', totalUnits: 14, completedUnits: 11, percentage: 78.5, status: 'Revision Due' },
    { subject: 'Computer Science', class: 'Class 12 (Science)', teacher: 'Mr. Fayaz Ahmad', totalUnits: 10, completedUnits: 9, percentage: 90.0, status: 'On Track' }
  ];

  const handleCreateSubject = (e) => {
    e.preventDefault();
    if (!subjectData.name || !subjectData.code) return;
    alert(`Subject ${subjectData.name} (${subjectData.code}) successfully added to CBSE curriculum.`);
    setShowSubjectModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Academic Curriculum & Classes</h1>
            <Badge variant="navy">Session {schoolInfo.activeSession}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            CBSE curriculum framework, Class & Section allocation, Subject codes, and Syllabus tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubjectModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'classes'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Classes & Sections ({classes.length})
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'subjects'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Subject Catalog ({subjects.length})
        </button>
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'syllabus'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Curriculum & Syllabus Completion
        </button>
      </div>

      {/* Tab 1: Classes & Sections Grid */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                  <p className="text-[11px] text-blue-700 font-medium">{c.level} Wing</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-semibold border border-slate-200">
                  {c.sections.length} Sections
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                <p>
                  <span className="font-medium text-slate-700">Class Incharge:</span> {c.teacher}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-700">Sections:</span>
                  <div className="flex gap-1">
                    {c.sections.map(sec => (
                      <span key={sec} className="w-5 h-5 rounded bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Subjects Catalog */}
      {activeTab === 'subjects' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Subject Code</th>
                <th className="p-3">Subject Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Applicable Classes</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {subjects.map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-blue-900">{sub.code}</td>
                  <td className="p-3 font-semibold text-slate-900">{sub.name}</td>
                  <td className="p-3">
                    <Badge variant={sub.category === 'Core' ? 'primary' : sub.category === 'Science' ? 'success' : 'neutral'}>
                      {sub.category}
                    </Badge>
                  </td>
                  <td className="p-3 text-slate-600">
                    {sub.classes ? sub.classes.join(', ') : 'All Wings'}
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-emerald-700 font-medium">CBSE Approved</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Syllabus Completion */}
      {activeTab === 'syllabus' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">CBSE Annual Syllabus Progress (Term 1 & 2)</h3>
            <p className="text-xs text-slate-500">Track syllabus chapters covered against academic calendar milestones</p>
          </div>

          <div className="space-y-4">
            {syllabusList.map((item, idx) => (
              <div key={idx} className="p-4 rounded-md border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{item.subject}</span>
                    <span className="ml-2 font-semibold text-blue-800">({item.class})</span>
                    <span className="text-slate-500 block sm:inline sm:ml-2">• Faculty: {item.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{item.completedUnits}/{item.totalUnits} Units</span>
                    <Badge variant={item.percentage >= 85 ? 'success' : 'warning'}>{item.status}</Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      item.percentage >= 90 ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Target for Mid-February: 85% completed</span>
                  <span className="font-bold text-slate-800">{item.percentage}% Complete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showSubjectModal && (
        <Modal
          isOpen={showSubjectModal}
          onClose={() => setShowSubjectModal(false)}
          title="Add New Subject to Curriculum"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateSubject} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Subject Code *</label>
              <input
                type="text"
                required
                value={subjectData.code}
                onChange={(e) => setSubjectData({ ...subjectData, code: e.target.value })}
                placeholder="e.g. CHE102"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Subject Description *</label>
              <input
                type="text"
                required
                value={subjectData.name}
                onChange={(e) => setSubjectData({ ...subjectData, name: e.target.value })}
                placeholder="e.g. Applied Chemistry"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Category</label>
              <select
                value={subjectData.category}
                onChange={(e) => setSubjectData({ ...subjectData, category: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                <option value="Core">Core</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Humanities">Humanities</option>
                <option value="Language">Language</option>
                <option value="Elective">Elective</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowSubjectModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Add Subject
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
