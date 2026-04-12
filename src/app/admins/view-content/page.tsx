'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';

type Content = {
    id: number;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    is_featured: boolean;
    is_recommended: boolean;
};

export default function ViewContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('contents').select('*').order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching contents:', error.message);
        } else {
            setContents(data);
        }
        setLoading(false);
    };

    const toggleFeatured = async (id: number) => {
        const featuredCount = contents.filter((c) => c.is_featured).length;
        const target = contents.find((c) => c.id === id);
        if (!target) return;

        const willBeFeatured = !target.is_featured;

        if (willBeFeatured && featuredCount >= 5) {
            alert('대표 컨텐츠는 최대 5개까지 설정할 수 있습니다.');
            return;
        }

        setUpdatingId(id);

        const { error } = await supabase.from('contents').update({ is_featured: willBeFeatured }).eq('id', id);

        if (error) {
            alert('대표 설정 실패: ' + error.message);
        } else {
            setContents((prev) => prev.map((c) => (c.id === id ? { ...c, is_featured: willBeFeatured } : c)));
        }

        setUpdatingId(null);
    };

    const toggleRecommended = async (id: number) => {
        const recommendedCount = contents.filter((c) => c.is_recommended).length;
        const target = contents.find((c) => c.id === id);
        if (!target) return;

        const willBeRecommended = !target.is_recommended;

        if (willBeRecommended && recommendedCount >= 3) {
            alert('추천 컨텐츠는 최대 3개까지 설정할 수 있습니다.');
            return;
        }

        setUpdatingId(id);

        const { error } = await supabase.from('contents').update({ is_recommended: willBeRecommended }).eq('id', id);

        if (error) {
            alert('추천 설정 실패: ' + error.message);
        } else {
            setContents((prev) => prev.map((c) => (c.id === id ? { ...c, is_recommended: willBeRecommended } : c)));
        }

        setUpdatingId(null);
    };

    const deleteContent = async (id: number) => {
        const confirmed = confirm('정말 이 컨텐츠를 삭제하시겠습니까?');
        if (!confirmed) return;

        setUpdatingId(id);

        const { error } = await supabase.from('contents').delete().eq('id', id);

        if (error) {
            alert('삭제 실패: ' + error.message);
        } else {
            setContents((prev) => prev.filter((c) => c.id !== id));
        }

        setUpdatingId(null);
    };

    return (
        <div className="min-h-screen bg-neutral-100 px-4 py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-neutral-800 text-center">저장된 컨텐츠</h1>

                {loading ? (
                    <p className="text-center text-neutral-600">불러오는 중...</p>
                ) : contents.length === 0 ? (
                    <p className="text-center text-neutral-600">등록된 컨텐츠가 없습니다.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {contents.map((content) => (
                            <div
                                key={content.id}
                                className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition relative border-2 ${
                                    content.is_featured ? 'border-yellow-400' : 'border-transparent'
                                }`}
                            >
                                {content.image_url && (
                                    <Image
                                        src={content.image_url}
                                        alt={content.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4 space-y-2">
                                    <h2 className="text-xl font-semibold text-neutral-800">{content.title}</h2>
                                    <p className="text-sm text-neutral-600">{content.description}</p>
                                    <p className="text-xs text-neutral-400">
                                        {new Date(content.created_at).toLocaleString()}
                                    </p>
                                    <div className="flex gap-4 mt-2 flex-wrap">
                                        <button
                                            onClick={() => toggleFeatured(content.id)}
                                            disabled={updatingId === content.id}
                                            className={`text-sm font-semibold ${
                                                content.is_featured ? 'text-yellow-600' : 'text-blue-600'
                                            } hover:underline`}
                                        >
                                            {updatingId === content.id
                                                ? '처리 중...'
                                                : content.is_featured
                                                ? '대표 취소'
                                                : '대표 컨텐츠로 설정'}
                                        </button>
                                        <button
                                            onClick={() => toggleRecommended(content.id)}
                                            disabled={updatingId === content.id}
                                            className={`text-sm font-semibold ${
                                                content.is_recommended ? 'text-green-600' : 'text-purple-600'
                                            } hover:underline`}
                                        >
                                            {updatingId === content.id
                                                ? '처리 중...'
                                                : content.is_recommended
                                                ? '추천 취소'
                                                : '추천 컨텐츠로 설정'}
                                        </button>
                                        <button
                                            onClick={() => deleteContent(content.id)}
                                            disabled={updatingId === content.id}
                                            className="text-sm font-semibold text-red-600 hover:underline"
                                        >
                                            {updatingId === content.id ? '삭제 중...' : '삭제'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
