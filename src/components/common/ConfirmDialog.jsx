import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm Action', message, confirmText = 'Confirm', confirmVariant = 'danger' }) {
  const btnStyles = {
    danger: 'bg-rose-700 hover:bg-rose-800 text-white',
    primary: 'bg-blue-700 hover:bg-blue-800 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-slate-700 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition ${btnStyles[confirmVariant] || btnStyles.primary}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
