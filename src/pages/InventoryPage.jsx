import React, { useState } from 'react';
import { 
  Boxes, Plus, AlertTriangle, CheckCircle, 
  Search, Filter, MapPin, Wrench 
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';

export default function InventoryPage() {
  const { inventory, addInventoryItem, updateInventoryStock } = useSchool();
  const [showAddModal, setShowAddModal] = useState(false);
  const [adjustItem, setAdjustItem] = useState(null);
  const [newQty, setNewQty] = useState(0);

  const [formData, setFormData] = useState({
    itemName: '',
    category: 'IT Equipment',
    quantity: 20,
    unit: 'Units',
    location: 'Campus Store',
    condition: 'Working',
    minThreshold: 10
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.itemName) return;
    addInventoryItem(formData);
    setShowAddModal(false);
    setFormData({
      itemName: '',
      category: 'IT Equipment',
      quantity: 20,
      unit: 'Units',
      location: 'Campus Store',
      condition: 'Working',
      minThreshold: 10
    });
  };

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    if (!adjustItem) return;
    updateInventoryStock(adjustItem.id, newQty);
    setAdjustItem(null);
  };

  const columns = [
    {
      header: 'Asset Code',
      accessor: 'id',
      className: 'w-24',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-800">{row.id}</span>
    },
    {
      header: 'Item Description',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.itemName}</p>
          <p className="text-[11px] text-slate-500">Condition: {row.condition}</p>
        </div>
      )
    },
    {
      header: 'Category',
      render: (row) => <Badge variant="neutral">{row.category}</Badge>
    },
    {
      header: 'Location',
      render: (row) => (
        <span className="text-xs text-slate-700 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{row.location}</span>
        </span>
      )
    },
    {
      header: 'Current Stock',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.quantity} {row.unit}</p>
          <p className="text-[10px] text-slate-400">Min Alert: {row.minThreshold}</p>
        </div>
      )
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'Low Stock' ? 'danger' : 'success'}>
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Action',
      className: 'text-right',
      render: (row) => (
        <button
          onClick={() => {
            setAdjustItem(row);
            setNewQty(row.quantity);
          }}
          className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
        >
          Update Stock
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Assets & Inventory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Classroom furniture, computer laboratories, science apparatus and stationery inventory controls.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Asset Record</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={inventory}
        searchPlaceholder="Search asset name, category, or location..."
        searchKeys={['itemName', 'category', 'location', 'condition']}
        exportFilename="abc_school_inventory_master_2026"
      />

      {/* Adjust Stock Modal */}
      {adjustItem && (
        <Modal
          isOpen={!!adjustItem}
          onClose={() => setAdjustItem(null)}
          title={`Update Stock — ${adjustItem.itemName}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleAdjustSubmit} className="space-y-3 text-xs">
            <p className="text-slate-600">Location: <strong className="text-slate-900">{adjustItem.location}</strong></p>
            <div>
              <label className="block font-medium text-slate-700 mb-1">New Verified Count ({adjustItem.unit})</label>
              <input
                type="number"
                required
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onClick={() => setAdjustItem(null)} className="px-3 py-1.5 border border-slate-300 rounded text-slate-700">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800">Update Count</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Asset Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Catalogue New Institutional Asset"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreate} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Asset Name *</label>
              <input
                type="text"
                required
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                placeholder="e.g. Physics Optical Bench"
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                >
                  <option value="IT Equipment">IT Equipment</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Sports">Sports</option>
                  <option value="Medical">Medical</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Campus Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Physics Lab"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Unit of Measure</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g. Units, Sets, Reams"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-3 py-1.5 border border-slate-300 rounded text-slate-700">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800">Add to Inventory</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
