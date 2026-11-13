import React, { useState } from 'react';
import { 
  Menu, Bell, Search, ShieldCheck, ChevronDown, User, Check, 
  ExternalLink, LogOut, RefreshCw, X
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onToggleSidebar }) {
  const { currentRole, currentRoleId, switchRole, rolesList, notices, schoolInfo, resetAllData } = useSchool();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    switchRole(roleId);
    setShowRoleMenu(false);
  };

  const searchableLinks = [
    { title: 'Executive Dashboard', path: '/', role: 'All' },
    { title: 'Student Management Directory', path: '/students', role: 'Staff' },
    { title: 'Faculty & Staff Register', path: '/staff', role: 'Admin' },
    { title: 'Fee Collection Counter', path: '/fees', role: 'Finance' },
    { title: 'Student Attendance Register', path: '/attendance', role: 'Teachers' },
    { title: 'Examinations & Report Cards', path: '/examinations', role: 'Academics' },
    { title: 'Academic Classes & Syllabus', path: '/academics', role: 'Academics' },
    { title: 'Class Timetable Grid', path: '/timetable', role: 'Academics' },
    { title: 'Online Admissions & Enquiries', path: '/admissions', role: 'Office' },
    { title: 'Library Catalog & Issue Desk', path: '/library', role: 'Library' },
    { title: 'School Bus Fleet & Routes', path: '/transport', role: 'Transport' },
    { title: 'Homework & Assignments', path: '/homework', role: 'Academics' },
    { title: 'Digital LMS & Study Materials', path: '/lms', role: 'Academics' },
    { title: 'Accounts & Payroll Ledger', path: '/accounts-payroll', role: 'Finance' },
    { title: 'Parent Portal (Child Overview)', path: '/parent-portal', role: 'Parents' },
    { title: 'Student Self-Service Portal', path: '/student-portal', role: 'Students' },
    { title: 'HR & Staff Leaves Portal', path: '/hr', role: 'HR' },
    { title: 'Campus Assets & Inventory', path: '/inventory', role: 'Admin' },
    { title: 'Reports & Data Exports', path: '/reports', role: 'Admin' },
    { title: 'System Administration & Settings', path: '/settings', role: 'Super Admin' },
    { title: 'School Privacy Policy', path: '/privacy-policy', role: 'Public' },
    { title: 'Terms & Conditions of Service', path: '/terms-and-conditions', role: 'Public' }
  ];

  const filteredLinks = searchableLinks.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* Left: Mobile hamburger + School Branding */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-blue-900 text-white flex items-center justify-center font-bold text-sm tracking-tighter">
                ABC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm tracking-tight hidden sm:inline">
                    {schoolInfo.name}
                  </span>
                  <span className="font-bold text-slate-900 text-sm tracking-tight sm:hidden">
                    ABC School ERP
                  </span>
                  <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    CBSE Affiliated #{schoolInfo.affiliationNo}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Academic Session: <span className="font-semibold text-slate-700">{schoolInfo.activeSession}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Center: Quick Search Trigger */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Jump to module or page...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Role Switcher & User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
                title="Switch Active Persona / Role"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="text-left hidden sm:block">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">View Role</p>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{currentRole.label}</p>
                </div>
                <span className="sm:hidden font-bold text-xs text-slate-800">{currentRole.label.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-1 w-64 rounded-md bg-white border border-slate-200 shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 bg-slate-50 text-[11px] text-slate-500">
                    <span className="font-bold text-slate-800">Demo Role Switcher</span>
                    <p className="text-[10px] text-slate-400">Switch user persona to test specific dashboard & permissions</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {rolesList.map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRoleSelect(r.id)}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                          currentRoleId === r.id ? 'bg-blue-50/80 font-semibold text-blue-900' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-medium text-slate-900">{r.label}</p>
                          <p className="text-[11px] text-slate-500">{r.user}</p>
                        </div>
                        {currentRoleId === r.id && <Check className="w-4 h-4 text-blue-700" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifDrawer(!showNotifDrawer)}
                className="p-2 rounded-md text-slate-600 hover:bg-slate-100 relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              </button>

              {showNotifDrawer && (
                <div className="absolute right-0 mt-1 w-80 rounded-md bg-white border border-slate-200 shadow-lg py-1 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <span className="text-xs font-bold text-slate-800">School Notices & Alerts</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded">
                      {notices.length} Active
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notices.map(n => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.publishedDate}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">{n.content}</p>
                        <p className="text-[10px] text-blue-600 font-medium mt-1">Target: {n.targetAudience}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-100 text-center bg-slate-50">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNotifDrawer(false);
                        navigate('/communications');
                      }}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                      View All Circulars & Announcements →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-100"
              >
                <div className="w-7 h-7 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                  {currentRole.user.substring(0, 2).toUpperCase()}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-1 w-56 rounded-md bg-white border border-slate-200 shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                    <p className="text-xs font-bold text-slate-900">{currentRole.user}</p>
                    <p className="text-[11px] text-slate-500">{currentRole.label}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>School Profile & Domain</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      if (window.confirm('Reset all ABC School data back to fresh demo seed?')) {
                        resetAllData();
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                    <span>Reset Demo Data</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      switchRole('super_admin');
                      navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-slate-400" />
                    <span>Switch to Super Admin</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-3 border-b border-slate-200 flex items-center gap-2 bg-slate-50">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules, pages, registers..."
                className="w-full bg-transparent text-sm text-slate-900 focus:outline-hidden"
              />
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-1">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(item.path);
                      setShowSearchModal(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center justify-between text-xs transition"
                  >
                    <span className="font-semibold text-slate-800">{item.title}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                      {item.role}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">
                  No modules match "{searchQuery}"
                </div>
              )}
            </div>
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex justify-between">
              <span>Press ESC or click close to exit</span>
              <span>ABC ERP Navigation</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
