import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Snacks from "./pages/Snacks";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid #ff6b35' },
      }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Snacks />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}