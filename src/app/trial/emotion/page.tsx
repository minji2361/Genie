'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState(''); // ✅ 연락처 추가
    const router = useRouter();

    const handleStartTest = () => {
        if (name.trim() === '') {
            alert('이름을 입력해 주세요.');
            return;
        }

        if (contact.trim() === '') {
            alert('연락처를 입력해 주세요.');
            return;
        }

        router.push(`/trial/emotion/quiz?clientid=${encodeURIComponent(name)}&contact=${encodeURIComponent(contact)}`);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute w-72 h-72 bg-yellow-200 rounded-full opacity-30 top-[-50px] left-[-50px] animate-pulse"></div>
            <div className="absolute w-72 h-72 bg-blue-200 rounded-full opacity-30 bottom-[-50px] right-[-50px] animate-pulse"></div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md z-10 text-center"
            >
                <div className="flex justify-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce delay-100"></div>
                    <div className="w-4 h-4 rounded-full bg-green-400 animate-bounce delay-200"></div>
                </div>

                <h1 className="text-2xl font-bold mb-2">🌱 성격 유형 검사 🌱</h1>
                <p className="text-gray-600 mb-6">간단한 질문에 답하고, 당신에게 맞는 해소 방법을 찾아보세요!</p>

                {/* 이름 */}
                <motion.input
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    whileFocus={{ scale: 1.05 }}
                />

                {/* 연락처 */}
                <motion.input
                    type="text"
                    placeholder="연락처 (01012345678)"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    whileFocus={{ scale: 1.05 }}
                />

                <motion.button
                    onClick={handleStartTest}
                    className="w-full py-2 bg-green-400 hover:bg-green-500 text-white rounded-md font-semibold transition"
                    whileHover={{ scale: 1.1 }}
                >
                    🍀 테스트 시작하기 🍀
                </motion.button>
            </motion.div>
        </div>
    );
}
