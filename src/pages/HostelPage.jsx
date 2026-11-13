import React, { useState } from 'react';
import { 
  Home, Users, Phone, CheckCircle, AlertCircle, 
  Plus, Shield, Wrench 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';

export default function HostelPage() {
  const { hostel } = useSchool();
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const roomsList = [
    { roomNo: 'Room 101', block: 'Chenab Boys Block', floor: '1st Floor', capacity: 3, occupied: 3, students: 'Aarav Sharma, Rahul Bhat, Syed Hamza', status: 'Full' },
    { roomNo: 'Room 102', block: 'Chenab Boys Block', floor: '1st Floor', capacity: 3, occupied: 2, students: 'Mohd Iqbal Rather, Ishan Pandita', status: 'Available' },
    { roomNo: 'Room 201', block: 'Jhelum Girls Block', floor: '2nd Floor', capacity: 3, occupied: 3, students: 'Zoya Fatima Khan, Ananya Verma, Fatima Zahra', status: 'Full' },
    { roomNo: 'Room 202', block: 'Jhelum Girls Block', floor: '2nd Floor', capacity: 3, occupied: 2, students: 'Mehvish Jan, Priya Devi', status: 'Available' }
  ];

  const complaints = [
    { id: 'CMP-01', room: 'Room 102 (Chenab)', issue: 'Heating radiator valve adjustment required', reportedDate: '2026-02-11', status: 'Resolved' },
    { id: 'CMP-02', room: 'Room 201 (Jhelum)', issue: 'Study lamp electrical socket loose', reportedDate: '2026-02-12', status: 'Under Maintenance' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hostel Residencies & Boarding Care</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dormitory room allocation, warden supervision, bed occupancy and maintenance request tracking.
          </p>
        </div>

        <button
          onClick={() => setShowComplaintModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Wrench className="w-4 h-4" />
          <span>Log Maintenance Request</span>
        </button>
      </div>

      {/* Block Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hostel.map((block) => (
          <div key={block.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{block.blockName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Warden: {block.wardenName}</p>
              </div>
              <Badge variant="success">{block.status}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-md border border-slate-100 text-center text-xs">
              <div>
                <p className="text-slate-500 text-[10px]">Total Rooms</p>
                <p className="font-bold text-slate-900">{block.totalRooms}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px]">Total Beds</p>
                <p className="font-bold text-slate-900">{block.totalBeds}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px]">Occupied</p>
                <p className="font-bold text-blue-900">{block.occupiedBeds}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Warden Helpline: <strong className="font-mono text-slate-800">{block.wardenPhone}</strong></span>
            </p>
          </div>
        ))}
      </div>

      {/* Room Allocation Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800">
          Student Room Allocation Matrix
        </div>

        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-3">Room No</th>
              <th className="p-3">Block & Floor</th>
              <th className="p-3">Bed Occupancy</th>
              <th className="p-3">Resident Students</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {roomsList.map((room, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition">
                <td className="p-3 font-bold text-slate-900 font-mono">{room.roomNo}</td>
                <td className="p-3">
                  <p className="font-medium">{room.block}</p>
                  <p className="text-[11px] text-slate-500">{room.floor}</p>
                </td>
                <td className="p-3 font-bold text-slate-800">{room.occupied} / {room.capacity} Beds</td>
                <td className="p-3 text-slate-700">{room.students}</td>
                <td className="p-3 text-right">
                  <Badge variant={room.status === 'Full' ? 'neutral' : 'success'}>{room.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Hostel Maintenance & Complaints Register</h3>
        <div className="divide-y divide-slate-100 border border-slate-200 rounded">
          {complaints.map((c) => (
            <div key={c.id} className="p-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{c.issue}</p>
                <p className="text-[11px] text-slate-500">Location: {c.room} • Logged on: {c.reportedDate}</p>
              </div>
              <Badge variant={c.status === 'Resolved' ? 'success' : 'warning'}>{c.status}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showComplaintModal && (
        <Modal
          isOpen={showComplaintModal}
          onClose={() => setShowComplaintModal(false)}
          title="Log Hostel Maintenance Request"
          maxWidth="max-w-md"
        >
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Room / Common Area</label>
              <input type="text" placeholder="e.g. Room 102 (Chenab Block)" className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Issue Description</label>
              <textarea rows={3} placeholder="Describe the plumbing, electrical or heating issue..." className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => setShowComplaintModal(false)} className="px-3 py-1.5 border border-slate-300 rounded">Cancel</button>
              <button 
                onClick={() => {
                  alert('Maintenance ticket dispatched to campus estate manager.');
                  setShowComplaintModal(false);
                }} 
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded"
              >
                Submit Request
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
