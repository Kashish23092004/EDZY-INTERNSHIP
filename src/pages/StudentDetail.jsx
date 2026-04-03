import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import OrderModal from "../components/OrderModal";
import { ArrowLeft, ShoppingBag, IndianRupee, Tag, PlusCircle } from "lucide-react";

const AVATARS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80",
];

export default function StudentDetail() {
  const { id } = useParams();
  const { students, snacks, getStudentOrders, getStudentTotal } = useStore();
  const [orderSnack, setOrderSnack] = useState(null);

  const student = students.find((s) => String(s.id) === String(id));
  const orders = getStudentOrders(id);
  const total = getStudentTotal(id);
  const idx = students.findIndex((s) => String(s.id) === String(id));
  const avatar = AVATARS[Math.abs(idx) % AVATARS.length];

  if (!student) return (
    <div className="page">
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <p>Student not found.</p>
        <Link to="/students" className="back-link" style={{ marginTop: "12px" }}>
          <ArrowLeft size={14} /> Back to Students
        </Link>
      </div>
    </div>
  );

  return (
    <div className="page">
      <Link to="/students" className="back-link"><ArrowLeft size={14} /> Back</Link>
      <div className="detail-profile">
        <img src={avatar} alt={student.name} className="detail-avatar" />
        <div className="detail-info">
          <h1 className="detail-name">{student.name}</h1>
          <span className="detail-ref"><Tag size={12} /> {student.referralCode}</span>
          <div className="detail-stats">
            <div className="stat-pill"><ShoppingBag size={14} /> {orders.length} Orders</div>
            <div className="stat-pill accent"><IndianRupee size={14} /> {total.toFixed(0)} Spent</div>
          </div>
        </div>
      </div>
      <div className="quick-order-section">
        <h2 className="section-title">Place New Order</h2>
        <div className="quick-snack-row">
          {snacks.slice(0, 6).map((s) => (
            <button key={s.id} className="quick-snack-btn" onClick={() => setOrderSnack(s)}>
              <PlusCircle size={12} /> {s.name}
            </button>
          ))}
        </div>
      </div>
      <div className="orders-section">
        <h2 className="section-title">Order History</h2>
        {orders.length === 0 ? (
          <div className="empty-state small"><span>🛒</span><p>No orders yet.</p></div>
        ) : (
          <div className="orders-list">
            {orders.map((o, i) => {
              const snack = snacks.find((s) => String(s.id) === String(o.snackId));
              return (
                <div key={o.id || i} className="order-row">
                  <div className="order-icon">🍴</div>
                  <div className="order-details">
                    <span className="order-snack-name">{snack?.name || o.snackName || "Unknown"}</span>
                    <span className="order-qty">x{o.quantity}</span>
                  </div>
                  <span className="order-amount">₹{o.total}</span>
                </div>
              );
            })}
            <div className="order-total-row">
              <span>Total Spent</span>
              <span className="order-grand-total">₹{total}</span>
            </div>
          </div>
        )}
      </div>
      {orderSnack && <OrderModal snack={orderSnack} onClose={() => setOrderSnack(null)} />}
    </div>
  );
}