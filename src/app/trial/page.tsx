'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TrialReframeBox() {
    const router = useRouter();

    const handleStart = () => {
        router.push('/trial/emotion');
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔍 당신은 어떤 사람인가요?</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
                우리는 자신을 안다고 생각하지만, 진짜 나를 볼 기회는 많지 않습니다.
                <br />
                짧은 질문을 통해 <span className="text-green-600 font-semibold">당신의 성향을 다시 바라보는 체험</span>
                을 해보세요.
                <br />
                <span className="italic text-gray-500">— 당신도 몰랐던 당신을 만날지도 몰라요.</span>
            </p>

            <button
                onClick={handleStart}
                className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg rounded-lg shadow transition"
            >
                🌿 지금 체험해보기
            </button>
        </div>
    );
}
