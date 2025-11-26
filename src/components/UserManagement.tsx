import { useState } from 'react';
import { Search, Mail, Phone, MapPin, Coins, Eye, Ban, CheckCircle, Filter } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  points: number;
  completedMissions: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'banned';
  rating: number;
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'banned'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      location: '서울특별시',
      points: 12500,
      completedMissions: 24,
      joinDate: '2025-08-15',
      status: 'active',
      rating: 4.8,
    },
    {
      id: 2,
      name: '김영희',
      email: 'kim@example.com',
      phone: '010-2345-6789',
      location: '경기도',
      points: 8900,
      completedMissions: 18,
      joinDate: '2025-09-03',
      status: 'active',
      rating: 4.5,
    },
    {
      id: 3,
      name: '이철수',
      email: 'lee@example.com',
      phone: '010-3456-7890',
      location: '부산광역시',
      points: 15600,
      completedMissions: 32,
      joinDate: '2025-07-20',
      status: 'active',
      rating: 4.9,
    },
    {
      id: 4,
      name: '박민수',
      email: 'park@example.com',
      phone: '010-4567-8901',
      location: '대구광역시',
      points: 3200,
      completedMissions: 8,
      joinDate: '2025-10-12',
      status: 'inactive',
      rating: 4.2,
    },
    {
      id: 5,
      name: '정수진',
      email: 'jung@example.com',
      phone: '010-5678-9012',
      location: '인천광역시',
      points: 0,
      completedMissions: 2,
      joinDate: '2025-11-01',
      status: 'banned',
      rating: 2.1,
    },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' ? true : user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId: number, newStatus: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'inactive': return 'bg-gray-100 text-gray-600';
      case 'banned': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: User['status']) => {
    switch (status) {
      case 'active': return '활성';
      case 'inactive': return '비활성';
      case 'banned': return '차단';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">사용자 관리</h2>
        <p className="text-gray-600">플랫폼 사용자를 관리하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">전체 사용자</div>
          <div className="text-gray-900">{users.length}명</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">활성 사용자</div>
          <div className="text-green-600">{users.filter(u => u.status === 'active').length}명</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">비활성 사용자</div>
          <div className="text-gray-600">{users.filter(u => u.status === 'inactive').length}명</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">차단된 사용자</div>
          <div className="text-red-600">{users.filter(u => u.status === 'banned').length}명</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="사용자 검색 (이름, 이메일, 전화번호)"
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
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              활성
            </button>
            <button
              onClick={() => setFilterStatus('inactive')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'inactive'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              비활성
            </button>
            <button
              onClick={() => setFilterStatus('banned')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'banned'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              차단
            </button>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">사용자</th>
                <th className="px-6 py-3 text-left text-gray-600">연락처</th>
                <th className="px-6 py-3 text-left text-gray-600">지역</th>
                <th className="px-6 py-3 text-left text-gray-600">포인트</th>
                <th className="px-6 py-3 text-left text-gray-600">완료 미션</th>
                <th className="px-6 py-3 text-left text-gray-600">가입일</th>
                <th className="px-6 py-3 text-left text-gray-600">상태</th>
                <th className="px-6 py-3 text-left text-gray-600">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-gray-900 mb-1">{user.name}</div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-blue-600">
                      <Coins className="w-4 h-4" />
                      <span>{user.points.toLocaleString()}P</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {user.completedMissions}개
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDetailModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="상세보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {user.status !== 'banned' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'banned')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="차단"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      {user.status === 'banned' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="차단 해제"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-gray-900 mb-1">{selectedUser.name}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">전화번호</div>
                  <div className="text-gray-900">{selectedUser.phone}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">지역</div>
                  <div className="text-gray-900">{selectedUser.location}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">보유 포인트</div>
                  <div className="text-blue-600">{selectedUser.points.toLocaleString()}P</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">완료한 미션</div>
                  <div className="text-gray-900">{selectedUser.completedMissions}개</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">가입일</div>
                  <div className="text-gray-900">{selectedUser.joinDate}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">평균 별점</div>
                  <div className="text-gray-900">{selectedUser.rating} / 5.0</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-gray-600 mb-2">상태</div>
                <span className={`px-3 py-1 rounded-full ${getStatusColor(selectedUser.status)}`}>
                  {getStatusLabel(selectedUser.status)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {selectedUser.status !== 'banned' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedUser.id, 'banned');
                    setShowDetailModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  사용자 차단
                </button>
              )}
              {selectedUser.status === 'banned' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedUser.id, 'active');
                    setShowDetailModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  차단 해제
                </button>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
