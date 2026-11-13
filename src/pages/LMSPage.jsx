import React, { useState } from 'react';
import { 
  BookMarked, Download, Video, FileText, Search, 
  Plus, Eye, ExternalLink, Filter, CheckCircle 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';

export default function LMSPage() {
  const { subjects, classes } = useSchool();
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const initialResources = [
    {
      id: 'LMS-101',
      title: 'Class 10 Mathematics: Real Numbers & Polynomials Formula Handbook',
      subject: 'Mathematics',
      className: 'Class 10',
      type: 'PDF Notes',
      fileSize: '3.4 MB',
      author: 'Mrs. Sunita Raina (HOD)',
      downloads: 142,
      uploadDate: '2026-01-15'
    },
    {
      id: 'LMS-102',
      title: 'Physics Optics: Lens Formula & Ray Tracing Solved NCERT Numericals',
      subject: 'Science (Physics)',
      className: 'Class 10',
      type: 'PDF Notes',
      fileSize: '4.8 MB',
      author: 'Mr. Tariq Ahmad Lone',
      downloads: 189,
      uploadDate: '2026-01-20'
    },
    {
      id: 'LMS-103',
      title: 'CBSE Class 12 Electrostatics & Current Electricity Comprehensive Video Lecture',
      subject: 'Physics',
      className: 'Class 12 (Science)',
      type: 'Video Lecture',
      fileSize: '42 mins (DIKSHA / YouTube HD)',
      author: 'Dr. Farooq Ahmad Mir',
      downloads: 98,
      uploadDate: '2026-02-02'
    },
    {
      id: 'LMS-104',
      title: 'Formal Letter Writing & Reading Comprehension Model Answer Key',
      subject: 'General English',
      className: 'Class 10',
      type: 'Sample Question Paper',
      fileSize: '2.1 MB',
      author: 'Ms. Neha Gupta',
      downloads: 165,
      uploadDate: '2026-02-05'
    },
    {
      id: 'LMS-105',
      title: 'Class 12 Organic Chemistry: Reaction Mechanisms & Conversions Quick Chart',
      subject: 'Chemistry',
      className: 'Class 12 (Science)',
      type: 'PDF Notes',
      fileSize: '5.2 MB',
      author: 'Mr. Rajesh Koul',
      downloads: 210,
      uploadDate: '2026-01-28'
    }
  ];

  const [resources, setResources] = useState(initialResources);

  const [newResource, setNewResource] = useState({
    title: '',
    subject: 'Mathematics',
    className: 'Class 10',
    type: 'PDF Notes',
    author: 'Faculty Member'
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newResource.title) return;
    const item = {
      ...newResource,
      id: `LMS-${100 + resources.length + 1}`,
      fileSize: '2.8 MB',
      downloads: 0,
      uploadDate: new Date().toISOString().substring(0, 10)
    };
    setResources([item, ...resources]);
    setShowUploadModal(false);
  };

  const filtered = resources.filter(r => {
    const matchSubject = selectedSubject === 'All' || r.subject === selectedSubject;
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Digital Learning & Study Repository (LMS)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified study notes, chapter summaries, NCERT exemplar solutions and curated video lectures.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, topics, or faculty..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600">Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white text-slate-800"
          >
            <option value="All">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science (Physics)">Science (Physics)</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="General English">General English</option>
          </select>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {item.className} • {item.subject}
                </span>
                <Badge variant={item.type === 'Video Lecture' ? 'warning' : 'primary'}>
                  {item.type}
                </Badge>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Prepared by: {item.author}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{item.fileSize}</span>
              <button
                onClick={() => alert(`Downloading verified digital resource '${item.title}'...`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload Digital Learning Material"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleUpload} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Resource Title *</label>
              <input
                type="text"
                required
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                placeholder="e.g. Chapter 6 Triangles Solved Notes"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Subject</label>
                <select
                  value={newResource.subject}
                  onChange={(e) => setNewResource({ ...newResource, subject: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {subjects.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Class</label>
                <select
                  value={newResource.className}
                  onChange={(e) => setNewResource({ ...newResource, className: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Resource Type</label>
              <select
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                <option value="PDF Notes">PDF Notes & Handout</option>
                <option value="Video Lecture">Video Lecture Link</option>
                <option value="Sample Question Paper">Sample Question Paper</option>
                <option value="NCERT Exemplar Solutions">NCERT Exemplar Solutions</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Upload Resource
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
