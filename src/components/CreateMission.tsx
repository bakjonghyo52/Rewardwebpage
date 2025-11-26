import { useState } from 'react';
import { FileText, Briefcase, Calendar, Users, Coins, CheckCircle } from 'lucide-react';

type MissionType = 'survey' | 'outsourcing';

export function CreateMission() {
  const [missionType, setMissionType] = useState<MissionType>('survey');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetParticipants: '',
    rewardPerUser: '',
    startDate: '',
    endDate: '',
    category: '',
    requirements: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      // Reset form
      setFormData({
        title: '',
        description: '',
        targetParticipants: '',
        rewardPerUser: '',
        startDate: '',
        endDate: '',
        category: '',
        requirements: '',
      });
    }, 2000);
  };

  const totalCost = Number(formData.targetParticipants || 0) * Number(formData.rewardPerUser || 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">미션 생성</h2>
        <p className="text-gray-600">새로운 미션을 생성하고 사용자들에게 의뢰하세요</p>
      </div>

      {/* Mission Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setMissionType('survey')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            missionType === 'survey'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <FileText className={`w-8 h-8 mb-3 ${missionType === 'survey' ? 'text-blue-600' : 'text-gray-400'}`} />
          <h3 className="text-gray-900 mb-1">설문조사</h3>
          <p className="text-gray-600">사용자들에게 설문조사를 의뢰하고 피드백을 받으세요</p>
        </button>

        <button
          onClick={() => setMissionType('outsourcing')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            missionType === 'outsourcing'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <Briefcase className={`w-8 h-8 mb-3 ${missionType === 'outsourcing' ? 'text-blue-600' : 'text-gray-400'}`} />
          <h3 className="text-gray-900 mb-1">외주 의뢰</h3>
          <p className="text-gray-600">디자인, 개발 등 전문 작업을 외주로 의뢰하세요</p>
        </button>
      </div>

      {/* Mission Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2">
              미션 제목 *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={missionType === 'survey' ? '예: 신제품 만족도 조사' : '예: 로고 디자인 의뢰'}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2">
              상세 설명 *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="미션에 대한 자세한 설명을 입력하세요"
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-2">
              카테고리 *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택하세요</option>
              {missionType === 'survey' ? (
                <>
                  <option value="product">제품 피드백</option>
                  <option value="service">서비스 평가</option>
                  <option value="market">시장 조사</option>
                  <option value="brand">브랜드 인지도</option>
                </>
              ) : (
                <>
                  <option value="design">디자인</option>
                  <option value="development">개발</option>
                  <option value="content">콘텐츠 작성</option>
                  <option value="marketing">마케팅</option>
                </>
              )}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Participants */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Users className="w-4 h-4" />
                목표 참여자 수 *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.targetParticipants}
                onChange={(e) => setFormData({ ...formData, targetParticipants: e.target.value })}
                placeholder="100"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reward Per User */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Coins className="w-4 h-4" />
                인당 리워드 포인트 *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.rewardPerUser}
                onChange={(e) => setFormData({ ...formData, rewardPerUser: e.target.value })}
                placeholder="500"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                시작일 *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                종료일 *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-gray-700 mb-2">
              참여 요건
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="미션 참여에 필요한 요건이나 자격을 입력하세요 (선택사항)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Cost Summary */}
          {formData.targetParticipants && formData.rewardPerUser && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">예상 총 비용</span>
                <span className="text-blue-600">{totalCost.toLocaleString()} 포인트</span>
              </div>
              <div className="text-gray-600">
                {formData.targetParticipants}명 × {Number(formData.rewardPerUser).toLocaleString()}P
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            미션 생성하기
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">미션이 생성되었습니다!</h3>
            <p className="text-gray-600">사용자들이 곧 미션을 시작할 수 있습니다</p>
          </div>
        </div>
      )}
    </div>
  );
}
