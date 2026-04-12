'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';

type Counselor = {
    id: string;
    name: string;
    email: string;
    user_id: string;
};

export default function CounselorsPage() {
    const [counselors, setCounselors] = useState<Counselor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCounselors = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.from('counselors').select('id, name, email, user_id');

                if (error) throw error;

                setCounselors(data);
            } catch (err) {
                console.error('코치 목록 불러오기 실패:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCounselors();
    }, []);

    if (loading) {
        return <div className="text-center text-lg">로딩 중...</div>;
    }

    if (counselors.length === 0) {
        return <div className="text-center text-gray-600">코치 정보가 없습니다.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-6">
            <h1 className="text-3xl font-bold text-center">코치 목록</h1>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-indigo-600 text-white">
                        <th className="py-3 px-6 text-left">이름</th>
                        <th className="py-3 px-6 text-left">스트레스요인</th>
                        <th className="py-3 px-6 text-left">상세보기</th>
                    </tr>
                </thead>
                <tbody>
                    {counselors.map((counselor) => (
                        <tr key={counselor.id} className="border-t hover:bg-indigo-100">
                            <td className="py-3 px-6">{counselor.name}</td>
                            <td className="py-3 px-6">{counselor.email}</td>
                            <td className="py-3 px-6">
                                <Link href={`/admins/counselors/${counselor.user_id}`}>
                                    <button className="text-indigo-600 hover:text-indigo-800">상세보기</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
