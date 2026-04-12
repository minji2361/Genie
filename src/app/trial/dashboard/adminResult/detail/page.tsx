// app/result/detail/page.tsx
'use client';

import Image from 'next/image';

export default function DetailPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 text-center text-green-700">상세 결과 보기</h1>
            <div className="flex justify-center">
                <Image
                    src="/pic.jpg" // public 폴더 기준 경로
                    alt="상세 결과 이미지"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md"
                />
            </div>
        </div>
    );
}
