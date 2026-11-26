const STORAGE_KEY = "case2_enrollments_v1";

const DEFAULT_ENROLLMENTS = [
  { id: 1, student_number: "2026-001", student_name: "Rene Baterbonia", course_name: "Web Systems and Technology", semester: "1st Semester 2026-2027", status: "Enrolled" },
  { id: 2, student_number: "2026-002", student_name: "Toni Fowler", course_name: "Web Systems and Technology", semester: "1st Semester 2026-2027", status: "Enrolled" },
  { id: 3, student_number: "2026-003", student_name: "Ariana Grande", course_name: "Web Systems and Technology", semester: "1st Semester 2026-2027", status: "Dropped" }
];

function getRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENROLLMENTS));
    return [...DEFAULT_ENROLLMENTS];
  }
  try { return JSON.parse(raw); } catch { return [...DEFAULT_ENROLLMENTS]; }
}
function saveRecords(records) { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function getRecordById(id) { return getRecords().find(r => Number(r.id) === Number(id)) || null; }
function addRecord(data) {
  const records = getRecords();
  const nextId = records.length ? Math.max(...records.map(r => Number(r.id))) + 1 : 1;
  records.push({ id: nextId, ...data });
  saveRecords(records);
}
function updateRecord(id, data) {
  saveRecords(getRecords().map(r => Number(r.id) === Number(id) ? { id: Number(id), ...data } : r));
}
function deleteRecord(id) {
  saveRecords(getRecords().filter(r => Number(r.id) !== Number(id)));
}
function resetSampleData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENROLLMENTS)); }
