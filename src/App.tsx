import { useState } from 'react';
import { UserDashboard } from './components/UserDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Menu, User, Building2, ShieldCheck } from 'lucide-react';

type ViewMode = 'user' | 'company' | 'admin';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('user');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-blue-600">리워드 플랫폼</h1>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('user')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                viewMode === 'user' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>사용자</span>
            </button>
            <button
              onClick={() => setViewMode('company')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                viewMode === 'company' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>기업</span>
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                viewMode === 'admin' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>관리자</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        {viewMode === 'user' && <UserDashboard isSidebarOpen={isSidebarOpen} />}
        {viewMode === 'company' && <CompanyDashboard isSidebarOpen={isSidebarOpen} />}
        {viewMode === 'admin' && <AdminDashboard isSidebarOpen={isSidebarOpen} />}
      </main>
    </div>
  );
}
