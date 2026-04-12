'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Library, Users, Target, CheckCircle2 } from 'lucide-react';

import MainClassSlider from './MainClassSlider';
import Brandintro from './Brandintro';
import MainStatistics from './MainStatistics';

export default function Home() {
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <section className="bg-Bbeige relative w-full h-screen flex items-center justify-center overflow-hidden">
                <div className="relative flex -space-x-16">
                    <div className="w-[390px] h-[570px] bg-Bblack rounded-[240px] z-30 shadow-2xl flex flex-col items-center justify-center gap-6 text-center px-6 relative overflow-hidden">
                        <svg
                            className="absolute top-[60px] left-0 w-full h-40 z-40"
                            viewBox="0 0 400 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="
                                    M0 40
                                    C 50 10, 90 70, 120 40
                                    Q 125 10, 145 90
                                    Q 155 10, 175 90
                                    Q 185 10, 205 90
                                    Q 215 10, 235 90
                                    Q 245 10, 265 90
                                    Q 275 10, 295 90
                                    C 300 60, 350 20, 400 40
                                "
                                stroke="#E5DCCB"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="1000"
                                    to="0"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="stroke-dasharray"
                                    from="0,1000"
                                    to="1000,0"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </svg>

                        <div className="text-white font-semibold text-3xl leading-snug z-50 mt-4 relative">
                            welcome to <br />
                            <span className="text-Bgreen stroke-Bbeige">R</span>eframe{' '}
                            <span className="text-Byellow">P</span>oint
                            <p className="text-base text-gray-300 mt-2 font-normal">당신의 관점을 바꾸는 새로운 시작</p>
                        </div>

                        <Link
                            href="/about"
                            className="bg-Borange text-white font-semibold px-8 py-3 mt-4 rounded-full hover:opacity-90 transition z-50"
                        >
                            more...
                        </Link>
                    </div>

                    <div className="w-[390px] h-[570px] bg-white border-[10px] border-Bgreen rounded-[240px] z-20 shadow-xl flex flex-col items-center justify-center gap-4 px-6 relative">
                        <div className="absolute top-8 text-Bgreen text-[120px] font-bold rotate-[30deg]">R</div>

                        <Image
                            src="/Group 6.png"
                            alt="ReframePoint Logo"
                            width={100}
                            height={100}
                            priority
                        />

                        <div className="absolute bottom-8 text-Bgreen text-[120px] font-bold -rotate-[40deg]">P</div>
                    </div>

                    <div className="w-[390px] h-[570px] bg-Byellow rounded-[240px] z-10 shadow-xl opacity-80 relative overflow-hidden flex items-center justify-center">
                        <div className="w-full relative">
                            <Image
                                src="/bright.png"
                                alt="Box background"
                                width={390}
                                height={0}
                                className="h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Brandintro />
            <MainStatistics />
            <MainClassSlider />

            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-Bblack mb-4">Why Reframe Point?</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        우리는 당신의 성장을 위한 최고의 환경을 제공합니다. 체계적인 콘텐츠와 커뮤니티를 통해 변화를
                        경험하세요.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                            <Library
                                className="w-16 h-16 mx-auto mb-4 text-Bgreen"
                                strokeWidth={1.5}
                            />
                            <h3 className="text-2xl font-bold text-Bgreen mb-2">엄선된 고품질 콘텐츠</h3>
                            <p className="text-gray-600">
                                각 분야 전문가들이 제작한 깊이 있는 콘텐츠를 무제한으로 이용하세요.
                            </p>
                        </div>
                        <div className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                            <Users
                                className="w-16 h-16 mx-auto mb-4 text-Bgreen"
                                strokeWidth={1.5}
                            />
                            <h3 className="text-2xl font-bold text-Bgreen mb-2">성장을 돕는 커뮤니티</h3>
                            <p className="text-gray-600">
                                같은 목표를 가진 사람들과 교류하며 동기부여를 얻고 함께 성장하세요.
                            </p>
                        </div>
                        <div className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                            <Target
                                className="w-16 h-16 mx-auto mb-4 text-Bgreen"
                                strokeWidth={1.5}
                            />
                            <h3 className="text-2xl font-bold text-Bgreen mb-2">개인 맞춤형 성장 계획</h3>
                            <p className="text-gray-600">
                                나의 현재 상태를 진단하고, 목표 달성을 위한 최적의 로드맵을 제공받으세요.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-Bbeige">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-Bblack mb-4">당신에게 맞는 플랜을 선택하세요</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        모든 플랜에서 리프레임포인트의 핵심 기능을 자유롭게 이용할 수 있습니다. 언제든지 해지
                        가능합니다.
                    </p>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
                        <div className="bg-white rounded-lg p-8 w-full max-w-sm border border-gray-200">
                            <h3 className="text-2xl font-bold text-Bblack">월간 구독</h3>
                            <p className="text-gray-500 mt-2">부담없이 시작하고 싶다면</p>
                            <p className="text-5xl font-bold text-Bblack my-6">
                                ₩79,000<span className="text-lg font-normal text-gray-500">/월</span>
                            </p>
                            <ul className="space-y-4 text-left">
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-Bgreen flex-shrink-0" />
                                    <span className="ml-3">전체 콘텐츠 무제한 이용</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-Bgreen flex-shrink-0" />
                                    <span className="ml-3">커뮤니티 참여 가능</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-Bgreen flex-shrink-0" />
                                    <span className="ml-3">월간 성장 리포트 제공</span>
                                </li>
                            </ul>
                            <Link
                                href="/subscribe"
                                className="w-full mt-8 block bg-gray-200 text-Bblack font-bold py-3 rounded-lg hover:bg-gray-300 transition text-center"
                            >
                                월간 플랜으로 시작
                            </Link>
                        </div>

                        <div className="bg-Bgreen text-white rounded-lg p-8 w-full max-w-sm border-2 border-Borange relative shadow-2xl">
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-Borange text-white px-4 py-1 rounded-full text-sm font-semibold">
                                가장 인기 있는 선택
                            </div>
                            <h3 className="text-2xl font-bold">연간 구독</h3>
                            <p className="text-green-200 mt-2">가장 합리적인 선택</p>
                            <p className="text-5xl font-bold my-6">
                                ₩59,000<span className="text-lg font-normal text-green-200">/월</span>
                            </p>
                            <p className="text-yellow-300 font-semibold mb-6">연 708,000원 (25% 이상 할인)</p>
                            <ul className="space-y-4 text-left">
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                                    <span className="ml-3">전체 콘텐츠 무제한 이용</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                                    <span className="ml-3">커뮤니티 참여 가능</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                                    <span className="ml-3">월간 성장 리포트 제공</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                                    <span className="ml-3 font-bold">프리미엄 워크숍 초대권</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
                                    <span className="ml-3 font-bold">전문가 1:1 코칭 세션 (연 1회)</span>
                                </li>
                            </ul>
                            <Link
                                href="/subscribe"
                                className="w-full mt-8 block bg-Borange text-white font-bold py-3 rounded-lg hover:opacity-90 transition text-center"
                            >
                                25% 이상 할인받고 시작하기
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full bg-gradient-to-b from-black via-gray-900 to-gray-800 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/back.jpg"
                        alt="Background texture"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        placeholder="blur"
                        blurDataURL="/netflix-texture-placeholder.jpg"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto py-20 px-6 text-center text-white space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">망설일 이유가 없습니다.</h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        지금 바로 시작하고 당신의 잠재력을 깨워보세요. 최고의 투자는 바로 자신에게 하는 투자입니다.
                    </p>
                    <Link
                        href="/subscribe"
                        className="inline-block bg-Borange text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-red-700 transition-colors"
                    >
                        내게 맞는 플랜 찾아보기
                    </Link>
                    <p className="text-sm text-gray-400">구독은 언제든지 해지 가능합니다.</p>
                </div>
            </section>
        </div>
    );
}
