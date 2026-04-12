'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Link from 'next/link';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const types: Record<string, { name: string; plant: string }> = {
    A: { name: '개혁가', plant: '루꼴라' },
    B: { name: '조력자', plant: '' },
    C: { name: '성취자', plant: '해바라기' },
    D: { name: '예술가', plant: '팬지' },
    E: { name: '탐구자', plant: '바질' },
    F: { name: '충실한 유형', plant: '상추' },
    G: { name: '열정가', plant: '방울토마토' },
    H: { name: '지도자', plant: '고추' },
    I: { name: '평화주의자', plant: '라벤더' },
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
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartScores, setChartScores] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const clientid = searchParams.get('clientid');
    const testDate = new Date().toLocaleDateString();

    useEffect(() => {
        if (!clientid) return;

        const fetchAnswers = async () => {
            try {
                const response = await fetch(`/api/getIdAnswers?clientid=${clientid}`);
                const data = await response.json();

                if (response.ok && data.answers) {
                    const { maxType, scores } = calculateResult(data.answers.answers);
                    setResult(maxType);

                    const labels = Object.keys(types).map((key) => types[key].name);
                    const values = Object.keys(types).map((key) => scores[key] || 0);

                    setChartLabels(labels);
                    setChartScores(values);
                }
            } catch (error) {
                console.error('Error fetching answers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnswers();
    }, [clientid]);

    if (loading) return <p className="text-center mt-10 text-gray-600">결과를 불러오는 중...</p>;
    if (!result || !result.type) return <p className="text-center mt-10 text-red-500">결과를 계산할 수 없습니다.</p>;

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: '성격 점수',
                data: chartScores,
                backgroundColor: 'rgba(16, 185, 129, 0.3)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 15,
                ticks: {
                    stepSize: 1,
                    backdropColor: 'transparent',
                },
                pointLabels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-green-700 text-center">성격 유형 검사 결과</h1>

                <div className="text-sm text-gray-500 mb-4 text-center">
                    <p>
                        <strong>검사 ID:</strong> {clientid}
                    </p>
                    <p>
                        <strong>검사 날짜:</strong> {testDate}
                    </p>
                </div>

                <p className="text-center text-lg mb-6">
                    당신의 주요 성격 유형은 <strong className="text-green-600">{types[result.type]?.name}</strong>
                    입니다.
                </p>

                <div className="w-full max-w-3xl mx-auto mb-8">
                    <Radar data={chartData} options={chartOptions} />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">유형</th>
                                <th className="px-4 py-2 border">설명</th>
                                <th className="px-4 py-2 border">점수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(types).map((typeKey, idx) => (
                                <tr
                                    key={typeKey}
                                    className={
                                        result.type === typeKey ? 'bg-green-50 font-semibold text-green-800' : ''
                                    }
                                >
                                    <td className="px-4 py-2 border">{typeKey}</td>
                                    <td className="px-4 py-2 border">{types[typeKey].name}</td>
                                    <td className="px-4 py-2 border">{chartScores[idx]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-6">
                    <Link
                        href={`/trial/dashboard/adminResult/detail`}
                        className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                        상세보기
                    </Link>
                </div>
            </div>
        </div>
    );
}
