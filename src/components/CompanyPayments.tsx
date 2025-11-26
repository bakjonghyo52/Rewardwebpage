import { useState } from 'react';
import { CreditCard, Calendar, Download, Search, DollarSign, TrendingDown } from 'lucide-react';

interface Payment {
  id: number;
  missionTitle: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentMethod: string;
  participants: number;
}

export function CompanyPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const payments: Payment[] = [
    {
      id: 1,
      missionTitle: '제품 만족도 설문조사',
      amount: 117000,
      status: 'pending',
      date: '2025-11-26',
      paymentMethod: '신용카드',
      participants: 234,
    },
    {
      id: 2,
      missionTitle: '신규 서비스 UX 피드백',
      amount: 71200,
      status: 'pending',
      date: '2025-11-25',
      paymentMethod: '신용카드',
      participants: 89,
    },
    {
      id: 3,
      missionTitle: '브랜드 인지도 조사',
      amount: 300000,
      status: 'completed',
      date: '2025-11-25',
      paymentMethod: '계좌이체',
      participants: 500,
    },
    {
      id: 4,
      missionTitle: '로고 디자인 외주',
      amount: 150000,
      status: 'pending',
      date: '2025-11-24',
      paymentMethod: '신용카드',
      participants: 3,
    },
    {
      id: 5,
      missionTitle: '소비 트렌드 분석',
      amount: 31500,
      status: 'completed',
      date: '2025-11-20',
      paymentMethod: '신용카드',
      participants: 45,
    },
    {
      id: 6,
      missionTitle: '앱 사용성 테스트',
      amount: 250000,
      status: 'completed',
      date: '2025-11-18',
      paymentMethod: '계좌이체',
      participants: 250,
    },
    {
      id: 7,
      missionTitle: '고객 만족도 조사',
      amount: 180000,
      status: 'completed',
      date: '2025-11-15',
      paymentMethod: '신용카드',
      participants: 300,
    },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.missionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCompleted = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'failed': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return '완료';
      case 'pending': return '진행중';
      case 'failed': return '실패';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">결제 내역</h2>
        <p className="text-gray-600">미션 결제 및 정산 내역을 확인하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">총 지출</span>
            <div className="p-2 bg-purple-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="text-gray-900">₩{(totalCompleted + totalPending).toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">완료된 결제</span>
            <div className="p-2 bg-green-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-gray-900">₩{totalCompleted.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">진행중인 결제</span>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div className="text-gray-900">₩{totalPending.toLocaleString()}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="결제 내역 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              완료
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              진행중
            </button>
          </div>

          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>내보내기</span>
          </button>
        </div>
      </div>

      {/* Payment List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">미션명</th>
                <th className="px-6 py-3 text-left text-gray-600">참여자</th>
                <th className="px-6 py-3 text-left text-gray-600">결제 금액</th>
                <th className="px-6 py-3 text-left text-gray-600">결제 방법</th>
                <th className="px-6 py-3 text-left text-gray-600">날짜</th>
                <th className="px-6 py-3 text-left text-gray-600">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">
                    {payment.missionTitle}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {payment.participants}명
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    ₩{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{payment.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusLabel(payment.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다
          </div>
        )}
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">월별 지출 현황</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { month: '8월', amount: 850000, missions: 8 },
            { month: '9월', amount: 1240000, missions: 10 },
            { month: '10월', amount: 1680000, missions: 12 },
            { month: '11월', amount: 2450000, missions: 15 },
          ].map((data) => (
            <div key={data.month} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-gray-600 mb-2">{data.month}</div>
              <div className="text-gray-900 mb-1">₩{data.amount.toLocaleString()}</div>
              <div className="text-gray-600">{data.missions}개 미션</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">등록된 결제 수단</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-gray-900">신용카드</div>
                <div className="text-gray-600">**** **** **** 1234</div>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">주 결제수단</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="text-gray-900">계좌이체</div>
                <div className="text-gray-600">신한은행 ****-**-******</div>
              </div>
            </div>
          </div>

          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors">
            + 결제 수단 추가
          </button>
        </div>
      </div>
    </div>
  );
}
