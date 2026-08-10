import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQ from "./pages/FAQ";
import Portfolio from "./pages/Portfolio";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminClients from "./pages/AdminClients";
import AdminServices from "./pages/AdminServices";
import AdminSettings from "./pages/AdminSettings";
import AdminContent from "./pages/AdminContent";
import AdminGallery from "./pages/AdminGallery";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminFAQ from "./pages/AdminFAQ";
import AdminLogin from "./pages/AdminLogin";

function RequireAdmin({ children }) {
  const location = useLocation();
  const isAuthenticated =
    window.localStorage.getItem("theprettyplug_admin_session") === "active";

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/services" element={<Services />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/book/confirm" element={<BookingConfirmation />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
      <Route path="/admin/content" element={<RequireAdmin><AdminContent /></RequireAdmin>} />
      <Route path="/admin/gallery" element={<RequireAdmin><AdminGallery /></RequireAdmin>} />
      <Route path="/admin/testimonials" element={<RequireAdmin><AdminTestimonials /></RequireAdmin>} />
      <Route path="/admin/faq" element={<RequireAdmin><AdminFAQ /></RequireAdmin>} />
      <Route path="/admin/bookings" element={<RequireAdmin><AdminBookings /></RequireAdmin>} />
      <Route path="/admin/clients" element={<RequireAdmin><AdminClients /></RequireAdmin>} />
      <Route path="/admin/services" element={<RequireAdmin><AdminServices /></RequireAdmin>} />
      <Route path="/admin/settings" element={<RequireAdmin><AdminSettings /></RequireAdmin>} />
    </Routes>
  );
}

export default App;
