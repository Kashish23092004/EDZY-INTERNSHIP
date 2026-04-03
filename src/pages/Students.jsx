import { useEffect, useState } from "react";
import { getStudents } from "../api/api";
import { useStore } from "../store/useStore";
import StudentCard from "../components/StudentCard";
import CreateStudent from "../components/CreateStudent";
import { Users } from "lucide-react";
export default function Students() {
  const { students, setStudents } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStudents()
      .then((res) => {
        if (res.data.length > 0) {
          const apiIds = res.data.map((s) => s.id);
          const localOnly = students.filter((s) => !apiIds.includes(s.id));
          setStudents([...res.data, ...localOnly]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Users size={28} /> Students</h1>
          <p className="page-sub">{students.length} registered students</p>
        </div>
      </div>
      <div className="students-layout">
        <div className="create-section">
          <h2 className="section-title">Add New Student</h2>
          <CreateStudent />
        </div>
        <div className="student-list-section">
          {loading ? (
            <div className="loading-list">
              {[1,2,3].map((i) => <div key={i} className="skeleton-student" />)}
            </div>
          ) : students.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎓</span>
              <p>No students yet. Add your first one!</p>
            </div>
          ) : (
            students.map((s, i) => <StudentCard key={s.id} student={s} index={i} />)
          )}
        </div>
      </div>
    </div>
  );
}
