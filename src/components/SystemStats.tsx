import { useState } from 'react';
import { Users, Building2, Briefcase, Coins, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

export function SystemStats() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const overallStats = [
    { label: '총 사용자', value: '12,450', change: '+12%', trend: 'up', icon: Users, color: 'blue' },
    { label: '총 기업', value: '234', change: '+8%', trend: 'up', icon: Building2, color: 'green' },
    { label: '총 미션', value: '1,856', change: '+15%', trend: 'up', icon: Briefcase, color: 'purple' },
    { label: '총 거래액', value: '₩45.2M', change: '+23%', trend: 'up', icon: DollarSign, color: 'orange' },
  ];

  const missionStats = [
    { type: '설문조사', count: 1240, percentage: 67 },
    { type: '외주', count: 456, percentage: 25 },
    { type: '방문', count: 120, percentage: 6 },
    { type: '기타', count: 40, percentage: 2 },
  ];

  const monthlyData = [
    { month: '1월', users: 3240, companies: 89, missions: 234, revenue: 8500000 },
    { month: '2월', users: 4120, companies: 102, missions: 289, revenue: 10200000 },
    { month: '3월', users: 5340, companies: 118, missions: 345, revenue: 12800000 },
    { month: '4월', users: 6580, companies: 134, missions: 412, revenue: 15100000 },
    { month: '5월', users: 7820, companies: 156, missions: 498, revenue: 18500000 },
    { month: '6월', users: 8940, companies: 178, missions: 567, revenue: 21200000 },
    { month: '7월', users: 9850, companies: 195, missions: 634, revenue: 24300000 },
    { month: '8월', users: 10560, companies: 210, missions: 712, revenue: 27800000 },
    { month: '9월', users: 11240, companies: 220, missions: 789, revenue: 31500000 },
    { month: '10월', users: 11890, companies: 228, missions: 856, revenue: 35200000 },
    { month: '11월', users: 12450, companies: 234, missions: 923, revenue: 39100000 },
  ];

  const topUsers = [
    { name: '이철수', points: 15600, missions: 32, rank: 1 },
    { name: '홍길동', points: 12500, missions: 24, rank: 2 },
    { name: '김영희', points: 8900, missions: 18, rank: 3 },
    { name: '박민수', points: 7200, missions: 15, rank: 4 },
    { name: '정수진', points: 6800, missions: 14, rank: 5 },
  ];

  const topCompanies = [
    { name: '마케팅그룹', missions: 7, spent: 2100000, rank: 1 },
    { name: '테크컴퍼니', missions: 5, spent: 1250000, rank: 2 },
    { name: '디자인스튜디오', missions: 3, spent: 850000, rank: 3 },
  ];

  const performanceMetrics = [
    { label: '평균 미션 완료율', value: '87%', change: '+3%', trend: 'up' },
    { label: '평균 사용자 만족도', value: '4.6/5.0', change: '+0.2', trend: 'up' },
    { label: '일일 활성 사용자', value: '3,240', change: '+8%', trend: 'up' },
    { label: '평균 미션 참여 시간', value: '12분', change: '-2분', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">시스템 통계</h2>
          <p className="text-gray-600">플랫폼의 상세 통계와 성과를 확인하세요</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            주간
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            월간
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            연간
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats.map((stat) => {
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
                <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">성과 지표</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric) => (
            <div key={metric.label} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-gray-600 mb-2">{metric.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-gray-900">{metric.value}</div>
                <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{metric.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mission Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">미션 유형 분포</h3>
          <div className="space-y-4">
            {missionStats.map((stat) => (
              <div key={stat.type}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">{stat.type}</span>
                  <span className="text-gray-600">{stat.count}개 ({stat.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Users */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">상위 사용자</h3>
          <div className="space-y-3">
            {topUsers.map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    user.rank === 2 ? 'bg-gray-100 text-gray-600' :
                    user.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <div className="text-gray-900">{user.name}</div>
                    <div className="text-gray-600">{user.missions}개 미션 완료</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <Coins className="w-4 h-4" />
                  <span>{user.points.toLocaleString()}P</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">상위 기업</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topCompanies.map((company) => (
            <div key={company.rank} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  company.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                  company.rank === 2 ? 'bg-gray-100 text-gray-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {company.rank}
                </div>
                <div className="text-gray-900">{company.name}</div>
              </div>
              <div className="space-y-1 text-gray-600">
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  <span>{company.missions}개 미션</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>₩{company.spent.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Growth */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">월별 성장 추이</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600">월</th>
                <th className="px-4 py-3 text-right text-gray-600">사용자</th>
                <th className="px-4 py-3 text-right text-gray-600">기업</th>
                <th className="px-4 py-3 text-right text-gray-600">미션</th>
                <th className="px-4 py-3 text-right text-gray-600">거래액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyData.map((data) => (
                <tr key={data.month} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-900">{data.month}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{data.users.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{data.companies}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{data.missions}</td>
                  <td className="px-4 py-3 text-right text-gray-600">₩{(data.revenue / 1000000).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">수익 분석</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-blue-600 mb-2">총 거래액</div>
            <div className="text-blue-900">₩45,200,000</div>
            <div className="text-blue-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+23% 전월 대비</span>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-green-600 mb-2">플랫폼 수수료</div>
            <div className="text-green-900">₩4,520,000</div>
            <div className="text-green-600 mt-2">10% 수수료율</div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-purple-600 mb-2">지급된 리워드</div>
            <div className="text-purple-900">₩40,680,000</div>
            <div className="text-purple-600 mt-2">90% 사용자 지급</div>
          </div>
        </div>
      </div>
    </div>
  );
}
