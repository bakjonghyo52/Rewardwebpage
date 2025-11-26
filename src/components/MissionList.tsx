import { useState } from 'react';
import { Clock, Coins, CheckCircle, MapPin, FileText, Briefcase, Star, UserCircle, Filter } from 'lucide-react';

interface MissionListProps {
  onPointsEarned: (points: number) => void;
}

type MissionType = 'all' | 'visit' | 'survey' | 'outsourcing' | 'rating' | 'profile';

interface Mission {
  id: number;
  title: string;
  description: string;
  type: MissionType;
  points: number;
  timeLimit: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

export function MissionList({ onPointsEarned }: MissionListProps) {
  const [filter, setFilter] = useState<MissionType>('all');
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: '일일 방문 체크인',
      description: '매일 플랫폼에 방문하고 체크인하세요',
      type: 'visit',
      points: 100,
      timeLimit: '24시간',
      difficulty: 'easy',
      completed: false,
    },
    {
      id: 2,
      title: '제품 만족도 설문조사',
      description: '신제품에 대한 의견을 들려주세요 (10문항)',
      type: 'survey',
      points: 500,
      timeLimit: '3일',
      difficulty: 'easy',
      completed: false,
    },
    {
      id: 3,
      title: '디자인 외주 매칭',
      description: '로고 디자인 외주 프로젝트 매칭',
      type: 'outsourcing',
      points: 1000,
      timeLimit: '7일',
      difficulty: 'medium',
      completed: false,
    },
    {
      id: 4,
      title: '개발자 평가하기',
      description: '최근 완료된 프로젝트의 개발자에게 별점을 남겨주세요',
      type: 'rating',
      points: 200,
      timeLimit: '2일',
      difficulty: 'easy',
      completed: false,
    },
    {
      id: 5,
      title: '프로필 완성하기',
      description: '프로필 정보를 100% 완성하세요',
      type: 'profile',
      points: 300,
      timeLimit: '제한없음',
      difficulty: 'easy',
      completed: false,
    },
    {
      id: 6,
      title: '소비자 트렌드 설문',
      description: '2025년 소비 트렌드 조사 참여 (20문항)',
      type: 'survey',
      points: 800,
      timeLimit: '5일',
      difficulty: 'medium',
      completed: false,
    },
    {
      id: 7,
      title: '콘텐츠 작성 외주',
      description: '블로그 포스트 작성 외주 매칭',
      type: 'outsourcing',
      points: 1500,
      timeLimit: '14일',
      difficulty: 'hard',
      completed: false,
    },
    {
      id: 8,
      title: '주간 방문 보너스',
      description: '7일 연속 방문 달성',
      type: 'visit',
      points: 700,
      timeLimit: '7일',
      difficulty: 'medium',
      completed: false,
    },
  ]);

  const filterOptions = [
    { id: 'all' as MissionType, label: '전체', icon: Filter },
    { id: 'visit' as MissionType, label: '방문', icon: MapPin },
    { id: 'survey' as MissionType, label: '설문조사', icon: FileText },
    { id: 'outsourcing' as MissionType, label: '외주', icon: Briefcase },
    { id: 'rating' as MissionType, label: '별점', icon: Star },
    { id: 'profile' as MissionType, label: '프로필', icon: UserCircle },
  ];

  const filteredMissions = missions.filter(mission => 
    filter === 'all' ? true : mission.type === filter
  );

  const handleCompleteMission = (missionId: number) => {
    setMissions(prev => prev.map(mission => {
      if (mission.id === missionId && !mission.completed) {
        onPointsEarned(mission.points);
        return { ...mission, completed: true };
      }
      return mission;
    }));
  };

  const getMissionIcon = (type: MissionType) => {
    switch (type) {
      case 'visit': return MapPin;
      case 'survey': return FileText;
      case 'outsourcing': return Briefcase;
      case 'rating': return Star;
      case 'profile': return UserCircle;
      default: return CheckCircle;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">미션</h2>
        <p className="text-gray-600">미션을 완료하고 포인트를 획득하세요</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                filter === option.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const Icon = getMissionIcon(mission.type);
          return (
            <div
              key={mission.id}
              className={`bg-white rounded-xl border border-gray-200 p-6 transition-all ${
                mission.completed ? 'opacity-60' : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{mission.title}</h3>
                    <p className="text-gray-600">{mission.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{mission.timeLimit}</span>
                </div>
                <div className={`px-2 py-1 rounded ${getDifficultyColor(mission.difficulty)}`}>
                  {getDifficultyLabel(mission.difficulty)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-600">
                  <Coins className="w-5 h-5" />
                  <span>{mission.points} 포인트</span>
                </div>
                
                {mission.completed ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>완료</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteMission(mission.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    시작하기
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          해당 카테고리에 미션이 없습니다
        </div>
      )}
    </div>
  );
}
