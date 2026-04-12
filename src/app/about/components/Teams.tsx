'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/app/lib/supabase';

type Organization = {
    id: string;
    name: string;
    website: string;
    description: string;
    logo_url: string;
};

export default function TeamMembers() {
    const [teamData, setTeamData] = useState<Organization[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const { data, error } = await supabase
                    .from('organization')
                    .select('id, name, website, description, logo_url');

                if (error) throw error;
                setTeamData(data);
            } catch (err) {
                console.error('협력 단체 목록 불러오기 실패:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    return (
        <section className="py-24 px-6 bg-Blightbeige">
            <div className="container mx-auto">
                <h3 className="text-4xl font-extrabold text-center mb-6 text-Bblack">협력 단체</h3>
                <p className="text-lg text-center max-w-3xl mx-auto mb-16 leading-relaxed text-Bblack">
                    ReframePoint는 다양한 심리 전문 기관 및 코칭 및 상담 단체와 협력하여 더욱 전문적이고 신뢰성 있는
                    상담 서비스를 제공합니다.
                </p>

                {loading ? (
                    <p className="text-center text-Bblack font-medium">⏳ 불러오는 중...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {teamData.map((org) => (
                            <div
                                key={org.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col text-center border-2 border-Bgreen h-full"
                            >
                                {org.logo_url ? (
                                    <div className="relative h-24 w-24 mb-4 rounded-full overflow-hidden border bg-white shadow-sm mx-auto">
                                        <Image
                                            src={org.logo_url}
                                            alt={`${org.name} 로고`}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="h-24 w-24 flex items-center justify-center bg-Bgrey text-Bdark rounded-full mb-4 font-semibold text-sm mx-auto">
                                        로고 없음
                                    </div>
                                )}
                                <h4 className="text-xl font-bold text-Bblack mb-2">{org.name}</h4>
                                <p
                                    className="text-sm text-Bblack leading-relaxed mb-6 line-clamp-3"
                                    title={org.description}
                                >
                                    {org.description || '설명이 없습니다.'}
                                </p>
                                {org.website ? (
                                    <a
                                        href={org.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-block bg-Bgreen text-Benamel px-6 py-2 rounded-full font-semibold text-sm hover:bg-Byellow hover:text-white transition-all shadow-md hover:shadow-lg"
                                    >
                                        홈페이지 방문 →
                                    </a>
                                ) : (
                                    <p className="mt-auto text-sm text-Bdark">홈페이지 없음</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
