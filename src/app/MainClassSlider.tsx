'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';

interface SlideItem {
    id: number;
    title: string;
    image_url: string;
}

const MainClassSlider = () => {
    const [slides, setSlides] = useState<SlideItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedContents = async () => {
            const { data, error } = await supabase
                .from('contents')
                .select('id, title, image_url')
                .eq('is_featured', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('대표 컨텐츠 로딩 실패:', error.message);
            } else {
                setSlides(data ?? []);
            }

            setLoading(false);
        };

        fetchFeaturedContents();
    }, []);

    if (loading) {
        return <section className="py-20 bg-white text-center text-neutral-500">대표 컨텐츠 불러오는 중...</section>;
    }

    if (slides.length === 0) {
        return (
            <section className="py-20 bg-white text-center text-neutral-500">
                현재 설정된 대표 컨텐츠가 없습니다.
            </section>
        );
    }

    return (
        <section className="py-20 bg-Bbeige relative">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-left md:text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-Bgreen tracking-tight mb-3">
                        {'" Featured Content "'}
                    </h2>
                    <p className="text-neutral-600 text-base md:text-lg max-w-xl mx-auto">
                        reframepoint의 주요 프로그램을 소개합니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {slides.map((card) => (
                        <div
                            key={card.id}
                            className="h-full bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md flex flex-col cursor-pointer"
                        >
                            <div className="relative w-full h-48 md:h-56">
                                <Image
                                    src={card.image_url}
                                    alt={card.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-t-3xl"
                                />
                            </div>
                            <div className="flex-1 p-4 sm:p-5 flex items-center justify-center">
                                <h3 className="text-lg font-semibold text-neutral-800 text-center leading-snug line-clamp-2">
                                    {card.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MainClassSlider;
