import { useState } from "react";
import { createOrder } from "../api/api";
import { useStore } from "../store/useStore";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderModal({ snack, onClose }) {
  const { students, addOrder } = useStore();
  const [studentId, setStudentId] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!studentId) return toast.error("Please select a student!");
    const order = {
      id: Date.now(),
      studentId,
      snackId: snack.id,
      snackName: snack.name,
      quantity: qty,
      total: snack.price * qty,
      createdAt: new Date().toISOString(),
    };
    setLoading(true);
    try { await createOrder(order); } catch {}
    addOrder(order);
    toast.success(`Order placed! ₹${order.total}`);
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        <div className="modal-header">
          <div className="modal-snack-img-wrap">
            <img src={snack.image + "?w=200&q=80"} alt={snack.name} className="modal-snack-img"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80"; }} />
          </div>
          <div>
            <h2 className="modal-title">{snack.name}</h2>
            <p className="modal-price">₹{snack.price} per item</p>
          </div>
        </div>
        <div className="modal-body">
          <label className="form-label">Select Student</label>
          <select className="form-select" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
            <option value="">-- Choose a student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.referralCode})</option>
            ))}
          </select>
          {students.length === 0 && <p className="form-hint">No students yet. Add one on the Students page!</p>}
          <label className="form-label" style={{ marginTop: "16px" }}>Quantity (1–5)</label>
          <div className="qty-control">
            <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} /></button>
            <span className="qty-display">{qty}</span>
            <button className="qty-btn" onClick={() => setQty((q) => Math.min(5, q + 1))}><Plus size={14} /></button>
          </div>
          <div className="modal-total">
            <span>Total</span>
            <span className="modal-total-amt">₹{snack.price * qty}</span>
          </div>
          <button className="place-order-btn" onClick={handleOrder} disabled={loading}>
            <ShoppingBag size={16} />
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}