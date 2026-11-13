import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialSchoolInfo,
  initialClasses,
  initialSubjects,
  initialStudents,
  initialStaff,
  initialAdmissions,
  initialFeeStructures,
  initialFeeTransactions,
  initialExams,
  initialMarks,
  initialTimetableSlots,
  initialHomework,
  initialBooks,
  initialBookIssues,
  initialTransportRoutes,
  initialNotices,
  initialExpenses,
  initialInventory,
  initialHostel,
  initialAuditLogs
} from '../data/mockData';

const SchoolContext = createContext(null);

const STORAGE_KEY = 'abc_school_erp_state_v1';

export const ROLES = [
  { id: 'super_admin', label: 'Super Administrator', user: 'System Admin', badgeColor: 'bg-slate-900 text-white' },
  { id: 'principal', label: 'Principal', user: 'Dr. Farooq Ahmad Mir', badgeColor: 'bg-blue-900 text-white' },
  { id: 'teacher', label: 'Faculty / Teacher', user: 'Mrs. Sunita Raina (HOD Math)', badgeColor: 'bg-emerald-800 text-white' },
  { id: 'student', label: 'Student', user: 'Aarav Sharma (Class 10-A)', badgeColor: 'bg-indigo-800 text-white' },
  { id: 'parent', label: 'Parent / Guardian', user: 'Rajesh K. Sharma (Parent of Aarav)', badgeColor: 'bg-amber-800 text-white' },
  { id: 'accountant', label: 'Accounts Officer', user: 'Mrs. Rehana Qadir', badgeColor: 'bg-teal-800 text-white' },
  { id: 'librarian', label: 'Librarian', user: 'Mr. Manzoor Dar', badgeColor: 'bg-cyan-800 text-white' },
  { id: 'receptionist', label: 'Front Office / Reception', user: 'Ms. Uzma Jan', badgeColor: 'bg-rose-800 text-white' },
  { id: 'transport', label: 'Transport Manager', user: 'Mr. Bilal Sofi', badgeColor: 'bg-orange-800 text-white' },
  { id: 'hr', label: 'HR Manager', user: 'Human Resources Wing', badgeColor: 'bg-violet-800 text-white' }
];

