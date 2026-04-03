import { useState } from "react";
import OrderModal from "./OrderModal";
import { ShoppingCart, Star } from "lucide-react";

const FALLBACKS = {
  "Masala Fries": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80",
  "Veg Burger": "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&q=80",
  "Cold Coffee": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  "Paneer Roll": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80",
  "Samosa": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  "Mango Shake": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80",
};

export default function SnackCard({ snack }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError
    ? FALLBACKS[snack.name] || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
    : snack.image + "?w=400&q=80";

  return (
    <>
      <div className="snack-card">
        <div className="snack-img-wrap">
          <img src={imgSrc} alt={snack.name} className="snack-img" onError={() => setImgError(true)} />
          <div className="snack-badge"><Star size={10} fill="currentColor" /> Popular</div>
          <div className="snack-overlay" />
        </div>
        <div className="snack-body">
          <div className="snack-meta">
            <h2 className="snack-name">{snack.name}</h2>
            <span className="snack-orders">🔥 {snack.ordersCount || 0} orders</span>
          </div>
          <div className="snack-footer">
            <span className="snack-price">₹{snack.price}</span>
            <button onClick={() => setOpen(true)} className="order-btn">
              <ShoppingCart size={14} /> Order Now
            </button>
          </div>
        </div>
      </div>
      {open && <OrderModal snack={snack} onClose={() => setOpen(false)} />}
    </>
  );
}