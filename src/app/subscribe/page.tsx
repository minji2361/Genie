'use client';

import React, { useState } from 'react'; // useState를 import 합니다.
import { useRouter } from 'next/navigation'; // useRouter를 import 합니다.

const CheckIcon = ({ className = 'text-Bgreen' }) => (
    <svg
        className={`w-6 h-6 mr-3 flex-shrink-0 ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
    </svg>
);

export default function CounselorToolsPage() {
    const [promoCode, setPromoCode] = useState('');
    const router = useRouter();

    const handlePurchaseClick = (plan: string) => {
        if (promoCode === 'jdbjdb1234') {
            router.push(`/purchase/confirm?plan=${plan}`);
        } else {
            alert('유효한 할인/파트너 코드를 입력해주세요.');
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <main className="max-w-7xl mx-auto py-20 px-6">
                {/* Hero Section */}
                <section className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                        상담의 깊이를 더하는 새로운 기준
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        리프레임의 진단 도구는 다양한 성격유형 기반의 과학적 분석을 통해 상담사님이 내담자를 더 깊이
                        이해하고, 맞춤형 상담을 설계할 수 있도록 돕습니다.
                    </p>
                </section>

                {/* Benefits Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-Bgreen mb-3">내담자 유형별 분석 리포트</h3>
                        <p className="text-gray-700">
                            내담자의 성격 유형과 잠재적 강점, 보완점을 한눈에 파악하여 상담의 효율을 높여보세요.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-Bgreen mb-3">효율적인 상담 준비</h3>
                        <p className="text-gray-700">
                            초기 상담 시간을 단축하고, 구조화된 데이터를 통해 내담자와의 신뢰를 빠르게 형성할 수
                            있습니다.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md text-center transform hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-Bgreen mb-3">상담 활용 가이드 제공</h3>
                        <p className="text-gray-700">
                            유형별 상담 전략과 활동 워크시트를 제공하여, 즉시 현장에서 활용 가능한 인사이트를 얻을 수
                            있습니다.
                        </p>
                    </div>
                </section>

                {/* Pricing Section - 가격이 수정되었습니다 */}
                <section className="bg-gray-50/70 py-20 rounded-2xl">
                    <div className="text-center mb-12 px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            상담사님께 가장 적합한 플랜을 선택하세요
                        </h2>
                        <p className="text-gray-600 mt-4 text-lg">
                            리프레임의 모든 도구를 활용하여 상담의 전문성을 높여보세요.
                        </p>
                        {/* 코드 입력 필드 */}
                        <div className="mt-8 max-w-sm mx-auto">
                            <label htmlFor="promo_code" className="sr-only">
                                할인/파트너 코드
                            </label>
                            <input
                                type="text"
                                id="promo_code"
                                name="promo_code"
                                placeholder="코드를 입력 후 플랜을 선택하세요"
                                className="w-full px-6 py-4 rounded-full text-center text-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-Bgreen focus:outline-none transition-shadow"
                                onChange={(e) => setPromoCode(e.target.value)}
                                value={promoCode}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-6">
                        {/* 월간 플랜 */}
                        <div className="bg-white rounded-xl p-8 w-full max-w-sm border border-gray-200 shadow-lg">
                            <h3 className="text-2xl font-bold text-Bblack">월간 라이선스</h3>
                            <p className="text-gray-500 mt-2">부담없이 시작하고 싶다면</p>
                            <p className="text-5xl font-bold text-Bblack my-6">
                                ₩79,000<span className="text-lg font-normal text-gray-500">/월</span>
                            </p>
                            <ul className="space-y-4 text-left text-gray-700">
                                <li className="flex items-center">
                                    <CheckIcon />
                                    <span>모든 진단 도구 및 리포트 이용</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon />
                                    <span>상담 연계 활동지/워크시트</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon />
                                    <span>상담사 전용 커뮤니티 초대</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => handlePurchaseClick('monthly')}
                                className="w-full mt-8 block bg-gray-200 text-Bblack font-bold py-3 rounded-lg hover:bg-gray-300 transition text-center"
                            >
                                월간 플랜으로 시작
                            </button>
                        </div>

                        {/* 연간 플랜 */}
                        <div className="bg-Bgreen text-white rounded-xl p-8 w-full max-w-sm border-2 border-Borange relative shadow-2xl scale-105">
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-Borange text-white px-4 py-1 rounded-full text-sm font-semibold">
                                가장 합리적인 선택
                            </div>
                            <h3 className="text-2xl font-bold">연간 라이선스</h3>
                            <p className="text-green-200 mt-2">최고의 효율과 전문성을 원한다면</p>
                            <p className="text-5xl font-bold my-6">
                                ₩59,000<span className="text-lg font-normal text-green-200">/월</span>
                            </p>
                            <p className="text-yellow-300 font-semibold mb-6">연 708,000원 (25% 이상 할인)</p>
                            <ul className="space-y-4 text-left">
                                <li className="flex items-center">
                                    <CheckIcon className="text-white" />
                                    <span>
                                        <strong className="font-semibold">월간 플랜의 모든 혜택</strong>
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="text-white" />
                                    <span className="font-semibold">프리미엄 상담 워크숍 초대권</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckIcon className="text-white" />
                                    <span className="font-semibold">전문가 1:1 슈퍼비전 세션 (연 1회)</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => handlePurchaseClick('annual')}
                                className="w-full mt-8 block bg-Borange text-white font-bold py-3 rounded-lg hover:opacity-90 transition text-center"
                            >
                                25% 이상 할인받고 시작하기
                            </button>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mt-24">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">자주 묻는 질문</h2>
                    <div className="space-y-6 max-w-3xl mx-auto">
                        <details className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <summary className="text-lg font-medium text-Bgreen">
                                도구를 실제 상담에 어떻게 활용하나요?
                            </summary>
                            <p className="text-gray-600 mt-3">
                                상담 전 내담자에게 진단 링크를 발송하고, 세션 시작 전 리포트를 확인하여 상담을 설계할 수
                                있습니다. 제공되는 워크시트는 내담자와 함께하는 활동에 바로 사용 가능합니다.
                            </p>
                        </details>
                        <details className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <summary className="text-lg font-medium text-Bgreen">
                                기관이나 팀 단위 구매도 가능한가요?
                            </summary>
                            <p className="text-gray-600 mt-3">
                                네, 가능합니다. 3인 이상의 팀/기관 구매 시 연간 플랜에 추가 할인이 적용됩니다.
                                고객센터로 문의 주시면 빠르게 안내해 드리겠습니다.
                            </p>
                        </details>
                        <details className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <summary className="text-lg font-medium text-Bgreen">
                                라이선스 갱신 및 해지 정책은 어떻게 되나요?
                            </summary>
                            <p className="text-gray-600 mt-3">
                                라이선스는 선택하신 플랜(월/년) 단위로 자동 갱신됩니다. 갱신을 원치 않으실 경우,
                                언제든지 관리 페이지에서 자동 갱신을 해지할 수 있습니다.
                            </p>
                        </details>
                    </div>
                </section>
            </main>
        </div>
    );
}
