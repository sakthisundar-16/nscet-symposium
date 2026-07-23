import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import AdminDashboard from './pages/admin/Dashboard';
import CoordinatorDashboard from './pages/coordinator/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20"> {/* pt-20 for sticky navbar offset */}
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/coordinator" element={<CoordinatorDashboard />} />
              {/* Fallback to root for any other old paths */}
              <Route path="*" element={<MainPage />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
