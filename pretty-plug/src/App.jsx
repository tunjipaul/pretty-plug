import { Routes, Route } from "react-router-dom";
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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/content" element={<AdminContent />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/clients" element={<AdminClients />} />
      <Route path="/admin/services" element={<AdminServices />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
}

export default App;
