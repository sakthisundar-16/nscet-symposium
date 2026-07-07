import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import Registration from './pages/Registration';
import AdminDashboard from './pages/admin/Dashboard';
import CoordinatorDashboard from './pages/coordinator/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20"> {/* pt-20 for sticky navbar offset */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/coordinator" element={<CoordinatorDashboard />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
