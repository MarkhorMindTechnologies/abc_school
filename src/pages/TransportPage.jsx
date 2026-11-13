import React, { useState } from 'react';
import { 
  Bus, MapPin, Users, Phone, CheckCircle, 
  Clock, Shield, Plus, Navigation 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';
import { formatCurrency } from '../utils/formatters';

export default function TransportPage() {
  const { transportRoutes, students } = useSchool();
  const [selectedRoute, setSelectedRoute] = useState(transportRoutes[0]?.id || 'RT-01');
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);

  const activeRouteObj = transportRoutes.find(r => r.id === selectedRoute) || transportRoutes[0];
  const allocatedStudents = students.filter(s => s.busRoute && s.busRoute.includes(activeRouteObj.routeNumber));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Campus Transport & Bus Fleet Operations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fleet monitoring, live GPS routes, stop timings, driver verification, and student bus boarding allocations.
          </p>
        </div>

        <button
          onClick={() => setShowAddRouteModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transport Route</span>
        </button>
      </div>

      {/* Fleet KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {transportRoutes.map((route) => (
          <div
            key={route.id}
            onClick={() => setSelectedRoute(route.id)}
            className={`p-5 rounded-lg border cursor-pointer transition ${
              selectedRoute === route.id
                ? 'bg-blue-50/70 border-blue-600 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm">{route.routeNumber}</span>
                <p className="text-xs text-slate-500 mt-0.5">{route.routeName}</p>
              </div>
              <Badge variant="success">GPS Online</Badge>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-600">
              <p><span className="text-slate-500">Vehicle:</span> <strong className="font-mono text-slate-800">{route.vehicleNo}</strong> ({route.busModel.split('(')[0]})</p>
              <p><span className="text-slate-500">Driver:</span> {route.driverName} • <span className="font-mono">{route.driverPhone}</span></p>
              <div className="flex justify-between items-center pt-1 font-semibold text-slate-800">
                <span>Occupancy:</span>
                <span>{route.allocatedStudents} / {route.totalCapacity} Seats</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Route Detail View: Stops & Timings and Allocated Students */}
      {activeRouteObj && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stops Timeline */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-blue-700" />
              <span>Route Stops & Morning Schedule</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">{activeRouteObj.routeName}</p>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {activeRouteObj.stops.map((stop, sIdx) => (
                <div key={sIdx} className="relative pl-7 text-xs">
                  <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-blue-700 border-2 border-white shadow-xs"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900">{stop.name}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Pickup: {stop.time}</span>
                      </p>
                    </div>
                    {stop.fare > 0 && (
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                        {formatCurrency(stop.fare)}/mo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boarding Students List */}
          <div className="lg:col-span-2 bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Students Boarding on {activeRouteObj.routeNumber}</h3>
                <p className="text-xs text-slate-500">Parent contact and emergency transit phone numbers</p>
              </div>
              <span className="text-xs font-bold text-slate-700">
                {allocatedStudents.length} Students Listed
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {allocatedStudents.map((st) => (
                <div key={st.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{st.fullName}</p>
                    <p className="text-[11px] text-slate-500">
                      Class: {st.className}-{st.section} • Stop: <span className="text-blue-800 font-medium">{st.busStop || 'Main Stop'}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-slate-800 font-medium">{st.fatherPhone}</p>
                    <p className="text-[10px] text-slate-400">{st.fatherName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Route Modal */}
      {showAddRouteModal && (
        <Modal
          isOpen={showAddRouteModal}
          onClose={() => setShowAddRouteModal(false)}
          title="Add New School Bus Route"
          maxWidth="max-w-md"
        >
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Route Identifier (e.g. Route 6)</label>
              <input type="text" placeholder="Route 6" className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Route Name / Areas Covered</label>
              <input type="text" placeholder="e.g. Bemina - Batamaloo - School" className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Bus Registration No</label>
                <input type="text" placeholder="JK01-AB-7788" className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Total Capacity</label>
                <input type="number" defaultValue={40} className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Driver Name & Mobile</label>
              <input type="text" placeholder="e.g. Ghulam Nabi (+91 94190...)" className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs" />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => setShowAddRouteModal(false)} className="px-3 py-1.5 border border-slate-300 rounded">Cancel</button>
              <button 
                onClick={() => {
                  alert('Route 6 registered into transport fleet database.');
                  setShowAddRouteModal(false);
                }} 
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded"
              >
                Save Route
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
