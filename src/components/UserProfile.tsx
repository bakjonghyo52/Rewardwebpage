import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Award, Save, Camera } from 'lucide-react';

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    location: '서울특별시 강남구',
    occupation: '프리랜서 디자이너',
    bio: '디자인과 개발에 관심이 많은 프리랜서입니다. 다양한 프로젝트 경험을 쌓고 있습니다.',
    skills: ['UI/UX 디자인', '그래픽 디자인', 'Figma', 'Photoshop'],
  });

  const [completionRate, setCompletionRate] = useState(85);

  const handleSave = () => {
    setIsEditing(false);
    // Calculate completion rate based on filled fields
    let filled = 0;
    if (profileData.name) filled += 15;
    if (profileData.email) filled += 15;
    if (profileData.phone) filled += 15;
    if (profileData.location) filled += 15;
    if (profileData.occupation) filled += 15;
    if (profileData.bio) filled += 15;
    if (profileData.skills.length > 0) filled += 10;
    setCompletionRate(filled);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">프로필</h2>
          <p className="text-gray-600">프로필을 완성하고 300 포인트를 받으세요</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            수정하기
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            저장하기
          </button>
        )}
      </div>

      {/* Profile Completion */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900">프로필 완성도</span>
          </div>
          <span className="text-blue-600">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        {completionRate < 100 && (
          <p className="text-gray-600 mt-3">
            프로필을 100% 완성하면 300 포인트를 획득할 수 있습니다!
          </p>
        )}
        {completionRate === 100 && (
          <p className="text-green-600 mt-3">
            프로필이 완성되었습니다! 300 포인트가 지급됩니다.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">프로필 사진</h3>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            {isEditing && (
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Camera className="w-4 h-4" />
                사진 변경
              </button>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">기본 정보</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-600 mb-2">
                <User className="w-4 h-4" />
                이름
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="text-gray-900">{profileData.name}</div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 mb-2">
                <Mail className="w-4 h-4" />
                이메일
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="text-gray-900">{profileData.email}</div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 mb-2">
                <Phone className="w-4 h-4" />
                전화번호
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="text-gray-900">{profileData.phone}</div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                지역
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="text-gray-900">{profileData.location}</div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 mb-2">
                <Briefcase className="w-4 h-4" />
                직업
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.occupation}
                  onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="text-gray-900">{profileData.occupation}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">자기소개</h3>
        {isEditing ? (
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        ) : (
          <p className="text-gray-700">{profileData.bio}</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">보유 스킬</h3>
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-2">
                  <span>{skill}</span>
                  <button
                    onClick={() => {
                      const newSkills = profileData.skills.filter((_, i) => i !== index);
                      setProfileData({ ...profileData, skills: newSkills });
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="스킬을 입력하고 Enter를 누르세요"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  setProfileData({
                    ...profileData,
                    skills: [...profileData.skills, e.currentTarget.value.trim()],
                  });
                  e.currentTarget.value = '';
                }
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">활동 통계</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-gray-900 mb-1">24</div>
            <div className="text-gray-600">완료한 미션</div>
          </div>
          <div className="text-center">
            <div className="text-gray-900 mb-1">12</div>
            <div className="text-gray-600">외주 매칭</div>
          </div>
          <div className="text-center">
            <div className="text-gray-900 mb-1">4.8</div>
            <div className="text-gray-600">평균 별점</div>
          </div>
          <div className="text-center">
            <div className="text-gray-900 mb-1">15</div>
            <div className="text-gray-600">설문 참여</div>
          </div>
        </div>
      </div>
    </div>
  );
}
