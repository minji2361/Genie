'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';

export default function CounselorProfilePage() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        photoUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError || !user) {
                console.error('사용자 인증 실패', authError);
                return;
            }

            const { data, error } = await supabase
                .from('counselors')
                .select('name, email, photo_url')
                .eq('user_id', user.id)
                .single();

            if (error) {
                console.error('프로필 로드 실패', error);
            } else if (data) {
                setProfile({
                    name: data.name,
                    email: data.email,
                    photoUrl: data.photo_url ?? '',
                });
            }
        })();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreviewUrl(URL.createObjectURL(file));
    };

    const sanitizeFileName = (fileName: string): string => {
        const extension = fileName.split('.').pop();
        const baseName = fileName
            .replace(/\.[^/.]+$/, '') // 확장자 제거
            .replace(/[^a-zA-Z0-9_-]/g, ''); // 안전하지 않은 문자 제거
        const timestamp = Date.now();
        return `${baseName}_${timestamp}.${extension}`;
    };

    const handleSave = async () => {
        setLoading(true);

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            alert('사용자 인증 실패');
            setLoading(false);
            return;
        }

        let updatedPhotoUrl = profile.photoUrl;
        const file = fileInputRef.current?.files?.[0];

        if (file) {
            const safeFileName = sanitizeFileName(file.name);
            const { error: uploadError } = await supabase.storage.from('counselor-photos').upload(safeFileName, file);

            if (uploadError) {
                console.error('Storage 업로드 실패:', uploadError.message);
                alert('사진 업로드 실패: ' + uploadError.message);
                setLoading(false);
                return;
            }

            const {
                data: { publicUrl },
            } = supabase.storage.from('counselor-photos').getPublicUrl(safeFileName);

            updatedPhotoUrl = publicUrl;
        }

        const { error: dbError } = await supabase
            .from('counselors')
            .update({
                name: profile.name,
                email: profile.email,
                photo_url: updatedPhotoUrl,
            })
            .eq('user_id', user.id);

        setLoading(false);

        if (dbError) {
            console.error('DB 업데이트 실패:', dbError.message);
            alert('정보 수정 실패');
        } else {
            alert('정보가 업데이트되었습니다.');
            setPreviewUrl(null);
            setProfile((prev) => ({ ...prev, photoUrl: updatedPhotoUrl }));
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">코치 프로필 수정</h1>

            <div className="space-y-2">
                <label className="block font-medium">프로필 사진</label>
                {previewUrl ? (
                    <Image
                        src={previewUrl}
                        alt="미리보기"
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                ) : profile.photoUrl ? (
                    <Image
                        src={profile.photoUrl}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="w-[100px] h-[100px] bg-gray-200 rounded-full" />
                )}

                <button onClick={() => fileInputRef.current?.click()} className="text-sm text-blue-600 underline">
                    사진 변경
                </button>
                <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block font-medium">이름</label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">이메일</label>
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
            >
                {loading ? '저장 중...' : '저장'}
            </button>
        </div>
    );
}
