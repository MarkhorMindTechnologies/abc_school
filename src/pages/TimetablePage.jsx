import React, { useState } from 'react';
import { 
  Calendar, Clock, Plus, Printer, CheckCircle, 
  AlertTriangle, Filter, Users, MapPin 
} from 'lucide-react';
import Modal from '../components/common/Modal';
import Badge from '../components/common/Badge';
import { useSchool } from '../context/SchoolContext';

export default function TimetablePage() {
  const { timetable, classes, staff, subjects } = useSchool();
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);

  // New slot form
  const [slotData, setSlotData] = useState({
    day: 'Monday',
    period: 1,
    time: '09:00 - 09:45',
    subject: 'Mathematics',
    teacher: 'Mrs. Sunita Raina',
    room: 'Room 204'
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [
    { num: 1, time: '09:00 - 09:45 AM' },
    { num: 2, time: '09:45 - 10:30 AM' },
    { num: 3, time: '10:30 - 11:15 AM' },
    { num: 4, time: '11:15 - 12:00 PM' },
    { num: 5, time: '12:00 - 12:45 PM' },
    { num: 6, time: '01:30 - 02:15 PM' },
    { num: 7, time: '02:15 - 03:00 PM' }
  ];

  const handleAddSlot = (e) => {
    e.preventDefault();
    alert(`Period slot allocated successfully for ${slotData.day} Period ${slotData.period}!`);
    setShowAddSlotModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Academic Timetable & Schedule</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Weekly class periods, lab sessions, faculty distribution and conflict detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition inline-flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Timetable</span>
          </button>
          <button
            onClick={() => setShowAddSlotModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Allocate Slot</span>
          </button>
        </div>
      </div>

      {/* Selector Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Filter className="w-4 h-4 text-blue-700" />
            <span>Select Class:</span>
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white font-medium text-slate-800"
          >
            {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white font-medium text-slate-800"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Zero Schedule Conflicts</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">7 Periods Daily (45 mins each)</span>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between items-center">
          <span>Weekly Period Schedule: {selectedClass} - Section {selectedSection}</span>
          <span className="text-slate-500 font-normal">Class Teacher: Mrs. Sunita Raina</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-3 border-r border-slate-200 w-24">Day</th>
                {periods.map(p => (
                  <th key={p.num} className="p-2 border-r border-slate-200 text-center min-w-[130px]">
                    <div>Period {p.num}</div>
                    <div className="text-[10px] text-slate-500 font-normal lowercase">{p.time}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {daysOfWeek.map((day) => (
                <tr key={day} className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold bg-slate-50 border-r border-slate-200 text-slate-900">
                    {day}
                  </td>
                  {periods.map(period => {
                    // Match slot
                    const match = timetable.find(t => 
                      t.day === day && 
                      t.period === period.num && 
                      t.className === selectedClass && 
                      t.section === selectedSection
                    );

                    return (
                      <td key={period.num} className="p-2 border-r border-slate-200 align-top">
                        {match ? (
                          <div className="bg-blue-50/80 border border-blue-200 p-2 rounded text-slate-800 space-y-0.5">
                            <p className="font-bold text-blue-950 text-xs">{match.subject}</p>
                            <p className="text-[11px] text-slate-600 truncate">{match.teacher}</p>
                            <p className="text-[10px] text-slate-500 font-medium flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{match.room}</span>
                            </p>
                          </div>
                        ) : (
                          <div className="bg-slate-50 border border-dashed border-slate-200 p-2 rounded text-center text-slate-400 text-[11px] h-full flex items-center justify-center">
                            <span>Self Study / Rev</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddSlotModal && (
        <Modal
          isOpen={showAddSlotModal}
          onClose={() => setShowAddSlotModal(false)}
          title="Allocate Period Slot"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAddSlot} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Day of Week</label>
                <select
                  value={slotData.day}
                  onChange={(e) => setSlotData({ ...slotData, day: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Period Number</label>
                <select
                  value={slotData.period}
                  onChange={(e) => setSlotData({ ...slotData, period: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {periods.map(p => <option key={p.num} value={p.num}>Period {p.num}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Subject</label>
                <select
                  value={slotData.subject}
                  onChange={(e) => setSlotData({ ...slotData, subject: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {subjects.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Room / Lab</label>
                <input
                  type="text"
                  value={slotData.room}
                  onChange={(e) => setSlotData({ ...slotData, room: e.target.value })}
                  placeholder="e.g. Science Lab A"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Subject Faculty</label>
                <select
                  value={slotData.teacher}
                  onChange={(e) => setSlotData({ ...slotData, teacher: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {staff.map(st => <option key={st.id} value={st.fullName}>{st.fullName} ({st.designation})</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddSlotModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Save Period Slot
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
