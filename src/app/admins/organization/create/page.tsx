'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';

export default function CreateOrganizationPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        let logoUrl: string | null = null;

        try {
            // 파일 업로드
            if (logoFile) {
                const fileExt = logoFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `organization-logos/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('organization-logos')
                    .upload(filePath, logoFile);

                if (uploadError) {
                    throw uploadError;
                }

                const { data } = supabase.storage.from('organization-logos').getPublicUrl(filePath);
                logoUrl = data?.publicUrl || null;
            }

            // 데이터 삽입
            const { error: insertError } = await supabase.from('organization').insert({
                name,
                website,
                description,
                logo_url: logoUrl,
            });

            if (insertError) {
                throw insertError;
            }

            router.push('/admins/organization');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6">단체 생성</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">단체명</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">홈페이지 주소</label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">간단 설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">메인 로고</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                        className="w-full"
                    />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neutral-800 text-white py-2 px-4 rounded hover:bg-neutral-700 transition"
                >
                    {isSubmitting ? '저장 중...' : '생성'}
                </button>
            </form>
        </div>
    );
}
