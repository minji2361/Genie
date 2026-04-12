'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { brandColor } from '../lib/brandcolor';

export default function ReframePoint() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { session, login, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.replace('/dashboard');
        }
    }, [session, router]);

    if (session === undefined) {
        return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
    }

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await login(email, password);
        } catch {
            setError('이메일 또는 비밀번호가 잘못되었습니다.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            {session ? (
                <>
                    <section className="py-20 container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: brandColor.deepmoss }}>
                            우리의 미션
                        </h2>
                        <p className="text-lg text-gray-600">
                            ReframePoint는 교육을 통해 개인의 잠재력을 극대화합니다.
                        </p>
                    </section>
                    <button
                        className="px-4 py-2 rounded-md w-64 mt-4"
                        style={{ backgroundColor: brandColor.deepmoss, color: 'white' }}
                        onClick={logout}
                    >
                        로그아웃
                    </button>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4" style={{ color: brandColor.deepmoss }}>
                        코치 로그인
                    </h1>
                    <input
                        className="border p-2 mb-2 w-64 rounded"
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="border p-2 mb-2 w-64 rounded"
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p className="mb-2 font-semibold" style={{ color: brandColor.deepmoss }}>
                            {error}
                        </p>
                    )}
                    <button
                        className="px-4 py-2 rounded-md w-64 font-semibold"
                        style={{ backgroundColor: brandColor.deepmoss, color: 'white' }}
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </>
            )}
        </div>
    );
}
