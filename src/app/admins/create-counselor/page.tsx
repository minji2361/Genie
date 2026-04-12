'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCounselorAccount } from '@/app/api/supabaseApi';

export default function CreateCounselorPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleCreateCounselor = async () => {
        try {
            const result = await createCounselorAccount(email, password, name, region);
            setMessage(result.message);
            setEmail('');
            setPassword('');
            setName('');

            if (result.success) {
                alert('계정이 생성되었습니다');
                router.push('/admins');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-5">
            <h1 className="text-2xl font-bold text-center">코치 계정 생성</h1>
            <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-md"
            />
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full p-3 border rounded-md">
                <option value="">지역 선택</option>
                <option value="도봉">도봉</option>
                <option value="성북">성북</option>
                <option value="노원">노원</option>
                <option value="중랑">중랑</option>
                <option value="강북">강북</option>
                <option value="대학">대학</option>
                <option value="새신자">새신자</option>
            </select>
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md"
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md"
            />
            <button
                onClick={handleCreateCounselor}
                className="w-full bg-primary text-black py-3 rounded-md hover:bg-primary-dark"
            >
                계정 생성
            </button>
            {message && <p className="text-center text-sm text-gray-700">{message}</p>}
        </div>
    );
}
