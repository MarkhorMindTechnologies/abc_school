import React from 'react';
import { 
  Users, GraduationCap, CheckCircle, CreditCard, 
  UserPlus, Bell, Calendar, BookOpen, ArrowUpRight, 
  FileText, Clock, AlertCircle, ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, AreaChart, Area, Legend 
} from 'recharts';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import { useSchool } from '../context/SchoolContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { 
    currentRole, 
    students, 
    staff, 
    admissions, 
    feeTransactions, 
    notices, 
    exams,
    schoolInfo 
  } = useSchool();
  const navigate = useNavigate();

  // Dynamic fee calculation
  const totalCollected = feeTransactions.reduce((acc, t) => acc + (t.paidAmount || 0), 0);
  const totalDues = students.reduce((acc, s) => acc + (s.pendingFeeAmount || 0), 0);

  // Recharts Monthly Revenue Data
  const monthlyFeeData = [
    { month: 'Oct 2025', collected: 1420000, target: 1500000 },
    { month: 'Nov 2025', collected: 1580000, target: 1600000 },
    { month: 'Dec 2025', collected: 1610000, target: 1600000 },
    { month: 'Jan 2026', collected: 1720000, target: 1700000 },
    { month: 'Feb 2026', collected: totalCollected + 1850000, target: 2000000 }
  ];

  // Recharts Attendance Trends
  const attendanceTrends = [
    { day: 'Mon', primary: 96, secondary: 94, seniorSec: 92 },
    { day: 'Tue', primary: 95, secondary: 93, seniorSec: 95 },
    { day: 'Wed', primary: 97, secondary: 96, seniorSec: 94 },
    { day: 'Thu', primary: 94, secondary: 92, seniorSec: 91 },
    { day: 'Fri', primary: 96, secondary: 95, seniorSec: 93 },
    { day: 'Sat', primary: 91, secondary: 89, seniorSec: 88 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Welcome back, {currentRole.user}
            </h1>
            <Badge variant="navy" size="xs">{currentRole.label}</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {schoolInfo.name} — Administrative Management Portal | Academic Year: {schoolInfo.activeSession}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/fees')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition inline-flex items-center gap-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Record Fee</span>
          </button>
          <button
            onClick={() => navigate('/admissions')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition inline-flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Admission</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled Students"
          value="1,420"
          subtitle={`${students.length} active demo records in current batch`}
          icon={Users}
          color="blue"
          trend={4.8}
          trendLabel="vs previous session"
        />
        <StatCard
          title="Faculty & Staff Members"
          value="84"
          subtitle={`${staff.length} certified teachers & admins`}
          icon={GraduationCap}
          color="emerald"
          trend={2.1}
          trendLabel="fully staffed"
        />
        <StatCard
          title="Average Campus Attendance"
          value="94.6%"
          subtitle="All classes aggregated today"
          icon={CheckCircle}
          color="emerald"
          trend={1.4}
          trendLabel="vs last week"
        />
        <StatCard
          title="Total Fee Collection"
          value={formatCurrency(totalCollected + 1850000)}
          subtitle={`Dues pending: ${formatCurrency(totalDues)}`}
          icon={CreditCard}
          color="amber"
          trend={8.2}
          trendLabel="collection rate"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Fee Collection Chart */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Fee Collection vs Target</h3>
              <p className="text-xs text-slate-500">Academic Year 2026–2027 (INR)</p>
            </div>
            <button 
              onClick={() => navigate('/fees')}
              className="text-xs font-medium text-blue-700 hover:text-blue-900 inline-flex items-center gap-0.5"
            >
              <span>Ledger</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFeeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => `₹${v/100000}L`} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), '']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="collected" fill="#1e3a8a" name="Collected" radius={[3, 3, 0, 0]} />
                <Bar dataKey="target" fill="#94a3b8" name="Target Demand" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Attendance Rate Area Chart */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Attendance Rate Trends</h3>
              <p className="text-xs text-slate-500">Primary, Middle & Senior Secondary Wing (%)</p>
            </div>
            <button 
              onClick={() => navigate('/attendance')}
              className="text-xs font-medium text-blue-700 hover:text-blue-900 inline-flex items-center gap-0.5"
            >
              <span>Mark Register</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '6px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="seniorSec" stroke="#1e3a8a" fill="#3b82f6" fillOpacity={0.15} name="Senior Secondary" />
                <Area type="monotone" dataKey="secondary" stroke="#059669" fill="#10b981" fillOpacity={0.15} name="Secondary (9-10)" />
                <Area type="monotone" dataKey="primary" stroke="#d97706" fill="#f59e0b" fillOpacity={0.15} name="Primary (1-5)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Two Column Layout: Recent Admissions & Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Admission Inquiries & Status */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Online Admissions & Inquiries</h3>
              <p className="text-xs text-slate-500">Applicant status tracking for Academic Session 2026–27</p>
            </div>
            <button
              onClick={() => navigate('/admissions')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900"
            >
              View All ({admissions.length}) →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {admissions.slice(0, 4).map((adm) => (
              <div key={adm.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{adm.applicantName}</span>
                    <span className="font-mono text-slate-500">({adm.appliedClass})</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Parent: {adm.fatherName} • Contact: {adm.fatherPhone}
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={
                      adm.status === 'Approved' || adm.status === 'Admitted' ? 'success' :
                      adm.status === 'Interview Scheduled' ? 'primary' : 'warning'
                    }
                  >
                    {adm.status}
                  </Badge>
                  <p className="text-[10px] text-slate-400 mt-1">{formatDate(adm.submissionDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Important Notices & Exam Alerts */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Notices & Circulars</h3>
              <p className="text-xs text-slate-500">Office of the Principal</p>
            </div>
            <button
              onClick={() => navigate('/communications')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900"
            >
              All Notices →
            </button>
          </div>

          <div className="space-y-3">
            {notices.slice(0, 3).map((notice) => (
              <div key={notice.id} className="p-3 bg-slate-50 rounded-md border border-slate-200/70 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 line-clamp-1">{notice.title}</span>
                  {notice.isPinned && (
                    <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[9px] font-bold rounded">
                      Pinned
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                  {notice.content}
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                  <span>{notice.publishedBy}</span>
                  <span>{formatDate(notice.publishedDate)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Examinations Widget */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              <span>Upcoming Exam Schedule</span>
            </h4>
            <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-md text-xs">
              <p className="font-bold text-blue-950">Annual Board Examination / Finals 2027</p>
              <p className="text-[11px] text-blue-800 mt-0.5">Classes: Nursery to Class 11</p>
              <p className="text-[10px] text-blue-600 font-medium mt-1">Starting: 01 March 2027</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
