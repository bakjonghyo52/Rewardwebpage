import { useState } from 'react';
import { MissionList } from './MissionList';
import { RewardHistory } from './RewardHistory';
import { PointExchange } from './PointExchange';
import { UserProfile } from './UserProfile';
import { 
  Home, 
  ListChecks, 
  History, 
  Coins, 
  User,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';

type UserPage = 'overview' | 'missions' | 'history' | 'exchange' | 'profile';

interface UserDashboardProps {
  isSidebarOpen: boolean;
}

export function UserDashboard({ isSidebarOpen }: UserDashboardProps) {
  const [currentPage, setCurrentPage] = useState<UserPage>('overview');
  const [userPoints, setUserPoints] = useState(12500);

  const menuItems = [
    { id: 'overview' as UserPage, icon: Home, label: '대시보드' },
    { id: 'missions' as UserPage, icon: ListChecks, label: '미션' },
    { id: 'history' as UserPage, icon: History, label: '리워드 내역' },
    { id: 'exchange' as UserPage, icon: Coins, label: '포인트 사용' },
    { id: 'profile' as UserPage, icon: User, label: '프로필' },
  ];

  const stats = [
    { label: '보유 포인트', value: userPoints.toLocaleString(), icon: Coins, color: 'blue' },
    { label: '완료한 미션', value: '24', icon: CheckCircle2, color: 'green' },
    { label: '이번 달 획득', value: '5,200', icon: TrendingUp, color: 'purple' },
    { label: '달성률', value: '85%', icon: Award, color: 'orange' },
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
              <h2 className="text-gray-900 mb-1">대시보드</h2>
              <p className="text-gray-600">리워드 활동을 한눈에 확인하세요</p>
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

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">추천 미션</h3>
              <div className="space-y-3">
                {[
                  { title: '일일 방문 체크인', points: 100, type: '방문' },
                  { title: '제품 만족도 설문조사', points: 500, type: '설문' },
                  { title: '프로필 완성하기', points: 300, type: '프로필' },
                ].map((mission, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <div className="text-gray-900">{mission.title}</div>
                      <div className="text-gray-600">{mission.type}</div>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Coins className="w-4 h-4" />
                      <span>{mission.points}P</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">최근 활동</h3>
              <div className="space-y-4">
                {[
                  { action: '설문조사 완료', points: 500, date: '2025-11-26 14:30' },
                  { action: '외주 매칭 완료', points: 1000, date: '2025-11-25 10:15' },
                  { action: '별점 제공', points: 200, date: '2025-11-24 16:45' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div>
                      <div className="text-gray-900">{activity.action}</div>
                      <div className="text-gray-500">{activity.date}</div>
                    </div>
                    <div className="text-green-600">+{activity.points}P</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'missions' && <MissionList onPointsEarned={(points) => setUserPoints(prev => prev + points)} />}
        {currentPage === 'history' && <RewardHistory />}
        {currentPage === 'exchange' && <PointExchange currentPoints={userPoints} onPointsUsed={(points) => setUserPoints(prev => prev - points)} />}
        {currentPage === 'profile' && <UserProfile />}
      </div>
    </div>
  );
}
