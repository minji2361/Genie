'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const types: Record<string, { name: string; tip: string }> = {
    A: {
        name: '개혁가',
        tip: '완벽함에 대한 압박을 내려놓고, 가벼운 산책이나 명상으로 마음을 비워보세요.',
    },
    B: {
        name: '조력자',
        tip: '다른 사람을 돕는 일에서 잠시 벗어나, 혼자만의 취미나 여유 시간을 가지세요.',
    },
    C: {
        name: '성취자',
        tip: '성과와 목표에서 잠시 떨어져, 아무 목적 없이 즐길 수 있는 활동을 해보세요.',
    },
    D: {
        name: '예술가',
        tip: '감정을 글, 그림, 음악 등 창의적인 방식으로 표현하며 마음을 풀어보세요.',
    },
    E: {
        name: '탐구자',
        tip: '끊임없는 정보 탐색에서 벗어나, 휴대폰을 끄고 자연 속에서 시간을 보내세요.',
    },
    F: {
        name: '충실한 유형',
        tip: '미래에 대한 걱정을 줄이고, 믿을 수 있는 사람과 가볍게 대화하세요.',
    },
    G: {
        name: '열정가',
        tip: '너무 많은 계획을 줄이고, 하루에 한두 가지 즐거운 일에 집중해보세요.',
    },
    H: {
        name: '지도자',
        tip: '책임에서 잠시 벗어나, 주도권을 내려놓고 편하게 쉬는 시간을 가지세요.',
    },
    I: {
        name: '평화주의자',
        tip: '갈등을 피하기보다, 솔직한 대화를 나누고 나만의 공간에서 충전하세요.',
    },
};

const calculateResult = (answers: Record<string, number>) => {
    const scores: Record<string, number> = {};

    Object.entries(answers).forEach(([questionId, score]) => {
        const group = questionId[0].toUpperCase();
        scores[group] = (scores[group] || 0) + score;
    });

    const maxType = Object.entries(scores).reduce<{ type: string; score: number }>(
        (prev, [type, score]) => (prev.score > score ? prev : { type, score }),
        { type: '', score: 0 }
    );

    return { maxType, scores };
};

export default function ResultPage() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState<{ type: string; score: number } | null>(null);
    const clientid = searchParams.get('clientid');

    useEffect(() => {
        const answersParam = searchParams.get('answers');
        if (answersParam) {
            const urlAnswers = answersParam.split(',').reduce((acc, item) => {
                const [id, score] = item.split('-');
                acc[id] = parseInt(score, 10);
                return acc;
            }, {} as Record<string, number>);

            const { maxType } = calculateResult(urlAnswers);
            setResult(maxType);
        }
    }, [searchParams]);

    if (!result || !result.type) return <p className="text-center text-gray-600">결과를 계산 중입니다...</p>;

    const { name, tip } = types[result.type];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-br from-green-100 to-blue-100">
            <p className="text-lg text-center mb-4 leading-relaxed">
                <strong className="text-green-600">{clientid}</strong>님의 성격 유형은{' '}
                <strong className="text-green-600">{name || '알 수 없음'}</strong>입니다.
            </p>

            <div className="mb-6 bg-white rounded-xl shadow-lg p-6 max-w-xl text-center">
                <p className="text-lg font-semibold text-gray-800 mb-2"></p>
                <p className="text-md text-gray-600">“{tip}”</p>
            </div>
        </div>
    );
}
