'use client';

import React from 'react';
import { motion } from 'framer-motion';

const historyData = [
    {
        year: '2022',
        event: 'ReframePoint 설립',
        description: '멘토들의 재능기부로 시작된 내면 성장과 변화의 여정이 시작되었습니다.',
    },
    {
        year: '2023',
        event: 'Insight Journey 프로그램 운영 개시',
        description: '전문 멘토들과 함께 맞춤형 내면 탐색 프로그램으로 참여자들의 삶에 긍정적 변화를 도모했습니다.',
    },
    {
        year: '2024',
        event: 'CorePath Initiative 서비스 런칭',
        description: '더 많은 사람들이 깊은 내면 성장을 경험할 수 있도록 체계적인 프로그램을 제공합니다.',
    },
];

export default function HistorySection() {
    return (
        <section className="py-24 container mx-auto px-6 ">
            <motion.h3
                className="text-4xl font-extrabold text-center mb-20 tracking-tight text-Bgreen"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                ReframePoint 연혁
            </motion.h3>

            <div className="relative max-w-3xl mx-auto">
                {/* 세로 라인 */}
                <div className="absolute top-2 left-5 h-full w-1 bg-Bgreen rounded"></div>

                {historyData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative pl-16 mb-16 last:mb-0"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 }}
                    >
                        {/* 타임라인 원 */}
                        <div className="absolute left-0 top-1.5 w-4 h-4 bg-Bgreen rounded-full shadow-md"></div>

                        {/* 타임라인 텍스트 */}
                        <div className="flex items-center space-x-4">
                            <time className="text-sm font-medium tracking-wide w-16 text-Byellow">{item.year}</time>
                            <h4 className="text-xl font-semibold text-Byellow">{item.event}</h4>
                        </div>

                        <p className="mt-2 leading-relaxed text-sm max-w-xl text-Bdark">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