export function SchoolProvider({ children }) {
  // Current active role
  const [currentRoleId, setCurrentRoleId] = useState(() => {
    return localStorage.getItem('abc_current_role') || 'super_admin';
  });

  // Main ERP State
  const [schoolInfo, setSchoolInfo] = useState(initialSchoolInfo);
  const [classes, setClasses] = useState(initialClasses);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [students, setStudents] = useState(initialStudents);
  const [staff, setStaff] = useState(initialStaff);
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [feeStructures, setFeeStructures] = useState(initialFeeStructures);
  const [feeTransactions, setFeeTransactions] = useState(initialFeeTransactions);
  const [exams, setExams] = useState(initialExams);
  const [marks, setMarks] = useState(initialMarks);
  const [timetable, setTimetable] = useState(initialTimetableSlots);
  const [homework, setHomework] = useState(initialHomework);
  const [books, setBooks] = useState(initialBooks);
  const [bookIssues, setBookIssues] = useState(initialBookIssues);
  const [transportRoutes, setTransportRoutes] = useState(initialTransportRoutes);
  const [notices, setNotices] = useState(initialNotices);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [inventory, setInventory] = useState(initialInventory);
  const [hostel, setHostel] = useState(initialHostel);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);

  // Daily attendance state: key is `YYYY-MM-DD_Class_Section`
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    return {
      '2026-02-12_Class 10_A': {
        'STU-001': 'Present',
        'STU-002': 'Present',
        'STU-003': 'Present',
        'STU-004': 'Present'
      }
    };
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.schoolInfo) setSchoolInfo(parsed.schoolInfo);
        if (parsed.classes) setClasses(parsed.classes);
        if (parsed.subjects) setSubjects(parsed.subjects);
        if (parsed.students) setStudents(parsed.students);
        if (parsed.staff) setStaff(parsed.staff);
        if (parsed.admissions) setAdmissions(parsed.admissions);
        if (parsed.feeTransactions) setFeeTransactions(parsed.feeTransactions);
        if (parsed.exams) setExams(parsed.exams);
        if (parsed.marks) setMarks(parsed.marks);
        if (parsed.timetable) setTimetable(parsed.timetable);
        if (parsed.homework) setHomework(parsed.homework);
        if (parsed.books) setBooks(parsed.books);
        if (parsed.bookIssues) setBookIssues(parsed.bookIssues);
        if (parsed.transportRoutes) setTransportRoutes(parsed.transportRoutes);
        if (parsed.notices) setNotices(parsed.notices);
        if (parsed.expenses) setExpenses(parsed.expenses);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (parsed.hostel) setHostel(parsed.hostel);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.attendanceRecords) setAttendanceRecords(parsed.attendanceRecords);
      }
    } catch (e) {
      console.error('Failed to load ABC ERP state from localStorage:', e);
    }
  }, []);

  // Sync to localStorage
  const persistState = (newState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to persist ABC ERP state:', e);
    }
  };

  const getFullState = () => ({
    schoolInfo,
    classes,
    subjects,
    students,
    staff,
    admissions,
    feeStructures,
    feeTransactions,
    exams,
    marks,
    timetable,
    homework,
    books,
    bookIssues,
    transportRoutes,
    notices,
    expenses,
    inventory,
    hostel,
    auditLogs,
    attendanceRecords
  });

  const switchRole = (newRoleId) => {
    setCurrentRoleId(newRoleId);
    localStorage.setItem('abc_current_role', newRoleId);
    logAudit('ROLE_SWITCH', `Switched view persona to ${newRoleId}`);
  };

  const logAudit = (action, details) => {
    const activeRole = ROLES.find(r => r.id === currentRoleId) || ROLES[0];
    const newLog = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: activeRole.user,
      role: activeRole.label,
      action,
      details,
      ipAddress: '192.168.1.101'
    };
    setAuditLogs(prev => {
      const updated = [newLog, ...prev.slice(0, 99)];
      return updated;
    });
  };

  // Student CRUD
  const addStudent = (studentData) => {
    const nextNum = students.length + 101;
    const newStudent = {
      ...studentData,
      id: `STU-${String(students.length + 1).padStart(3, '0')}`,
      admissionNo: studentData.admissionNo || `ABC/2026/0${nextNum}`,
      rollNo: studentData.rollNo || String(nextNum),
      admissionDate: studentData.admissionDate || new Date().toISOString().substring(0, 10),
      attendanceRate: studentData.attendanceRate || 100,
      feeStatus: studentData.feeStatus || 'Paid',
      pendingFeeAmount: Number(studentData.pendingFeeAmount) || 0,
      status: 'Active'
    };
    const updated = [newStudent, ...students];
    setStudents(updated);
    logAudit('STUDENT_ENROLLED', `Enrolled new student: ${newStudent.fullName} (${newStudent.admissionNo}) in ${newStudent.className}-${newStudent.section}`);
    persistState({ ...getFullState(), students: updated });
    return newStudent;
  };

  const updateStudent = (id, updatedFields) => {
    const updated = students.map(s => s.id === id ? { ...s, ...updatedFields } : s);
    setStudents(updated);
    logAudit('STUDENT_UPDATED', `Updated student profile for ID: ${id}`);
    persistState({ ...getFullState(), students: updated });
  };

  const deleteStudent = (id) => {
    const target = students.find(s => s.id === id);
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    logAudit('STUDENT_WITHDRAWN', `Withdrew student record: ${target ? target.fullName : id}`);
    persistState({ ...getFullState(), students: updated });
  };

  const promoteStudent = (id, newClass, newSection) => {
    const updated = students.map(s => {
      if (s.id === id) {
        return {
          ...s,
          className: newClass,
          section: newSection,
          academicHistory: [
            ...(s.academicHistory || []),
            { fromClass: s.className, toClass: newClass, promotedDate: new Date().toISOString().substring(0, 10), status: 'Promoted' }
          ]
        };
      }
      return s;
    });
    setStudents(updated);
    logAudit('STUDENT_PROMOTED', `Promoted student ${id} to ${newClass}-${newSection}`);
    persistState({ ...getFullState(), students: updated });
  };

  // Staff CRUD
  const addStaff = (staffData) => {
    const newStaff = {
      ...staffData,
      id: `EMP-${String(staff.length + 1).padStart(3, '0')}`,
      employeeCode: `ABC-EMP-${100 + staff.length + 1}`,
      joiningDate: staffData.joiningDate || new Date().toISOString().substring(0, 10),
      status: 'Active',
      experienceYears: Number(staffData.experienceYears) || 1,
      salaryMonthly: Number(staffData.salaryMonthly) || 45000,
      assignedSubjects: staffData.assignedSubjects || []
    };
    const updated = [newStaff, ...staff];
    setStaff(updated);
    logAudit('STAFF_HIRED', `Appointed faculty/staff: ${newStaff.fullName} (${newStaff.designation})`);
    persistState({ ...getFullState(), staff: updated });
    return newStaff;
  };

  const updateStaff = (id, updatedFields) => {
    const updated = staff.map(st => st.id === id ? { ...st, ...updatedFields } : st);
    setStaff(updated);
    logAudit('STAFF_UPDATED', `Updated staff record for ID: ${id}`);
    persistState({ ...getFullState(), staff: updated });
  };

  const deleteStaff = (id) => {
    const target = staff.find(st => st.id === id);
    const updated = staff.filter(st => st.id !== id);
    setStaff(updated);
    logAudit('STAFF_RELIEVED', `Relieved staff member: ${target ? target.fullName : id}`);
    persistState({ ...getFullState(), staff: updated });
  };

  // Admissions
  const addAdmission = (admissionData) => {
    const newAdm = {
      ...admissionData,
      id: `ADM-2026-${String(admissions.length + 1).padStart(3, '0')}`,
      submissionDate: new Date().toISOString().substring(0, 10),
      status: admissionData.status || 'Under Review',
      documentsAttached: admissionData.documentsAttached || ['Birth Certificate', 'Aadhar Card']
    };
    const updated = [newAdm, ...admissions];
    setAdmissions(updated);
    logAudit('ADMISSION_APPLIED', `Received admission application for ${newAdm.applicantName} (${newAdm.appliedClass})`);
    persistState({ ...getFullState(), admissions: updated });
    return newAdm;
  };

  const updateAdmissionStatus = (id, newStatus, remarks) => {
    const updated = admissions.map(a => a.id === id ? { ...a, status: newStatus, remarks: remarks || a.remarks } : a);
    setAdmissions(updated);
    logAudit('ADMISSION_STATUS_CHANGE', `Admission ${id} changed to ${newStatus}`);
    persistState({ ...getFullState(), admissions: updated });
  };

  const convertAdmissionToStudent = (admId, targetClass, targetSection) => {
    const adm = admissions.find(a => a.id === admId);
    if (!adm) return null;

    const newStudent = addStudent({
      fullName: adm.applicantName,
      gender: adm.gender,
      dob: adm.dob,
      bloodGroup: 'B+',
      className: targetClass || adm.appliedClass,
      section: targetSection || 'A',
      fatherName: adm.fatherName,
      fatherPhone: adm.fatherPhone,
      fatherOccupation: 'Business / Service',
      motherName: 'Mother',
      motherPhone: adm.fatherPhone,
      guardianEmail: adm.fatherEmail,
      address: 'Srinagar, Jammu & Kashmir',
      category: 'General',
      feeStatus: 'Paid',
      pendingFeeAmount: 0
    });

    updateAdmissionStatus(admId, 'Admitted', `Enrolled in ${newStudent.className}-${newStudent.section} (ID: ${newStudent.admissionNo})`);
    return newStudent;
  };

  // Fees
  const recordFeePayment = (txnData) => {
    const newTxn = {
      ...txnData,
      id: `TXN-2026-${Date.now().toString().slice(-4)}`,
      receiptNo: `REC-2026-${String(feeTransactions.length + 101).padStart(4, '0')}`,
      date: txnData.date || new Date().toISOString().substring(0, 10),
      status: 'Completed'
    };
    const updatedTxns = [newTxn, ...feeTransactions];
    setFeeTransactions(updatedTxns);

    // Update student fee status if studentId is provided
    if (txnData.studentId) {
      setStudents(prev => prev.map(s => {
        if (s.id === txnData.studentId) {
          const remainingDue = Math.max(0, (s.pendingFeeAmount || 0) - txnData.paidAmount);
          return {
            ...s,
            pendingFeeAmount: remainingDue,
            feeStatus: remainingDue === 0 ? 'Paid' : 'Partial'
          };
        }
        return s;
      }));
    }

    logAudit('FEE_COLLECTED', `Recorded fee payment ${newTxn.receiptNo} of ₹${txnData.paidAmount} for ${txnData.studentName}`);
    persistState({ ...getFullState(), feeTransactions: updatedTxns });
    return newTxn;
  };

  // Attendance
  const markAttendance = (date, className, section, recordsObj) => {
    const key = `${date}_${className}_${section}`;
    const updatedAttendance = {
      ...attendanceRecords,
      [key]: recordsObj
    };
    setAttendanceRecords(updatedAttendance);
    logAudit('ATTENDANCE_MARKED', `Marked student attendance for ${className}-${section} on ${date}`);
    persistState({ ...getFullState(), attendanceRecords: updatedAttendance });
  };

  // Notices
  const addNotice = (noticeData) => {
    const newNotice = {
      ...noticeData,
      id: `NOT-2026-${String(notices.length + 1).padStart(2, '0')}`,
      publishedDate: new Date().toISOString().substring(0, 10),
      isPinned: !!noticeData.isPinned
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    logAudit('NOTICE_PUBLISHED', `Published circular: ${newNotice.title}`);
    persistState({ ...getFullState(), notices: updated });
    return newNotice;
  };

  const deleteNotice = (id) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    logAudit('NOTICE_REMOVED', `Archived notice: ${id}`);
    persistState({ ...getFullState(), notices: updated });
  };

  // Library
  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: `BK-${1000 + books.length + 1}`,
      totalCopies: Number(bookData.totalCopies) || 1,
      issuedCopies: 0,
      availableCopies: Number(bookData.totalCopies) || 1
    };
    const updated = [newBook, ...books];
    setBooks(updated);
    logAudit('BOOK_ADDED', `Added book to catalog: ${newBook.title} by ${newBook.author}`);
    persistState({ ...getFullState(), books: updated });
    return newBook;
  };

  const issueBook = (issueData) => {
    const newIssue = {
      ...issueData,
      id: `ISS-2026-${String(bookIssues.length + 1).padStart(2, '0')}`,
      issueDate: new Date().toISOString().substring(0, 10),
      status: 'Issued',
      fineAmount: 0
    };
    const updatedIssues = [newIssue, ...bookIssues];
    setBookIssues(updatedIssues);

    // Decrement available copies in book catalog
    setBooks(prev => prev.map(b => {
      if (b.id === issueData.bookId) {
        return {
          ...b,
          issuedCopies: b.issuedCopies + 1,
          availableCopies: Math.max(0, b.availableCopies - 1)
        };
      }
      return b;
    }));

    logAudit('BOOK_ISSUED', `Issued book '${newIssue.bookTitle}' to ${newIssue.studentName}`);
    persistState({ ...getFullState(), bookIssues: updatedIssues });
    return newIssue;
  };

  const returnBook = (issueId) => {
    const issue = bookIssues.find(i => i.id === issueId);
    if (!issue) return;

    const returnDate = new Date().toISOString().substring(0, 10);
    const updatedIssues = bookIssues.map(i => i.id === issueId ? { ...i, status: 'Returned', returnDate } : i);
    setBookIssues(updatedIssues);

    // Increment available copies
    setBooks(prev => prev.map(b => {
      if (b.id === issue.bookId) {
        return {
          ...b,
          issuedCopies: Math.max(0, b.issuedCopies - 1),
          availableCopies: b.availableCopies + 1
        };
      }
      return b;
    }));

    logAudit('BOOK_RETURNED', `Returned book '${issue.bookTitle}' from ${issue.studentName}`);
    persistState({ ...getFullState(), bookIssues: updatedIssues });
  };

  // Homework
  const addHomework = (hwData) => {
    const newHw = {
      ...hwData,
      id: `HW-2026-${String(homework.length + 1).padStart(3, '0')}`,
      assignedDate: new Date().toISOString().substring(0, 10),
      submissionsCount: 0,
      totalStudents: 32,
      status: 'Active'
    };
    const updated = [newHw, ...homework];
    setHomework(updated);
    logAudit('HOMEWORK_POSTED', `Posted homework for ${newHw.className}-${newHw.section} (${newHw.subject})`);
    persistState({ ...getFullState(), homework: updated });
    return newHw;
  };

  // Finance - Expenses
  const addExpense = (expData) => {
    const newExp = {
      ...expData,
      id: `EXP-${100 + expenses.length + 1}`,
      date: expData.date || new Date().toISOString().substring(0, 10),
      amount: Number(expData.amount) || 0
    };
    const updated = [newExp, ...expenses];
    setExpenses(updated);
    logAudit('EXPENSE_RECORDED', `Recorded expense of ₹${newExp.amount} for ${newExp.title}`);
    persistState({ ...getFullState(), expenses: updated });
    return newExp;
  };

  // Inventory
  const addInventoryItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `INV-${100 + inventory.length + 1}`,
      quantity: Number(itemData.quantity) || 1,
      minThreshold: Number(itemData.minThreshold) || 5,
      status: Number(itemData.quantity) < Number(itemData.minThreshold) ? 'Low Stock' : 'Normal'
    };
    const updated = [newItem, ...inventory];
    setInventory(updated);
    logAudit('INVENTORY_ADDED', `Catalogued asset: ${newItem.itemName} (${newItem.quantity} ${newItem.unit})`);
    persistState({ ...getFullState(), inventory: updated });
    return newItem;
  };

  const updateInventoryStock = (id, newQuantity) => {
    const updated = inventory.map(item => {
      if (item.id === id) {
        const q = Number(newQuantity);
        return {
          ...item,
          quantity: q,
          status: q < item.minThreshold ? 'Low Stock' : 'Normal'
        };
      }
      return item;
    });
    setInventory(updated);
    logAudit('INVENTORY_STOCK_UPDATED', `Updated stock count for asset ID: ${id}`);
    persistState({ ...getFullState(), inventory: updated });
  };

  // Reset to Factory Demo Data
  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSchoolInfo(initialSchoolInfo);
    setClasses(initialClasses);
    setSubjects(initialSubjects);
    setStudents(initialStudents);
    setStaff(initialStaff);
    setAdmissions(initialAdmissions);
    setFeeStructures(initialFeeStructures);
    setFeeTransactions(initialFeeTransactions);
    setExams(initialExams);
    setMarks(initialMarks);
    setTimetable(initialTimetableSlots);
    setHomework(initialHomework);
    setBooks(initialBooks);
    setBookIssues(initialBookIssues);
    setTransportRoutes(initialTransportRoutes);
    setNotices(initialNotices);
    setExpenses(initialExpenses);
    setInventory(initialInventory);
    setHostel(initialHostel);
    setAuditLogs(initialAuditLogs);
    setAttendanceRecords({
      '2026-02-12_Class 10_A': {
        'STU-001': 'Present',
        'STU-002': 'Present',
        'STU-003': 'Present',
        'STU-004': 'Present'
      }
    });
    logAudit('SYSTEM_RESET', 'Restored all modules to pristine ABC School demo state.');
  };

  // Export full JSON backup
  const exportDatabase = () => {
    const dataStr = JSON.stringify(getFullState(), null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `abc_school_erp_backup_${new Date().toISOString().substring(0, 10)}.json`;
    link.click();
    logAudit('DATABASE_BACKUP', 'Exported comprehensive system backup archive.');
  };

  // Import JSON backup
  const importDatabase = (jsonText) => {
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed.students && parsed.staff) {
        setSchoolInfo(parsed.schoolInfo || initialSchoolInfo);
        setClasses(parsed.classes || initialClasses);
        setSubjects(parsed.subjects || initialSubjects);
        setStudents(parsed.students);
        setStaff(parsed.staff);
        setAdmissions(parsed.admissions || []);
        setFeeTransactions(parsed.feeTransactions || []);
        setExams(parsed.exams || []);
        setMarks(parsed.marks || []);
        setTimetable(parsed.timetable || []);
        setHomework(parsed.homework || []);
        setBooks(parsed.books || []);
        setBookIssues(parsed.bookIssues || []);
        setTransportRoutes(parsed.transportRoutes || []);
        setNotices(parsed.notices || []);
        setExpenses(parsed.expenses || []);
        setInventory(parsed.inventory || []);
        setHostel(parsed.hostel || []);
        setAuditLogs(parsed.auditLogs || []);
        setAttendanceRecords(parsed.attendanceRecords || {});
        persistState(parsed);
        logAudit('DATABASE_RESTORED', 'Successfully restored database from uploaded archive.');
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error importing JSON database:', e);
      return false;
    }
  };

  const currentRole = ROLES.find(r => r.id === currentRoleId) || ROLES[0];

  const value = {
    currentRoleId,
    currentRole,
    switchRole,
    rolesList: ROLES,
    schoolInfo,
    setSchoolInfo,
    classes,
    subjects,
    students,
    staff,
    admissions,
    feeStructures,
    feeTransactions,
    exams,
    marks,
    timetable,
    homework,
    books,
    bookIssues,
    transportRoutes,
    notices,
    expenses,
    inventory,
    hostel,
    auditLogs,
    attendanceRecords,
    addStudent,
    updateStudent,
    deleteStudent,
    promoteStudent,
    addStaff,
    updateStaff,
    deleteStaff,
    addAdmission,
    updateAdmissionStatus,
    convertAdmissionToStudent,
    recordFeePayment,
    markAttendance,
    addNotice,
    deleteNotice,
    addBook,
    issueBook,
    returnBook,
    addHomework,
    addExpense,
    addInventoryItem,
    updateInventoryStock,
    resetAllData,
    exportDatabase,
    importDatabase,
    logAudit
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error('useSchool must be used within a SchoolProvider');
  return ctx;
}
