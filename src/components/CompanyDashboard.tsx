import { useState } from 'react';
import { CreateMission } from './CreateMission';
import { MissionManagement } from './MissionManagement';
import { CompanyPayments } from './CompanyPayments';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListChecks, 
  CreditCard,
  Users,
  TrendingUp,
  CheckCircle,
  DollarSign
} from 'lucide-react';

type CompanyPage = 'overview' | 'create' | 'manage' | 'payments';

interface CompanyDashboardProps {
  isSidebarOpen: boolean;
}

export function CompanyDashboard({ isSidebarOpen }: CompanyDashboardProps) {
  const [currentPage, setCurrentPage] = useState<CompanyPage>('overview');

  const menuItems = [
    { id: 'overview' as CompanyPage, icon: LayoutDashboard, label: '대시보드' },
    { id: 'create' as CompanyPage, icon: PlusCircle, label: '미션 생성' },
    { id: 'manage' as CompanyPage, icon: ListChecks, label: '미션 관리' },
    { id: 'payments' as CompanyPage, icon: CreditCard, label: '결제 내역' },
  ];

  const stats = [
    { label: '활성 미션', value: '12', icon: ListChecks, color: 'blue' },
    { label: '총 참여자', value: '3,240', icon: Users, color: 'green' },
    { label: '완료율', value: '87%', icon: CheckCircle, color: 'purple' },
    { label: '총 지출', value: '₩2,450,000', icon: DollarSign, color: 'orange' },
  ];

  const recentMissions = [
    {
      id: 1,
      title: '제품 만족도 설문조사',
      type: '설문조사',
      participants: 234,
      target: 500,
      status: '진행중',
      endDate: '2025-11-30',
    },
    {
      id: 2,
      title: '신규 서비스 UX 피드백',
      type: '설문조사',
      participants: 89,
      target: 100,
      status: '진행중',
      endDate: '2025-11-28',
    },
    {
      id: 3,
      title: '브랜드 인지도 조사',
      type: '설문조사',
      participants: 500,
      target: 500,
      status: '완료',
      endDate: '2025-11-25',
    },
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
              <h2 className="text-gray-900 mb-1">기업 대시보드</h2>
              <p className="text-gray-600">미션 현황을 한눈에 확인하세요</p>
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
                    <div className="text-gray-900">{stat.value}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent Missions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">최근 미션</h3>
                <button
                  onClick={() => setCurrentPage('create')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  새 미션 생성
                </button>
              </div>

              <div className="space-y-3">
                {recentMissions.map((mission) => (
                  <div key={mission.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-gray-900 mb-1">{mission.title}</h4>
                        <p className="text-gray-600">{mission.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full ${
                        mission.status === '완료' 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {mission.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{mission.participants} / {mission.target}</span>
                        </div>
                        <div>마감: {mission.endDate}</div>
                      </div>
                      
                      <div className="w-24">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(mission.participants / mission.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">월별 미션 성과</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { month: '8월', missions: 8, participants: 1240 },
                  { month: '9월', missions: 10, participants: 1850 },
                  { month: '10월', missions: 12, participants: 2340 },
                  { month: '11월', missions: 15, participants: 3240 },
                ].map((data) => (
                  <div key={data.month} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-gray-600 mb-2">{data.month}</div>
                    <div className="text-gray-900 mb-1">{data.missions}개 미션</div>
                    <div className="text-gray-600">{data.participants.toLocaleString()}명</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setCurrentPage('create')}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all text-left"
              >
                <PlusCircle className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="text-gray-900 mb-1">새 미션 생성</h4>
                <p className="text-gray-600">설문조사나 외주를 의뢰하세요</p>
              </button>

              <button
                onClick={() => setCurrentPage('manage')}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all text-left"
              >
                <ListChecks className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="text-gray-900 mb-1">미션 관리</h4>
                <p className="text-gray-600">진행중인 미션을 관리하세요</p>
              </button>

              <button
                onClick={() => setCurrentPage('payments')}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all text-left"
              >
                <CreditCard className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="text-gray-900 mb-1">결제 내역</h4>
                <p className="text-gray-600">결제 및 정산 내역을 확인하세요</p>
              </button>
            </div>
          </div>
        )}

        {currentPage === 'create' && <CreateMission />}
        {currentPage === 'manage' && <MissionManagement />}
        {currentPage === 'payments' && <CompanyPayments />}
      </div>
    </div>
  );
}
