import { useState } from 'react';
import { Users, FileText, CheckCircle, Download, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // In a real app, check context/session
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [registrations, setRegistrations] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard.php?t=' + new Date().getTime(), {
        credentials: 'include',
        cache: 'no-store'
      });
      const json = await res.json();
      console.log('Dashboard Data API Response:', json);
      if (json && json.success) {
        setStats(json.stats);
        setRegistrations(json.registrations || []);
      } else {
        console.error('API Error:', json.message);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/update_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: new URLSearchParams({ id: id.toString(), status }) as any
      });
      const json = await res.json();
      if (json.success) {
        fetchDashboardData();
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  const exportToExcel = () => {
    if (registrations.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ['Reg ID', 'Name', 'College', 'Email', 'Mobile', 'Team Size', 'Team Members', 'Events', 'Txn ID', 'Status'];
    const csvRows = registrations.map(reg => [
      `"${reg.reg_no}"`,
      `"${reg.name}"`,
      `"${reg.college}"`,
      `"${reg.email}"`,
      `"${reg.phone}"`,
      `"${reg.team_size || 1}"`,
      `"${reg.team_members || ''}"`,
      `"${reg.registered_events || ''}"`,
      `"${reg.tx_id || ''}"`,
      `"${reg.status}"`
    ].join(','));
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Registrations_Export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    if (registrations.length === 0) {
      alert("No data to export");
      return;
    }
    import('jspdf').then(({ default: jsPDF }) => {
      import('jspdf-autotable').then(({ default: autoTable }) => {
        const doc = new jsPDF('landscape');
        doc.text("Registrations Report", 14, 15);
        const tableColumn = ["Reg ID", "Name", "College", "Email", "Mobile", "Team", "Members", "Events", "Txn ID", "Status"];
        const tableRows = registrations.map(reg => [
          reg.reg_no,
          reg.name,
          reg.college,
          reg.email,
          reg.phone,
          reg.team_size || 1,
          reg.team_members || '',
          reg.registered_events || '',
          reg.tx_id || '',
          reg.status
        ]);
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [41, 128, 185] }
        });
        doc.save(`Registrations_Report_${new Date().getTime()}.pdf`);
      });
    });
  };

  // Mock login for now
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Call backend API for authentication
    fetch('/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include',
      body: new URLSearchParams({ username, password, type: 'admin' }) as any
    }).then(async (res) => {
      const json = await res.json();
      if (json && json.success) {
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        alert(json.message || 'Invalid credentials');
      }
    }).catch(() => {
      alert('Login failed. Check server.');
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 text-sm mt-2">Authorized personnel only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg p-3" 
                value={username} onChange={e => setUsername(e.target.value)} required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full border border-gray-300 rounded-lg p-3" 
                value={password} onChange={e => setPassword(e.target.value)} required 
              />
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white p-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Admin Portal</h2>
            <p className="text-xs text-gray-500">Superadmin Access</p>
          </div>
          <div className="p-4 space-y-2 flex-1">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center p-3 rounded-lg text-sm font-medium ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FileText size={18} className="mr-3" /> Dashboard
            </button>
            <button onClick={() => setActiveTab('payments')} className={`w-full flex items-center p-3 rounded-lg text-sm font-medium ${activeTab === 'payments' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
              <CheckCircle size={18} className="mr-3" /> Payments
            </button>
            <button onClick={() => setActiveTab('participants')} className={`w-full flex items-center p-3 rounded-lg text-sm font-medium ${activeTab === 'participants' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Users size={18} className="mr-3" /> Participants
            </button>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button onClick={() => setIsAuthenticated(false)} className="w-full text-center text-sm text-red-500 font-medium p-2 hover:bg-red-50 rounded-lg">
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <div className="flex space-x-3">
              <button onClick={fetchDashboardData} className="flex items-center text-sm bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                Refresh Data
              </button>
              <button onClick={exportToExcel} className="flex items-center text-sm bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                <Download size={16} className="mr-2" /> Export Excel
              </button>
              <button onClick={exportToPDF} className="flex items-center text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                <Download size={16} className="mr-2" /> Export PDF
              </button>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Registrations</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-yellow-600 text-sm font-medium mb-2">Pending Payments</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-green-600 text-sm font-medium mb-2">Approved</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-red-600 text-sm font-medium mb-2">Rejected</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="p-4 font-medium border-b border-gray-200">Reg ID</th>
                    <th className="p-4 font-medium border-b border-gray-200">Name</th>
                    <th className="p-4 font-medium border-b border-gray-200">College</th>
                    <th className="p-4 font-medium border-b border-gray-200">Email</th>
                    <th className="p-4 font-medium border-b border-gray-200">Mobile</th>
                    <th className="p-4 font-medium border-b border-gray-200">Team</th>
                    <th className="p-4 font-medium border-b border-gray-200">Events</th>
                    <th className="p-4 font-medium border-b border-gray-200">Txn ID</th>
                    <th className="p-4 font-medium border-b border-gray-200">Status</th>
                    <th className="p-4 font-medium border-b border-gray-200">Action</th>
                  </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {registrations.map((reg: any) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{reg.reg_no}</td>
                    <td className="p-4 text-gray-600">{reg.name}</td>
                    <td className="p-4 text-gray-600">{reg.college}</td>
                    <td className="p-4 text-gray-600">{reg.email}</td>
                    <td className="p-4 text-gray-600">{reg.phone}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-medium">{reg.team_size || 1} Member(s)</span>
                        {reg.team_members && <span className="text-gray-500 text-xs truncate max-w-[120px]" title={reg.team_members}>{reg.team_members}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <button onClick={() => alert(`Registered Events for ${reg.name}:\n\n${reg.registered_events || 'None'}`)} className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-200 font-medium transition-colors">
                        View Events
                      </button>
                    </td>
                    <td className="p-4 text-gray-600 font-mono text-xs">{reg.tx_id}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : reg.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-4 flex space-x-2">
                      {reg.screenshot_path && (
                        <button onClick={() => window.open(`/assets/uploads/${reg.screenshot_path}`, '_blank')} className="text-blue-600 hover:text-blue-800">View</button>
                      )}
                      <button onClick={() => handleUpdateStatus(reg.id, 'approved')} className="text-green-600 hover:text-green-800">Approve</button>
                      <button onClick={() => handleUpdateStatus(reg.id, 'rejected')} className="text-red-600 hover:text-red-800">Reject</button>
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-gray-500">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
