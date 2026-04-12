'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/supabase-js';

/* =====================
   타입
===================== */
interface Answer {
    clientid: string;
    contact: string;
    answers: Record<string, number>;
    created_at: string;
}

interface UserResult {
    clientid: string;
    name: string;
    contact: string;
    answers: Record<string, number>;
    created_at: string;
}

export default function DashboardPage() {
    const [userResults, setUserResults] = useState<UserResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [session, setSession] = useState<Session | null>(null);

    const router = useRouter();
    const supabase = createClientComponentClient();

    /* =====================
       로그인 체크
    ===================== */
    useEffect(() => {
        const checkAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.replace('/login');
            } else {
                setSession(session);
            }
        };
        checkAuth();
    }, []);

    /* =====================
       데이터 조회
    ===================== */
    useEffect(() => {
        if (!session) return;

        const fetchData = async () => {
            try {
                const response = await fetch('/api/getAnswers');
                if (!response.ok) throw new Error('서버 응답 오류');

                const data = await response.json();

                const results: UserResult[] = data.answers.map((answer: Answer) => ({
                    clientid: answer.clientid,
                    name: answer.clientid,
                    contact: answer.contact,
                    answers: answer.answers,
                    created_at: answer.created_at,
                }));

                results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                setUserResults(results);
            } catch (error) {
                console.error('데이터 로드 오류:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [session]);

    /* =====================
       이벤트
    ===================== */
    const handleViewDetails = (user: UserResult) => {
        router.push(`/trial/dashboard/adminResult?clientid=${user.clientid}`);
    };

    const handleDelete = async (clientid: string) => {
        if (!window.confirm('정말로 삭제하시겠습니까?')) return;

        try {
            const response = await fetch('/api/deleteUser', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientid }),
            });

            if (!response.ok) throw new Error('삭제 실패');

            setUserResults((prev) => prev.filter((user) => user.clientid !== clientid));
        } catch (error) {
            console.error('삭제 중 오류:', error);
        }
    };

    const filteredResults = userResults.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    /* =====================
       상태 처리
    ===================== */
    if (!session) {
        return <div className="text-center mt-10 text-gray-600">로그인 확인 중...</div>;
    }

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">로딩 중...</div>;
    }

    /* =====================
       UI
    ===================== */
    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-700">상담사 대시보드</h1>

            <div className="mb-6 text-center">
                <input
                    type="text"
                    placeholder="이름으로 검색..."
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-200 text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-3 px-4 border">이름</th>
                            <th className="py-3 px-4 border">연락처</th>
                            <th className="py-3 px-4 border">참여시간</th>
                            <th className="py-3 px-4 border">상세보기</th>
                            <th className="py-3 px-4 border">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((user) => {
                            // UTC → KST 보정
                            const korTime = new Date(new Date(user.created_at).getTime() - 9 * 60 * 60 * 1000);

                            return (
                                <tr key={user.clientid} className="text-center border-t hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{user.name}</td>
                                    <td className="py-2 px-4 border">{user.contact}</td>
                                    <td className="py-2 px-4 border">{korTime.toLocaleString('ko-KR')}</td>
                                    <td className="py-2 px-4 border">
                                        <button
                                            onClick={() => handleViewDetails(user)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            상세보기
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <button
                                            onClick={() => handleDelete(user.clientid)}
                                            className="text-red-500 hover:underline"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {filteredResults.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-4 text-gray-500 text-center">
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
