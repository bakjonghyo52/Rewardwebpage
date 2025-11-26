import { useState } from 'react';
import { Calendar, Coins, TrendingUp, TrendingDown, Download, Search } from 'lucide-react';

type TransactionType = 'earn' | 'spend';

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export function RewardHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | TransactionType>('all');
  
  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'earn',
      amount: 500,
      description: '제품 만족도 설문조사 완료',
      date: '2025-11-26',
      category: '설문조사',
    },
    {
      id: 2,
      type: 'earn',
      amount: 1000,
      description: '디자인 외주 매칭 완료',
      date: '2025-11-25',
      category: '외주',
    },
    {
      id: 3,
      type: 'spend',
      amount: 3000,
      description: '현금 환전',
      date: '2025-11-24',
      category: '환전',
    },
    {
      id: 4,
      type: 'earn',
      amount: 200,
      description: '개발자 별점 제공',
      date: '2025-11-24',
      category: '별점',
    },
    {
      id: 5,
      type: 'earn',
      amount: 300,
      description: '프로필 완성',
      date: '2025-11-23',
      category: '프로필',
    },
    {
      id: 6,
      type: 'earn',
      amount: 100,
      description: '일일 방문 체크인',
      date: '2025-11-23',
      category: '방문',
    },
    {
      id: 7,
      type: 'spend',
      amount: 1500,
      description: '설문조사 의뢰',
      date: '2025-11-22',
      category: '의뢰',
    },
    {
      id: 8,
      type: 'earn',
      amount: 800,
      description: '소비자 트렌드 설문 완료',
      date: '2025-11-22',
      category: '설문조사',
    },
    {
      id: 9,
      type: 'earn',
      amount: 1500,
      description: '콘텐츠 작성 외주 완료',
      date: '2025-11-21',
      category: '외주',
    },
    {
      id: 10,
      type: 'spend',
      amount: 5000,
      description: '현금 환전',
      date: '2025-11-20',
      category: '환전',
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' ? true : transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalEarned = transactions
    .filter(t => t.type === 'earn')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.type === 'spend')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">리워드 내역</h2>
        <p className="text-gray-600">포인트 적립 및 사용 내역을 확인하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">총 적립</span>
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-gray-900">{totalEarned.toLocaleString()}P</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">총 사용</span>
            <div className="p-2 bg-red-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="text-gray-900">{totalSpent.toLocaleString()}P</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">순 포인트</span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Coins className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-gray-900">{(totalEarned - totalSpent).toLocaleString()}P</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="내역 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterType('earn')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'earn'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              적립
            </button>
            <button
              onClick={() => setFilterType('spend')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'spend'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              사용
            </button>
          </div>

          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>내보내기</span>
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">날짜</th>
                <th className="px-6 py-3 text-left text-gray-600">내역</th>
                <th className="px-6 py-3 text-left text-gray-600">카테고리</th>
                <th className="px-6 py-3 text-right text-gray-600">금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{transaction.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={
                        transaction.type === 'earn'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {transaction.type === 'earn' ? '+' : '-'}
                      {transaction.amount.toLocaleString()}P
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}
