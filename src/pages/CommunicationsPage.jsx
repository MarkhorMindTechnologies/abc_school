import React, { useState } from 'react';
import { 
  Bell, Plus, Send, Mail, MessageSquare, CheckCircle, 
  Trash2, Pin, Calendar, Users, Filter, AlertCircle 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';
import { formatDate } from '../utils/formatters';

export default function CommunicationsPage() {
  const { notices, addNotice, deleteNotice } = useSchool();
  const [activeTab, setActiveTab] = useState('notices');
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // New Notice Form
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'Circular',
    priority: 'Normal',
    targetAudience: 'All Parents & Students',
    content: '',
    publishedBy: 'Office of the Principal',
    isPinned: false
  });

  const broadcastLogs = [
    { id: 'SMS-8841', type: 'SMS Gateway', title: 'PTM Schedule Notification', recipients: '1,420 Parents', status: 'Delivered (100%)', timestamp: '2026-02-08 10:00 AM' },
    { id: 'EML-2210', type: 'Email Broadcast', title: 'CBSE Pre-Board Routine Circular', recipients: '420 Senior Sec Students', status: 'Delivered (99.4%)', timestamp: '2026-02-10 09:30 AM' },
    { id: 'SMS-8842', type: 'SMS Gateway', title: 'Winter Vacation School Reopening Update', recipients: '1,420 Parents & 84 Staff', status: 'Delivered (100%)', timestamp: '2026-02-01 08:00 AM' }
  ];

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;
    addNotice(noticeForm);
    setShowAddNoticeModal(false);
    setNoticeForm({
      title: '',
      category: 'Circular',
      priority: 'Normal',
      targetAudience: 'All Parents & Students',
      content: '',
      publishedBy: 'Office of the Principal',
      isPinned: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Communications & Notice Board</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official administrative circulars, SMS/Email broadcasts, and direct parent-teacher messaging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send SMS Broadcast</span>
          </button>
          <button
            onClick={() => setShowAddNoticeModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Notice</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'notices'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Official Circulars & Notices ({notices.length})
        </button>
        <button
          onClick={() => setActiveTab('broadcasts')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'broadcasts'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          SMS & Email Gateway Broadcasts
        </button>
      </div>

      {/* Tab 1: Notices List */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          {notices.map((n) => (
            <div key={n.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                      {n.category}
                    </span>
                    {n.isPinned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <Pin className="w-3 h-3" />
                        <span>Pinned</span>
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">Target: <strong className="text-slate-700">{n.targetAudience}</strong></span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={n.priority === 'High' ? 'danger' : 'neutral'}>
                    {n.priority} Priority
                  </Badge>
                  <button
                    onClick={() => deleteNotice(n.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-700 hover:bg-slate-100"
                    title="Archive Notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded border border-slate-100">
                {n.content}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-medium text-slate-700">Issued by: {n.publishedBy}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date: {formatDate(n.publishedDate)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Broadcasts */}
      {activeTab === 'broadcasts' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Broadcast Ref</th>
                <th className="p-3">Channel</th>
                <th className="p-3">Notification Subject</th>
                <th className="p-3">Target Recipients</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {broadcastLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-slate-800">{log.id}</td>
                  <td className="p-3 font-medium text-blue-800">{log.type}</td>
                  <td className="p-3 font-bold text-slate-900">{log.title}</td>
                  <td className="p-3 text-slate-600">{log.recipients}</td>
                  <td className="p-3 text-slate-500">{log.timestamp}</td>
                  <td className="p-3 text-right">
                    <Badge variant="success">{log.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Publish Notice Modal */}
      {showAddNoticeModal && (
        <Modal
          isOpen={showAddNoticeModal}
          onClose={() => setShowAddNoticeModal(false)}
          title="Publish Official School Notice"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Notice Headline *</label>
              <input
                type="text"
                required
                value={noticeForm.title}
                onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                placeholder="e.g. Annual Sports Meet 2026 Declaration"
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={noticeForm.category}
                  onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                >
                  <option value="Academic">Academic</option>
                  <option value="Circular">Circular</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Finance">Finance & Fees</option>
                  <option value="Examination">Examination</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Audience</label>
                <select
                  value={noticeForm.targetAudience}
                  onChange={(e) => setNoticeForm({ ...noticeForm, targetAudience: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                >
                  <option value="All Parents & Students">All Parents & Students</option>
                  <option value="Teaching Faculty Only">Teaching Faculty Only</option>
                  <option value="Classes 9 to 12th">Classes 9 to 12th</option>
                  <option value="Primary Wing Parents">Primary Wing Parents</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Detailed Notice Body *</label>
              <textarea
                required
                rows={4}
                value={noticeForm.content}
                onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                placeholder="Type the official message, instructions, timings or policy..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPinned"
                checked={noticeForm.isPinned}
                onChange={(e) => setNoticeForm({ ...noticeForm, isPinned: e.target.checked })}
                className="rounded border-slate-300 text-blue-700"
              />
              <label htmlFor="isPinned" className="text-slate-700 font-medium">Pin this circular to top of notice board</label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddNoticeModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Publish Notice
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <Modal
          isOpen={showBroadcastModal}
          onClose={() => setShowBroadcastModal(false)}
          title="Send SMS / Email Alert Broadcast"
          maxWidth="max-w-md"
        >
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Channel</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs">
                <option>SMS Gateway (Transactional)</option>
                <option>Email Broadcast (Institutional)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Recipients Group</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs">
                <option>All Enrolled Parents (1,420 Numbers)</option>
                <option>Class 10 Parents Only (96 Numbers)</option>
                <option>All Teaching Staff (84 Numbers)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">SMS Text (Max 160 chars)</label>
              <textarea rows={3} defaultValue="Dear Parent, ABC Public School reminds that the Parent-Teacher Meeting is scheduled for Saturday, 21 Feb 2026. Principal." className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => setShowBroadcastModal(false)} className="px-3 py-1.5 border border-slate-300 rounded">Cancel</button>
              <button 
                onClick={() => {
                  alert('SMS broadcast successfully queued to telecom operator gateway.');
                  setShowBroadcastModal(false);
                }} 
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded"
              >
                Dispatch Broadcast
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
