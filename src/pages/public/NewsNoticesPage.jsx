import React, { useState } from 'react';
import { Bell, Calendar, Download, Search, Filter, AlertCircle, FileText } from 'lucide-react';
import { newsAndNotices } from '../../data/websiteData';

export default function NewsNoticesPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredNotices = newsAndNotices.filter((n) => {
    const matchCategory = categoryFilter === 'All' || n.category === categoryFilter;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Official Communications
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Circulars, Notices & Press Releases
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Stay informed with official circulars from the Office of the Principal, academic schedules, examination notifications, and school announcements.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search circulars, board notices, events..."
              className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-600">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm font-medium text-slate-800 focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
            >
              <option value="All">All Categories</option>
              <option value="Admissions">Admissions</option>
              <option value="Examination">Examinations</option>
              <option value="Campus Events">Campus Events</option>
              <option value="Achievements">Achievements</option>
            </select>
          </div>
        </div>

        {/* Notices Cards List */}
        <div className="space-y-5 mt-6">
          {filteredNotices.map((n) => (
            <div key={n.id} className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs space-y-4 hover:border-blue-700 hover:shadow-md transition duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-md text-xs font-bold uppercase tracking-wider">
                    {n.category}
                  </span>
                  {n.isUrgent && (
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md text-xs font-bold uppercase">
                      Urgent
                    </span>
                  )}
                </div>

                <div className="text-sm text-slate-500 font-mono flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Published: {n.date}</span>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-serif">{n.title}</h3>
              <p className="text-base text-slate-700 leading-relaxed">{n.summary}</p>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm border-t border-slate-100">
                <span className="text-slate-500 italic">Issued by: Office of the Principal</span>
                <button
                  onClick={() => alert(`Downloading signed circular PDF for '${n.title}'...`)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-blue-900 font-semibold rounded-lg hover:bg-slate-100 transition cursor-pointer self-start sm:self-auto"
                >
                  <Download className="w-4 h-4 text-blue-700" />
                  <span>Download Circular PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
