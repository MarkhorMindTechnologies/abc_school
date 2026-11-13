import React, { useState } from 'react';
import { 
  Settings, Globe, Shield, Database, RefreshCw, 
  Lock, Save, Upload, Download, CheckCircle, AlertTriangle 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { useSchool } from '../context/SchoolContext';

export default function SettingsPage() {
  const { 
    schoolInfo, 
    setSchoolInfo, 
    auditLogs, 
    exportDatabase, 
    importDatabase, 
    resetAllData 
  } = useSchool();

  const [activeTab, setActiveTab] = useState('domain');
  const [formData, setFormData] = useState({ ...schoolInfo });
  const [importStatus, setImportStatus] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSchoolInfo(formData);
    alert('School information and institutional parameters saved successfully!');
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importDatabase(event.target.result);
      if (success) {
        setImportStatus('Database successfully restored from backup file!');
      } else {
        setImportStatus('Error: Invalid database JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Settings & Administration</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            School identity, custom domain DNS verification, role-based access control (RBAC), and database backups.
          </p>
        </div>

        <button
          onClick={exportDatabase}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Database JSON</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('domain')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'domain'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Custom Domain & SSL
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'profile'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          School Profile & CBSE Info
        </button>
        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'rbac'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Roles & RBAC Permissions
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'audit'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          System Audit Trail ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'backup'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Backup & Reset
        </button>
      </div>

      {/* Tab 1: Custom Domain */}
      {activeTab === 'domain' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-700" />
              <span>Production Custom Domain & SSL Configuration</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified custom domain mapping for ABC Public School's web portal.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-emerald-950">Domain Active & Connected: {schoolInfo.customDomain}</p>
              <p className="text-emerald-800 mt-0.5">
                DNS propagation completed. Automated wildcard SSL Certificate (TLS 1.3) provisioned and renewed.
              </p>
            </div>
          </div>

          {/* DNS Configuration Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Configured DNS Records</h4>
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Host / Name</th>
                    <th className="p-3">Value / Target</th>
                    <th className="p-3">TTL</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 font-bold text-blue-900">CNAME</td>
                    <td className="p-3 font-semibold">portal</td>
                    <td className="p-3">cname.abcschool.edu.in</td>
                    <td className="p-3">300s (Auto)</td>
                    <td className="p-3 text-right font-sans font-bold text-emerald-700">Verified</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-blue-900">TXT</td>
                    <td className="p-3 font-semibold">_school-verification</td>
                    <td className="p-3">abc-erp-site-verification=94190730045</td>
                    <td className="p-3">3600s</td>
                    <td className="p-3 text-right font-sans font-bold text-emerald-700">Verified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">School Legal Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Affiliation Board</label>
              <input
                type="text"
                required
                value={formData.affiliation}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">CBSE Affiliation Number</label>
              <input
                type="text"
                required
                value={formData.affiliationNo}
                onChange={(e) => setFormData({ ...formData, affiliationNo: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">School Code</label>
              <input
                type="text"
                required
                value={formData.schoolCode}
                onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Head of Institution (Principal)</label>
              <input
                type="text"
                required
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Active Academic Session</label>
              <input
                type="text"
                required
                value={formData.activeSession}
                onChange={(e) => setFormData({ ...formData, activeSession: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Campus Postal Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-200">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition"
            >
              <Save className="w-4 h-4" />
              <span>Save School Parameters</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: RBAC Matrix */}
      {activeTab === 'rbac' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
              <tr>
                <th className="p-3">User Role</th>
                <th className="p-3">Academics & Attendance</th>
                <th className="p-3">Fee & Payroll Ledger</th>
                <th className="p-3">Student SIS</th>
                <th className="p-3">HR & Staff</th>
                <th className="p-3 text-right">System Configuration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              <tr>
                <td className="p-3 font-bold text-blue-900">Super Administrator</td>
                <td className="p-3 text-emerald-700 font-semibold">Full Access</td>
                <td className="p-3 text-emerald-700 font-semibold">Full Access</td>
                <td className="p-3 text-emerald-700 font-semibold">Full Access</td>
                <td className="p-3 text-emerald-700 font-semibold">Full Access</td>
                <td className="p-3 text-right text-emerald-700 font-semibold">Owner</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Principal</td>
                <td className="p-3 text-emerald-700 font-semibold">Approve & View</td>
                <td className="p-3 text-emerald-700 font-semibold">Audit & Reports</td>
                <td className="p-3 text-emerald-700 font-semibold">Full Access</td>
                <td className="p-3 text-emerald-700 font-semibold">Approve Leaves</td>
                <td className="p-3 text-right text-slate-400">Read Only</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Teaching Faculty</td>
                <td className="p-3 text-emerald-700 font-semibold">Mark & Assign</td>
                <td className="p-3 text-slate-400">No Access</td>
                <td className="p-3 text-blue-700 font-semibold">Class Roster</td>
                <td className="p-3 text-slate-700 font-medium">Apply Leave</td>
                <td className="p-3 text-right text-slate-400">No Access</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Accounts Officer</td>
                <td className="p-3 text-slate-400">Read Only</td>
                <td className="p-3 text-emerald-700 font-semibold">Collect & Disburse</td>
                <td className="p-3 text-blue-700 font-semibold">Fee Ledger</td>
                <td className="p-3 text-blue-700 font-semibold">Payroll Prep</td>
                <td className="p-3 text-right text-slate-400">No Access</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Parent / Guardian</td>
                <td className="p-3 text-blue-700 font-semibold">Child View Only</td>
                <td className="p-3 text-emerald-700 font-semibold">Online Pay Only</td>
                <td className="p-3 text-blue-700 font-semibold">Child Profile</td>
                <td className="p-3 text-slate-400">No Access</td>
                <td className="p-3 text-right text-slate-400">No Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User & Role</th>
                <th className="p-3">Action Type</th>
                <th className="p-3">Operational Details</th>
                <th className="p-3 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{log.user}</p>
                    <p className="text-[10px] text-slate-500">{log.role}</p>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-blue-900 font-bold">{log.action}</td>
                  <td className="p-3 text-slate-700">{log.details}</td>
                  <td className="p-3 text-right font-mono text-slate-500">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 5: Backup & Reset */}
      {activeTab === 'backup' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backup */}
            <div className="border border-slate-200 rounded-lg p-5 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Download System Backup Archive</h4>
              <p className="text-slate-500 leading-relaxed">
                Export all module tables (Students, Staff, Fees, Exams, Timetable, Audit logs) into an encrypted portable JSON archive.
              </p>
              <button
                onClick={exportDatabase}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition"
              >
                <Download className="w-4 h-4" />
                <span>Export System Backup JSON</span>
              </button>
            </div>

            {/* Restore */}
            <div className="border border-slate-200 rounded-lg p-5 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Restore from JSON Archive</h4>
              <p className="text-slate-500 leading-relaxed">
                Upload a previously saved ABC ERP backup file to restore database state.
              </p>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="text-xs border border-slate-300 rounded p-1.5 w-full bg-slate-50"
              />
              {importStatus && <p className="text-emerald-700 font-bold">{importStatus}</p>}
            </div>
          </div>

          {/* Danger Zone: Reset */}
          <div className="pt-6 border-t border-rose-100 bg-rose-50/50 p-5 rounded-lg border border-rose-200 space-y-2">
            <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <span>Reset to Clean Demo State</span>
            </h4>
            <p className="text-rose-800 leading-relaxed">
              Resets all student enrollments, fee transactions, exam records, and notices back to the pristine ABC Public School factory seed dataset.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all ABC School data back to fresh seed?')) {
                  resetAllData();
                  alert('ERP database successfully reset to pristine ABC School state!');
                }
              }}
              className="px-4 py-2 bg-rose-700 text-white font-semibold rounded hover:bg-rose-800 transition"
            >
              Reset All ERP Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
