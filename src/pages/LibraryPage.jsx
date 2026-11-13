import React, { useState } from 'react';
import { 
  Library, Plus, BookOpen, CheckCircle, Clock, 
  Search, ArrowRight, RotateCcw, AlertTriangle 
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';
import { formatDate, formatCurrency } from '../utils/formatters';

export default function LibraryPage() {
  const { books, bookIssues, students, addBook, issueBook, returnBook } = useSchool();
  const [activeTab, setActiveTab] = useState('catalog');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  // New Book form
  const [bookData, setBookData] = useState({
    isbn: '978-9351448839',
    title: '',
    author: '',
    category: 'Physics',
    shelfLocation: 'Rack P-05',
    totalCopies: 10
  });

  // Issue Book form
  const [issueData, setIssueData] = useState({
    bookId: books[0]?.id || '',
    studentId: students[0]?.id || '',
    dueDate: '2026-02-26'
  });

  const handleCreateBook = (e) => {
    e.preventDefault();
    if (!bookData.title || !bookData.author) return;
    addBook(bookData);
    setShowAddBookModal(false);
    setBookData({
      isbn: '978-9351448839',
      title: '',
      author: '',
      category: 'Physics',
      shelfLocation: 'Rack P-05',
      totalCopies: 10
    });
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    const bk = books.find(b => b.id === issueData.bookId);
    const st = students.find(s => s.id === issueData.studentId);
    if (!bk || !st) return;

    if (bk.availableCopies <= 0) {
      alert('All copies of this title are currently issued out.');
      return;
    }

    issueBook({
      bookId: bk.id,
      bookTitle: bk.title,
      studentId: st.id,
      studentName: st.fullName,
      admissionNo: st.admissionNo,
      dueDate: issueData.dueDate
    });

    setShowIssueModal(false);
  };

  const handleReturn = (issueId) => {
    returnBook(issueId);
    alert('Book returned to library inventory successfully!');
  };

  const bookColumns = [
    {
      header: 'ISBN',
      accessor: 'isbn',
      className: 'w-32',
      render: (row) => <span className="font-mono text-xs text-slate-700">{row.isbn}</span>
    },
    {
      header: 'Book Title & Author',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.title}</p>
          <p className="text-[11px] text-slate-500">By {row.author}</p>
        </div>
      )
    },
    {
      header: 'Category',
      render: (row) => <Badge variant="neutral">{row.category}</Badge>
    },
    {
      header: 'Rack Location',
      accessor: 'shelfLocation',
      render: (row) => <span className="text-xs font-mono font-medium text-slate-800">{row.shelfLocation}</span>
    },
    {
      header: 'Availability',
      render: (row) => (
        <span className="text-xs font-bold text-slate-900">
          <span className="text-emerald-700">{row.availableCopies}</span> / {row.totalCopies} Available
        </span>
      )
    }
  ];

  const issueColumns = [
    {
      header: 'Issue ID',
      accessor: 'id',
      className: 'w-24',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-800">{row.id}</span>
    },
    {
      header: 'Book Title',
      render: (row) => <span className="font-bold text-slate-900 text-xs">{row.bookTitle}</span>
    },
    {
      header: 'Student Name',
      render: (row) => (
        <div className="text-xs">
          <p className="font-bold text-slate-900">{row.studentName}</p>
          <p className="text-[11px] text-slate-500 font-mono">Adm: {row.admissionNo}</p>
        </div>
      )
    },
    {
      header: 'Issue Date',
      render: (row) => <span className="text-xs text-slate-700">{formatDate(row.issueDate)}</span>
    },
    {
      header: 'Due Date',
      render: (row) => <span className="text-xs font-medium text-slate-800">{formatDate(row.dueDate)}</span>
    },
    {
      header: 'Status',
      render: (row) => {
        const variants = {
          'Issued': 'primary',
          'Returned': 'success',
          'Overdue': 'danger'
        };
        return <Badge variant={variants[row.status] || 'neutral'}>{row.status}</Badge>;
      }
    },
    {
      header: 'Action',
      className: 'text-right',
      render: (row) => row.status !== 'Returned' && (
        <button
          onClick={() => handleReturn(row.id)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded hover:bg-emerald-100 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Return Book</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Library & Catalog Desk</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Book repository, student borrowing register, due date tracking, and automated overdue fines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIssueModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Issue Book</span>
          </button>
          <button
            onClick={() => setShowAddBookModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Title to Catalog</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'catalog'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Book Catalog ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'issues'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Borrowing & Return Register ({bookIssues.length})
        </button>
      </div>

      {/* Tab 1: Book Catalog */}
      {activeTab === 'catalog' && (
        <DataTable
          columns={bookColumns}
          data={books}
          searchPlaceholder="Search book by title, author, ISBN, category..."
          searchKeys={['title', 'author', 'isbn', 'category', 'shelfLocation']}
          exportFilename="abc_school_library_catalog_2026"
        />
      )}

      {/* Tab 2: Borrowing Register */}
      {activeTab === 'issues' && (
        <DataTable
          columns={issueColumns}
          data={bookIssues}
          searchPlaceholder="Search borrowed books, student names, admission numbers..."
          searchKeys={['bookTitle', 'studentName', 'admissionNo', 'status']}
          exportFilename="abc_school_library_borrowings_2026"
        />
      )}

      {/* Add Book Modal */}
      {showAddBookModal && (
        <Modal
          isOpen={showAddBookModal}
          onClose={() => setShowAddBookModal(false)}
          title="Catalog New Library Title"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateBook} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Book Title *</label>
              <input
                type="text"
                required
                value={bookData.title}
                onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                placeholder="e.g. Fundamental Physics (Halliday Resnick)"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Author Name *</label>
              <input
                type="text"
                required
                value={bookData.author}
                onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                placeholder="e.g. David Halliday"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">ISBN Number</label>
                <input
                  type="text"
                  value={bookData.isbn}
                  onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Rack / Shelf Location</label>
                <input
                  type="text"
                  value={bookData.shelfLocation}
                  onChange={(e) => setBookData({ ...bookData, shelfLocation: e.target.value })}
                  placeholder="e.g. Rack P-04"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Total Copies</label>
                <input
                  type="number"
                  min={1}
                  value={bookData.totalCopies}
                  onChange={(e) => setBookData({ ...bookData, totalCopies: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={bookData.category}
                  onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  <option value="Physics">Physics</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Literature">Literature</option>
                  <option value="History">History & Heritage</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddBookModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Save to Catalog
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Issue Book Modal */}
      {showIssueModal && (
        <Modal
          isOpen={showIssueModal}
          onClose={() => setShowIssueModal(false)}
          title="Issue Book to Student"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleIssueSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Select Book Title *</label>
              <select
                value={issueData.bookId}
                onChange={(e) => setIssueData({ ...issueData, bookId: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                {books.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.title} ({b.availableCopies} Copies Available)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Select Student *</label>
              <select
                value={issueData.studentId}
                onChange={(e) => setIssueData({ ...issueData, studentId: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.fullName} ({s.className}-{s.section}) — {s.admissionNo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Return Due Date</label>
              <input
                type="date"
                value={issueData.dueDate}
                onChange={(e) => setIssueData({ ...issueData, dueDate: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
              <p className="text-[10px] text-slate-400 mt-1">Standard loan period is 14 days. Overdue fine: ₹5/day.</p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowIssueModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Confirm Book Issue
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
