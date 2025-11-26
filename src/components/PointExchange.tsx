import { useState } from 'react';
import { Coins, DollarSign, FileText, Briefcase, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';

interface PointExchangeProps {
  currentPoints: number;
  onPointsUsed: (points: number) => void;
}

type ExchangeCategory = 'cash' | 'outsource' | 'survey' | 'purchase';

interface ExchangeOption {
  id: number;
  category: ExchangeCategory;
  title: string;
  description: string;
  pointsRequired: number;
  value: string;
  icon: any;
}

export function PointExchange({ currentPoints, onPointsUsed }: PointExchangeProps) {
  const [selectedCategory, setSelectedCategory] = useState<ExchangeCategory | 'all'>('all');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ExchangeOption | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const exchangeOptions: ExchangeOption[] = [
    {
      id: 1,
      category: 'cash',
      title: '현금 환전',
      description: '포인트를 현금으로 환전하세요 (1P = 1원)',
      pointsRequired: 10000,
      value: '10,000원',
      icon: DollarSign,
    },
    {
      id: 2,
      category: 'cash',
      title: '현금 환전',
      description: '포인트를 현금으로 환전하세요 (1P = 1원)',
      pointsRequired: 50000,
      value: '50,000원',
      icon: DollarSign,
    },
    {
      id: 3,
      category: 'cash',
      title: '현금 환전',
      description: '포인트를 현금으로 환전하세요 (1P = 1원)',
      pointsRequired: 100000,
      value: '100,000원',
      icon: DollarSign,
    },
    {
      id: 4,
      category: 'survey',
      title: '설문조사 의뢰 (소형)',
      description: '10명 대상 설문조사 (10문항)',
      pointsRequired: 5000,
      value: '10명 / 10문항',
      icon: FileText,
    },
    {
      id: 5,
      category: 'survey',
      title: '설문조사 의뢰 (중형)',
      description: '50명 대상 설문조사 (15문항)',
      pointsRequired: 15000,
      value: '50명 / 15문항',
      icon: FileText,
    },
    {
      id: 6,
      category: 'survey',
      title: '설문조사 의뢰 (대형)',
      description: '100명 대상 설문조사 (20문항)',
      pointsRequired: 25000,
      value: '100명 / 20문항',
      icon: FileText,
    },
    {
      id: 7,
      category: 'outsource',
      title: '간단한 외주 의뢰',
      description: '로고 디자인, 간단한 개발 등',
      pointsRequired: 20000,
      value: '소규모 프로젝트',
      icon: Briefcase,
    },
    {
      id: 8,
      category: 'outsource',
      title: '중급 외주 의뢰',
      description: '웹사이트 제작, 앱 개발 등',
      pointsRequired: 50000,
      value: '중규모 프로젝트',
      icon: Briefcase,
    },
    {
      id: 9,
      category: 'outsource',
      title: '전문 외주 의뢰',
      description: '복잡한 시스템 개발 등',
      pointsRequired: 100000,
      value: '대규모 프로젝트',
      icon: Briefcase,
    },
    {
      id: 10,
      category: 'purchase',
      title: '기프트카드 (스타벅스)',
      description: '스타벅스 기프트카드',
      pointsRequired: 5000,
      value: '5,000원권',
      icon: ShoppingBag,
    },
    {
      id: 11,
      category: 'purchase',
      title: '기프트카드 (편의점)',
      description: 'CU/GS25 상품권',
      pointsRequired: 10000,
      value: '10,000원권',
      icon: ShoppingBag,
    },
    {
      id: 12,
      category: 'purchase',
      title: '온라인 쇼핑몰 쿠폰',
      description: '주요 온라인 쇼핑몰 할인쿠폰',
      pointsRequired: 15000,
      value: '15,000원권',
      icon: ShoppingBag,
    },
  ];

  const categories = [
    { id: 'all' as const, label: '전체', icon: Coins },
    { id: 'cash' as ExchangeCategory, label: '현금 환전', icon: DollarSign },
    { id: 'survey' as ExchangeCategory, label: '설문 의뢰', icon: FileText },
    { id: 'outsource' as ExchangeCategory, label: '외주 의뢰', icon: Briefcase },
    { id: 'purchase' as ExchangeCategory, label: '상품 구매', icon: ShoppingBag },
  ];

  const filteredOptions = exchangeOptions.filter(option =>
    selectedCategory === 'all' ? true : option.category === selectedCategory
  );

  const handleExchange = (option: ExchangeOption) => {
    if (currentPoints >= option.pointsRequired) {
      setSelectedOption(option);
      setShowConfirmModal(true);
    }
  };

  const confirmExchange = () => {
    if (selectedOption) {
      onPointsUsed(selectedOption.pointsRequired);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        setSelectedOption(null);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">포인트 사용</h2>
        <p className="text-gray-600">포인트를 다양한 방법으로 사용하세요</p>
      </div>

      {/* Current Points */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-blue-100 mb-1">보유 포인트</div>
            <div className="text-white flex items-center gap-2">
              <Coins className="w-6 h-6" />
              <span>{currentPoints.toLocaleString()}P</span>
            </div>
          </div>
          <div className="text-right text-blue-100">
            1P = 1원
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Exchange Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOptions.map((option) => {
          const Icon = option.icon;
          const canAfford = currentPoints >= option.pointsRequired;
          
          return (
            <div
              key={option.id}
              className={`bg-white rounded-xl border border-gray-200 p-6 transition-all ${
                canAfford ? 'hover:shadow-md' : 'opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                {!canAfford && (
                  <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                    포인트 부족
                  </span>
                )}
              </div>

              <h3 className="text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-gray-500 mb-1">필요 포인트</div>
                  <div className="text-blue-600 flex items-center gap-1">
                    <Coins className="w-4 h-4" />
                    <span>{option.pointsRequired.toLocaleString()}P</span>
                  </div>
                </div>

                <button
                  onClick={() => handleExchange(option)}
                  disabled={!canAfford}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    canAfford
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>사용</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 text-gray-600 text-center">
                {option.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && selectedOption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-gray-900 mb-4">포인트 사용 확인</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">항목</span>
                <span className="text-gray-900">{selectedOption.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">사용 포인트</span>
                <span className="text-red-600">{selectedOption.pointsRequired.toLocaleString()}P</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-600">잔여 포인트</span>
                <span className="text-blue-600">{(currentPoints - selectedOption.pointsRequired).toLocaleString()}P</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmExchange}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">완료되었습니다!</h3>
            <p className="text-gray-600">포인트가 성공적으로 사용되었습니다</p>
          </div>
        </div>
      )}
    </div>
  );
}
