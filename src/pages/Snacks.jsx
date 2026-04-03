import { useEffect, useState } from "react";
import { getSnacks } from "../api/api";
import { useStore } from "../store/useStore";
import SnackCard from "../components/SnackCard";
import { ChefHat } from "lucide-react";

const MOCK_SNACKS = [
  { id: 1, name: "Masala Fries", price: 40, ordersCount: 128, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d" },
  { id: 2, name: "Veg Burger", price: 65, ordersCount: 96, image: "https://images.unsplash.com/photo-1586816001966-79b736744398" },
  { id: 3, name: "Cold Coffee", price: 45, ordersCount: 214, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" },
  { id: 4, name: "Paneer Roll", price: 55, ordersCount: 73, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8" },
  { id: 5, name: "Samosa", price: 20, ordersCount: 341, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
  { id: 6, name: "Mango Shake", price: 50, ordersCount: 187, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4" },
];

export default function Snacks() {
  const { snacks, setSnacks } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSnacks()
      .then((res) => { setSnacks(res.data.length ? res.data : MOCK_SNACKS); setError(null); })
      .catch(() => { setSnacks(MOCK_SNACKS); setError("Using demo data (API offline)"); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title"><ChefHat size={28} /> Today's Menu</h1>
          <p className="page-sub">Fresh picks from the canteen 🔥</p>
        </div>
        {error && <div className="demo-badge">{error}</div>}
      </div>
      {loading ? (
        <div className="loading-grid">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img" />
              <div className="skeleton-body">
                <div className="skeleton-line w-60" />
                <div className="skeleton-line w-40" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="snack-grid">
          {snacks.map((s) => <SnackCard key={s.id} snack={s} />)}
        </div>
      )}
    </div>
  );
}