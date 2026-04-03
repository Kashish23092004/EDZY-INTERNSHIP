import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Tag, IndianRupee, ChevronRight } from "lucide-react";

const AVATARS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80",
];

export default function StudentCard({ student, index }) {
  const { getStudentTotal, getStudentOrders } = useStore();
  const total = getStudentTotal(student.id);
  const orderCount = getStudentOrders(student.id).length;
  const avatar = AVATARS[index % AVATARS.length];

  return (
    <div className="student-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="student-avatar-wrap">
        <img src={avatar} alt={student.name} className="student-avatar" />
        <div className="student-status" />
      </div>
      <div className="student-info">
        <h3 className="student-name">{student.name}</h3>
        <div className="student-meta">
          <span className="ref-badge"><Tag size={10} /> {student.referralCode}</span>
          <span className="order-count">{orderCount} orders</span>
        </div>
        <div className="student-spent"><IndianRupee size={12} /><span>{total.toFixed(0)} spent</span></div>
      </div>
      <Link to={`/student/${student.id}`} className="view-btn">
        View <ChevronRight size={14} />
      </Link>
    </div>
  );
}