'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/app/lib/questions';

export default function QuizPage() {
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [current, setCurrent] = useState<number>(0);
    const router = useRouter();

    const [clientid, setClientName] = useState<string | null>(null);
    const [contact, setContact] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('clientid');
        const contactParam = urlParams.get('contact');

        if (name) setClientName(name);
        if (contactParam) setContact(contactParam);
    }, []);

    const handleAnswer = (id: string, score: number) => {
        setAnswers((prev) => ({ ...prev, [id]: score }));
        if (current < questions.length - 1) {
            setCurrent(current + 1);
        }
    };

    const handleGoBack = () => {
        if (current > 0) {
            setAnswers((prev) => {
                const updated = { ...prev };
                delete updated[questions[current].id];
                return updated;
            });
            setCurrent(current - 1);
        }
    };

    const handleSubmitResults = async () => {
        if (!clientid || !contact) {
            alert('사용자 정보가 올바르지 않습니다.');
            return;
        }

        try {
            const response = await fetch('/api/submitAnswers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientid, contact, answers }),
            });

            if (response.ok) {
                alert('검사 결과가 저장되었습니다.');
                const queryString = Object.entries(answers)
                    .map(([key, value]) => `${key}-${value}`)
                    .join(',');

                router.push(
                    `/trial/emotion/result?clientid=${encodeURIComponent(clientid)}&contact=${encodeURIComponent(contact)}&answers=${queryString}`,
                );
            } else {
                alert('데이터 삽입 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4 py-10">
            <div className="relative bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
                {/* 아이콘 */}
                <div className="flex justify-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded-full bg-green-400 animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce delay-100"></div>
                    <div className="w-4 h-4 rounded-full bg-green-400 animate-bounce delay-200"></div>
                </div>

                {/* 진행 바 */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-green-400 transition-all duration-300"
                        style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>

                {/* 질문 */}
                <h2 className="text-xl font-semibold mb-6">{questions[current].question}</h2>

                {/* 응답 버튼 */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((score) => (
                        <button
                            key={score}
                            onClick={() => handleAnswer(questions[current].id, score)}
                            className="py-2 px-4 bg-green-200 hover:bg-green-300 rounded-md font-semibold transition"
                        >
                            {score}
                        </button>
                    ))}
                </div>

                {/* 뒤로가기 */}
                {current > 0 && (
                    <button onClick={handleGoBack} className="mt-2 text-sm text-blue-600 underline hover:text-blue-800">
                        ← 이전 질문으로
                    </button>
                )}
            </div>

            {/* 설명 */}
            <div className="text-sm text-gray-600 mt-4 text-center">
                1번은 매우 아니다, 2번은 아니다, 3번은 보통, 4번은 그렇다, 5번은 매우 그렇다
            </div>

            {/* 결과 버튼 */}
            {Object.keys(answers).length === questions.length && (
                <button
                    onClick={handleSubmitResults}
                    className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    결과 보기
                </button>
            )}
        </div>
    );
}
