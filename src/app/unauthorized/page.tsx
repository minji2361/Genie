'use client';

import Link from 'next/link';
import React from 'react';

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
            <h1 className="text-6xl font-extrabold text-red-600 mb-4">403</h1>
            <h2 className="text-3xl font-semibold mb-6">접근 권한이 없습니다</h2>
            <p className="text-gray-700 mb-8 text-center max-w-md">
                이 페이지에 접근할 권한이 없습니다. 로그인하거나 권한이 있는 계정으로 시도해 주세요.
            </p>
            <Link href="/" className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                메인 페이지로 이동
            </Link>
        </div>
    );
}
