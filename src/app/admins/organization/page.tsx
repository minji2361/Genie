'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/app/lib/supabase';

type Organization = {
    id: number;
    name: string;
    website: string | null;
    description: string | null;
    logo_url: string | null;
};

export default function OrganizationListPage() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchOrganizations();
    }, []);

    async function fetchOrganizations() {
        setLoading(true);
        const { data, error } = await supabase.from('organization').select('*').order('id');

        if (error) {
            setMessage(`불러오기 오류: ${error.message}`);
        } else {
            setOrganizations(data ?? []);
        }

        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        const { error } = await supabase.from('organization').delete().eq('id', id);

        if (error) {
            setMessage(`삭제 실패: ${error.message}`);
        } else {
            setMessage('삭제 성공!');
            fetchOrganizations();
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-12">
            <h1 className="text-2xl font-bold mb-6">단체 목록</h1>
            {message && <p className="mb-4 text-red-500">{message}</p>}

            <div className="mb-4 text-right">
                <Link
                    href="/admins/organization/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + 단체 생성
                </Link>
            </div>

            {loading ? (
                <p>불러오는 중...</p>
            ) : organizations.length === 0 ? (
                <p>등록된 단체가 없습니다.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">이름</th>
                            <th className="border p-2">홈페이지</th>
                            <th className="border p-2">설명</th>
                            <th className="border p-2">로고</th>
                            <th className="border p-2">작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizations.map((org) => (
                            <tr key={org.id}>
                                <td className="border p-2">{org.name}</td>
                                <td className="border p-2">
                                    {org.website ? (
                                        <a
                                            href={org.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {org.website}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="border p-2">{org.description || '-'}</td>
                                <td className="border p-2">
                                    {org.logo_url ? (
                                        <div className="w-16 h-16 relative">
                                            <Image
                                                src={org.logo_url}
                                                alt={`${org.name} 로고`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => alert('수정 기능은 아직 구현 안 됨')}
                                        className="bg-yellow-400 px-3 py-1 rounded"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(org.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
