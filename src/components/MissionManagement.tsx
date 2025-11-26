import { useState } from 'react';
import { Search, Eye, Edit, Trash2, Users, Calendar, Coins, MoreVertical, Play, Pause, CheckCircle } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  type: string;
  status: 'active' | 'paused' | 'completed';
  participants: number;
  target: number;
  rewardPerUser: number;
  startDate: string;
  endDate: string;
  category: string;
}

export function MissionManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'completed'>('all');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: '제품 만족도 설문조사',
      type: '설문조사',
      status: 'active',
      participants: 234,
      target: 500,
      rewardPerUser: 500,
      startDate: '2025-11-20',
      endDate: '2025-11-30',
      category: '제품 피드백',
    },
    {
      id: 2,
      title: '신규 서비스 UX 피드백',
      type: '설문조사',
      status: 'active',
      participants: 89,
      target: 100,
      rewardPerUser: 800,
      startDate: '2025-11-22',
      endDate: '2025-11-28',
      category: '서비스 평가',
    },
    {
      id: 3,
      title: '브랜드 인지도 조사',
      type: '설문조사',
      status: 'completed',
      participants: 500,
      target: 500,
      rewardPerUser: 600,
      startDate: '2025-11-15',
      endDate: '2025-11-25',
      category: '브랜드 인지도',
    },
    {
      id: 4,
      title: '로고 디자인 외주',
      type: '외주',
      status: 'active',
      participants: 3,
      target: 5,
      rewardPerUser: 50000,
      startDate: '2025-11-18',
      endDate: '2025-12-05',
      category: '디자인',
    },
    {
      id: 5,
      title: '소비 트렌드 분석',
      type: '설문조사',
      status: 'paused',
      participants: 45,
      target: 200,
      rewardPerUser: 700,
      startDate: '2025-11-10',
      endDate: '2025-12-01',
      category: '시장 조사',
    },
  ]);

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : mission.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (missionId: number, newStatus: Mission['status']) => {
    setMissions(prev => prev.map(mission => 
      mission.id === missionId ? { ...mission, status: newStatus } : mission
    ));
  };

  const handleDelete = (missionId: number) => {
    if (confirm('정말 이 미션을 삭제하시겠습니까?')) {
      setMissions(prev => prev.filter(mission => mission.id !== missionId));
    }
  };

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'paused': return 'bg-yellow-100 text-yellow-600';
      case 'completed': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: Mission['status']) => {
    switch (status) {
      case 'active': return '진행중';
      case 'paused': return '일시정지';
      case 'completed': return '완료';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">미션 관리</h2>
        <p className="text-gray-600">생성한 미션을 관리하고 진행상황을 확인하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">진행중</span>
            <div className="p-2 bg-green-50 rounded-lg">
              <Play className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-gray-900">{missions.filter(m => m.status === 'active').length}개</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">일시정지</span>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Pause className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div className="text-gray-900">{missions.filter(m => m.status === 'paused').length}개</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">완료</span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-gray-900">{missions.filter(m => m.status === 'completed').length}개</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="미션 검색..."
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
              진행중
            </button>
            <button
              onClick={() => setFilterStatus('paused')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'paused'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              일시정지
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              완료
            </button>
          </div>
        </div>
      </div>

      {/* Mission List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">미션명</th>
                <th className="px-6 py-3 text-left text-gray-600">카테고리</th>
                <th className="px-6 py-3 text-left text-gray-600">진행률</th>
                <th className="px-6 py-3 text-left text-gray-600">기간</th>
                <th className="px-6 py-3 text-left text-gray-600">상태</th>
                <th className="px-6 py-3 text-left text-gray-600">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMissions.map((mission) => (
                <tr key={mission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-gray-900 mb-1">{mission.title}</div>
                    <div className="text-gray-600">{mission.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {mission.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(mission.participants / mission.target) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-gray-600 whitespace-nowrap">
                        {mission.participants}/{mission.target}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{mission.startDate}</span>
                    </div>
                    <div className="text-gray-500">~ {mission.endDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(mission.status)}`}>
                      {getStatusLabel(mission.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedMission(mission);
                          setShowDetailModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="상세보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {mission.status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(mission.id, 'paused')}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="일시정지"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                      {mission.status === 'paused' && (
                        <button
                          onClick={() => handleStatusChange(mission.id, 'active')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="재개"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(mission.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedMission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-gray-900 mb-1">{selectedMission.title}</h3>
                <p className="text-gray-600">{selectedMission.type}</p>
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
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span>참여 현황</span>
                  </div>
                  <div className="text-gray-900">
                    {selectedMission.participants} / {selectedMission.target}명
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Coins className="w-4 h-4" />
                    <span>인당 리워드</span>
                  </div>
                  <div className="text-gray-900">
                    {selectedMission.rewardPerUser.toLocaleString()}P
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>시작일</span>
                  </div>
                  <div className="text-gray-900">{selectedMission.startDate}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>종료일</span>
                  </div>
                  <div className="text-gray-900">{selectedMission.endDate}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-gray-600 mb-2">총 예상 비용</div>
                <div className="text-gray-900">
                  {(selectedMission.target * selectedMission.rewardPerUser).toLocaleString()}P
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-gray-600 mb-2">진행률</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(selectedMission.participants / selectedMission.target) * 100}%` }}
                  />
                </div>
                <div className="text-gray-900">
                  {Math.round((selectedMission.participants / selectedMission.target) * 100)}%
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
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
