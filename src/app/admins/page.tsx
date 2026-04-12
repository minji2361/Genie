'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../about/components/LoadingSpinner';
import Link from 'next/link';

export default function AdminPage() {
    const { session } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!session) {
            router.replace('/login');
            return;
        }
        if (session.user.email !== 'seouljdb@jdb.com') {
            router.replace('/unauthorized');
            return;
        }

        setIsLoading(false);
    }, [session, router]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-lg space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-neutral-800">관리자 페이지</h1>
                    <p className="text-neutral-500 text-base">원하는 작업을 선택하세요</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    <AdminButton href="/admins/counselors" label="코치 명단 확인" />
                    <AdminButton href="/admins/create-counselor" label="계정 생성" />
                    <AdminButton href="/admins/organization" label="단체 관리" />
                    <AdminButton href="/admins/create-content" label="컨텐츠 추가" />
                    <AdminButton href="/admins/view-content" label="컨텐츠 보기" />
                </div>
            </div>
        </div>
    );
}

function AdminButton({ href, label }: { href: string; label: string }) {
    return (
        <Link href={href} className="w-full">
            <button className="w-full py-4 px-6 bg-neutral-800 text-white rounded-xl text-base font-medium shadow-sm hover:bg-neutral-700 transition duration-200">
                {label}
            </button>
        </Link>
    );
}
