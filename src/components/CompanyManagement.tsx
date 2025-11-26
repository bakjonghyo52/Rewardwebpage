import { useState } from 'react';
import { Search, Mail, Phone, Building2, Briefcase, DollarSign, Eye, Ban, CheckCircle } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  industry: string;
  activeMissions: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
}

export function CompanyManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: '테크컴퍼니',
      email: 'contact@techcompany.com',
      phone: '02-1234-5678',
      industry: 'IT/소프트웨어',
      activeMissions: 5,
      totalSpent: 1250000,
      joinDate: '2025-06-15',
      status: 'active',
    },
    {
      id: 2,
      name: '디자인스튜디오',
      email: 'hello@designstudio.com',
      phone: '02-2345-6789',
      industry: '디자인',
      activeMissions: 3,
      totalSpent: 850000,
      joinDate: '2025-07-22',
      status: 'active',
    },
    {
      id: 3,
      name: '마케팅그룹',
      email: 'info@marketinggroup.com',
      phone: '02-3456-7890',
      industry: '마케팅/광고',
      activeMissions: 7,
      totalSpent: 2100000,
      joinDate: '2025-05-10',
      status: 'active',
    },
    {
      id: 4,
      name: '스타트업랩',
      email: 'team@startuplab.com',
      phone: '02-4567-8901',
      industry: '스타트업',
      activeMissions: 0,
      totalSpent: 350000,
      joinDate: '2025-09-18',
      status: 'inactive',
    },
    {
      id: 5,
      name: '컨설팅펌',
      email: 'contact@consultingfirm.com',
      phone: '02-5678-9012',
      industry: '컨설팅',
      activeMissions: 0,
      totalSpent: 150000,
      joinDate: '2025-08-05',
      status: 'suspended',
    },
  ]);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : company.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (companyId: number, newStatus: Company['status']) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId ? { ...company, status: newStatus } : company
    ));
  };

  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'inactive': return 'bg-gray-100 text-gray-600';
      case 'suspended': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: Company['status']) => {
    switch (status) {
      case 'active': return '활성';
      case 'inactive': return '비활성';
      case 'suspended': return '정지';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">기업 관리</h2>
        <p className="text-gray-600">플랫폼 기업 계정을 관리하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">전체 기업</div>
          <div className="text-gray-900">{companies.length}개</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">활성 기업</div>
          <div className="text-green-600">{companies.filter(c => c.status === 'active').length}개</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">총 활성 미션</div>
          <div className="text-blue-600">{companies.reduce((sum, c) => sum + c.activeMissions, 0)}개</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-600 mb-2">총 거래액</div>
          <div className="text-purple-600">₩{companies.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="기업 검색 (이름, 이메일, 업종)"
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
              onClick={() => setFilterStatus('suspended')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'suspended'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              정지
            </button>
          </div>
        </div>
      </div>

      {/* Company List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">기업</th>
                <th className="px-6 py-3 text-left text-gray-600">연락처</th>
                <th className="px-6 py-3 text-left text-gray-600">업종</th>
                <th className="px-6 py-3 text-left text-gray-600">활성 미션</th>
                <th className="px-6 py-3 text-left text-gray-600">총 지출</th>
                <th className="px-6 py-3 text-left text-gray-600">가입일</th>
                <th className="px-6 py-3 text-left text-gray-600">상태</th>
                <th className="px-6 py-3 text-left text-gray-600">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-gray-900 mb-1">{company.name}</div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{company.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{company.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {company.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-blue-600">
                      <Briefcase className="w-4 h-4" />
                      <span>{company.activeMissions}개</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-purple-600">
                      <DollarSign className="w-4 h-4" />
                      <span>₩{company.totalSpent.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {company.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(company.status)}`}>
                      {getStatusLabel(company.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowDetailModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="상세보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {company.status !== 'suspended' && (
                        <button
                          onClick={() => handleStatusChange(company.id, 'suspended')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="계정 정지"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      {company.status === 'suspended' && (
                        <button
                          onClick={() => handleStatusChange(company.id, 'active')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="정지 해제"
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

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            검색 결과가 없습니다
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-gray-900 mb-1">{selectedCompany.name}</h3>
                <p className="text-gray-600">{selectedCompany.email}</p>
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
                  <div className="text-gray-900">{selectedCompany.phone}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">업종</div>
                  <div className="text-gray-900">{selectedCompany.industry}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">활성 미션</div>
                  <div className="text-blue-600">{selectedCompany.activeMissions}개</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">총 지출</div>
                  <div className="text-purple-600">₩{selectedCompany.totalSpent.toLocaleString()}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">가입일</div>
                  <div className="text-gray-900">{selectedCompany.joinDate}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-600 mb-2">상태</div>
                  <span className={`px-3 py-1 rounded-full ${getStatusColor(selectedCompany.status)}`}>
                    {getStatusLabel(selectedCompany.status)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-gray-600 mb-3">최근 미션 활동</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-900">
                    <span>제품 만족도 설문조사</span>
                    <span className="text-blue-600">진행중</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>신규 서비스 UX 피드백</span>
                    <span className="text-blue-600">진행중</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>브랜드 인지도 조사</span>
                    <span className="text-green-600">완료</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {selectedCompany.status !== 'suspended' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedCompany.id, 'suspended');
                    setShowDetailModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  계정 정지
                </button>
              )}
              {selectedCompany.status === 'suspended' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedCompany.id, 'active');
                    setShowDetailModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  정지 해제
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
