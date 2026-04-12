'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Content = {
    id: number;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    is_featured: boolean;
    is_recommended: boolean;
};

const MainFeatures = () => {
    const [recommended, setRecommended] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecommended();
    }, []);

    const fetchRecommended = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contents')
            .select('*')
            .eq('is_recommended', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('추천 컨텐츠 가져오기 실패:', error.message);
        } else {
            setRecommended(data);
        }

        setLoading(false);
    };

    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">추천 컨텐츠</h2>

                {loading ? (
                    <p className="text-center text-neutral-500">불러오는 중...</p>
                ) : recommended.length === 0 ? (
                    <p className="text-center text-neutral-500">추천된 컨텐츠가 없습니다.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommended.map((content) => (
                            <motion.div
                                key={content.id}
                                className="bg-neutral-50 rounded-xl shadow hover:shadow-md transition overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {content.image_url && (
                                    <Image
                                        src={content.image_url}
                                        alt={content.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-semibold text-neutral-800">{content.title}</h3>
                                    <p className="text-sm text-neutral-600">{content.description}</p>
                                    <p className="text-xs text-neutral-400">
                                        {new Date(content.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MainFeatures;
