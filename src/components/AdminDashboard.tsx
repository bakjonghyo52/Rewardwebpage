import { useState } from 'react';
import { UserManagement } from './UserManagement';
import { CompanyManagement } from './CompanyManagement';
import { SystemStats } from './SystemStats';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BarChart3,
  UserCheck,
  Briefcase,
  Coins,
  TrendingUp
} from 'lucide-react';

type AdminPage = 'overview' | 'users' | 'companies' | 'stats';

interface AdminDashboardProps {
  isSidebarOpen: boolean;
}

export function AdminDashboard({ isSidebarOpen }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('overview');

  const menuItems = [
    { id: 'overview' as AdminPage, icon: LayoutDashboard, label: '대시보드' },
    { id: 'users' as AdminPage, icon: Users, label: '사용자 관리' },
    { id: 'companies' as AdminPage, icon: Building2, label: '기업 관리' },
    { id: 'stats' as AdminPage, icon: BarChart3, label: '시스템 통계' },
  ];

  const stats = [
    { label: '총 사용자', value: '12,450', change: '+12%', icon: Users, color: 'blue' },
    { label: '총 기업', value: '234', change: '+8%', icon: Building2, color: 'green' },
    { label: '활성 미션', value: '156', change: '+15%', icon: Briefcase, color: 'purple' },
    { label: '총 거래액', value: '₩45.2M', change: '+23%', icon: Coins, color: 'orange' },
  ];

  const recentActivities = [
    { type: 'user', action: '신규 사용자 가입', detail: 'user@example.com', time: '5분 전' },
    { type: 'company', action: '기업 미션 생성', detail: '제품 만족도 조사', time: '12분 전' },
    { type: 'mission', action: '미션 완료', detail: '브랜드 인지도 조사', time: '25분 전' },
    { type: 'payment', action: '결제 완료', detail: '₩300,000', time: '1시간 전' },
    { type: 'user', action: '프로필 완성', detail: 'newuser@example.com', time: '2시간 전' },
  ];

  const topMissions = [
    { title: '제품 만족도 설문조사', participants: 234, company: '테크컴퍼니' },
    { title: '신규 서비스 UX 피드백', participants: 189, company: '디자인스튜디오' },
    { title: '브랜드 인지도 조사', participants: 156, company: '마케팅그룹' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentPage === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-gray-900 mb-1">관리자 대시보드</h2>
              <p className="text-gray-600">플랫폼 전체 현황을 한눈에 확인하세요</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600',
                  green: 'bg-green-50 text-green-600',
                  purple: 'bg-purple-50 text-purple-600',
                  orange: 'bg-orange-50 text-orange-600',
                };
                return (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600">{stat.label}</span>
                      <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-gray-900">{stat.value}</div>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">최근 활동</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'user' ? 'bg-blue-50' :
                        activity.type === 'company' ? 'bg-green-50' :
                        activity.type === 'mission' ? 'bg-purple-50' : 'bg-orange-50'
                      }`}>
                        {activity.type === 'user' && <UserCheck className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'company' && <Building2 className="w-4 h-4 text-green-600" />}
                        {activity.type === 'mission' && <Briefcase className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'payment' && <Coins className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-900">{activity.action}</div>
                        <div className="text-gray-600">{activity.detail}</div>
                      </div>
                      <div className="text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Missions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">인기 미션</h3>
                <div className="space-y-4">
                  {topMissions.map((mission, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{mission.title}</h4>
                          <p className="text-gray-600">{mission.company}</p>
                        </div>
                        <div className="text-blue-600 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{mission.participants}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">월별 성장 추이</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { month: '8월', users: 8240, companies: 180, missions: 98 },
                  { month: '9월', users: 9450, companies: 195, missions: 112 },
                  { month: '10월', users: 10850, companies: 215, missions: 134 },
                  { month: '11월', users: 12450, companies: 234, missions: 156 },
                ].map((data) => (
                  <div key={data.month} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-gray-600 mb-2">{data.month}</div>
                    <div className="space-y-1">
                      <div className="text-gray-900">{data.users.toLocaleString()} 사용자</div>
                      <div className="text-gray-600">{data.companies} 기업</div>
                      <div className="text-gray-600">{data.missions} 미션</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setCurrentPage('users')}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all text-left"
              >
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="text-gray-900 mb-1">사용자 관리</h4>
                <p className="text-gray-600">사용자 정보를 관리하세요</p>
              </button>

              <button
                onClick={() => setCurrentPage('companies')}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all text-left"
              >
                <Building2 className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="text-gray-900 mb-1">기업 관리</h4>
                <p className="text-gray-600">기업 계정을 관리하세요</p>
              </button>

              <button
                onClick={() => setCurrentPage('stats')}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all text-left"
              >
                <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="text-gray-900 mb-1">시스템 통계</h4>
                <p className="text-gray-600">상세 통계를 확인하세요</p>
              </button>
            </div>
          </div>
        )}

        {currentPage === 'users' && <UserManagement />}
        {currentPage === 'companies' && <CompanyManagement />}
        {currentPage === 'stats' && <SystemStats />}
      </div>
    </div>
  );
}
