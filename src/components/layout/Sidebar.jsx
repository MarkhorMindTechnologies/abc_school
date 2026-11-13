import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, UserPlus, Users, GraduationCap, BookOpen, 
  Calendar, CheckSquare, Award, CreditCard, DollarSign, 
  FileText, Library, Bus, Home, Bell, UserCheck, 
  Briefcase, Boxes, BarChart3, Settings, ShieldCheck,
  BookMarked, HelpCircle, FileCheck
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export default function Sidebar({ isOpen, onClose }) {
  const { currentRoleId, admissions, bookIssues, notices, homework } = useSchool();

  // Role permissions filtering
  const allNavGroups = [
    {
      group: 'Core',
      items: [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['all'] },
        { name: 'Parent Portal', path: '/parent-portal', icon: UserCheck, roles: ['super_admin', 'principal', 'parent'] },
        { name: 'Student Portal', path: '/student-portal', icon: GraduationCap, roles: ['super_admin', 'principal', 'student'] }
      ]
    },
    {
      group: 'Enrollment & People',
      items: [
        { 
          name: 'Admissions', 
          path: '/admissions', 
          icon: UserPlus, 
          badge: admissions.filter(a => a.status === 'Under Review').length || null,
          roles: ['super_admin', 'principal', 'receptionist'] 
        },
        { name: 'Student Records', path: '/students', icon: Users, roles: ['super_admin', 'principal', 'teacher', 'receptionist'] },
        { name: 'Faculty & Staff', path: '/staff', icon: GraduationCap, roles: ['super_admin', 'principal', 'hr'] },
        { name: 'HR & Leaves', path: '/hr', icon: Briefcase, roles: ['super_admin', 'principal', 'hr'] }
      ]
    },
    {
      group: 'Academic Operations',
      items: [
        { name: 'Classes & Sessions', path: '/academics', icon: BookOpen, roles: ['super_admin', 'principal', 'teacher'] },
        { name: 'Timetable Grid', path: '/timetable', icon: Calendar, roles: ['super_admin', 'principal', 'teacher', 'student', 'parent'] },
        { name: 'Attendance Register', path: '/attendance', icon: CheckSquare, roles: ['super_admin', 'principal', 'teacher'] },
        { 
          name: 'Homework & Tasks', 
          path: '/homework', 
          icon: FileCheck, 
          badge: homework.filter(h => h.status === 'Active').length || null,
          roles: ['super_admin', 'principal', 'teacher', 'student'] 
        },
        { name: 'Learning LMS', path: '/lms', icon: BookMarked, roles: ['super_admin', 'principal', 'teacher', 'student'] },
        { name: 'Examinations & Marks', path: '/examinations', icon: Award, roles: ['super_admin', 'principal', 'teacher', 'student', 'parent'] }
      ]
    },
    {
      group: 'Finance & Payroll',
      items: [
        { name: 'Fee Collection Counter', path: '/fees', icon: CreditCard, roles: ['super_admin', 'principal', 'accountant', 'parent'] },
        { name: 'Accounts & Payroll', path: '/accounts-payroll', icon: DollarSign, roles: ['super_admin', 'principal', 'accountant', 'hr'] }
      ]
    },
    {
      group: 'Campus Logistics',
      items: [
        { 
          name: 'Library Catalog', 
          path: '/library', 
          icon: Library, 
          badge: bookIssues.filter(b => b.status === 'Overdue').length ? 'Dues' : null,
          roles: ['super_admin', 'principal', 'librarian', 'teacher', 'student'] 
        },
        { name: 'Transport Fleet', path: '/transport', icon: Bus, roles: ['super_admin', 'principal', 'transport'] },
        { name: 'Hostel Residencies', path: '/hostel', icon: Home, roles: ['super_admin', 'principal'] },
        { name: 'Campus Inventory', path: '/inventory', icon: Boxes, roles: ['super_admin', 'principal'] }
      ]
    },
    {
      group: 'Communication & Admin',
      items: [
        { 
          name: 'Notice Board', 
          path: '/communications', 
          icon: Bell, 
          badge: notices.length || null,
          roles: ['all'] 
        },
        { name: 'Reports & Analytics', path: '/reports', icon: BarChart3, roles: ['super_admin', 'principal', 'accountant'] },
        { name: 'Settings & Domain', path: '/settings', icon: Settings, roles: ['super_admin', 'principal'] }
      ]
    }
  ];

  const isPermitted = (roles) => {
    if (roles.includes('all')) return true;
    if (currentRoleId === 'super_admin' || currentRoleId === 'principal') return true;
    return roles.includes(currentRoleId);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-slate-800 shrink-0 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-xs tracking-wider">
              ABC
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight">ABC School ERP</span>
              <span className="block text-[10px] text-slate-400 font-mono">v2.4 Enterprise</span>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {allNavGroups.map((group, gIdx) => {
            const filteredItems = group.items.filter(item => isPermitted(item.roles));
            if (filteredItems.length === 0) return null;

            return (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {group.group}
                </div>
                <div className="space-y-0.5 pt-1">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition ${
                            isActive
                              ? 'bg-blue-700 text-white font-semibold shadow-xs'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-blue-900 text-blue-200 border border-blue-700">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <p className="font-semibold text-slate-200 text-[11px] truncate">portal.abcschool.edu.in</p>
              <p className="text-[10px] text-emerald-400">Verified & SSL Encrypted</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
