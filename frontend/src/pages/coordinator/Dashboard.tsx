import { useState } from 'react';
import { CheckCircle, Search, LogOut } from 'lucide-react';

const CoordinatorDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    if (username === 'prathap' && password === 'coord123') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Coordinator Login</h2>
            <p className="text-gray-500 text-sm mt-2">Manage your assigned events</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg p-3" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className="w-full border border-gray-300 rounded-lg p-3" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Access Event Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Coordinator</h1>
            <p className="text-gray-500 mt-1">Welcome, Mr. Prathap | Event: Paper Presentation</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors">
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search participants..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
            </div>
            <div className="flex space-x-3">
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">
                Download List
              </button>
            </div>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-gray-200">Reg ID</th>
                <th className="p-4 font-medium border-b border-gray-200">Name</th>
                <th className="p-4 font-medium border-b border-gray-200">College</th>
                <th className="p-4 font-medium border-b border-gray-200 text-center">Attendance</th>
                <th className="p-4 font-medium border-b border-gray-200 text-center">Mark Winner</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">SYN26000{item}</td>
                  <td className="p-4 text-gray-600">Participant {item}</td>
                  <td className="p-4 text-gray-600">NSCET</td>
                  <td className="p-4 text-center">
                    <button className="text-gray-400 hover:text-green-700 transition-colors">
                      <CheckCircle size={22} className="mx-auto" />
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <select className="border border-gray-300 rounded p-1 text-xs">
                      <option value="">--</option>
                      <option value="1">1st Place</option>
                      <option value="2">2nd Place</option>
                      <option value="3">3rd Place</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default CoordinatorDashboard;
