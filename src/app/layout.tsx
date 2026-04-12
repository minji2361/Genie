import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navigation from './Navigation';
import Footer from './about/components/Footer';

export const metadata = {
    title: 'ReframePoint | 리프레임포인트',
    description: 'Reframing through education | 교육을 통한 리프레임',
    keywords: ['ReframePoint', '리프레임포인트', '교육', '심리', '자기성찰', '자기이해'],
    openGraph: {
        title: 'ReframePoint | 리프레임포인트',
        description: '교육을 통한 리프레임, 리프레임포인트',
        url: 'https://reframepoint.co.kr',
        siteName: '리프레임포인트',
        locale: 'ko_KR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://reframepoint.co.kr', // 실제 도메인으로 변경하세요
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko">
            <body style={{ backgroundColor: '#faf8f4' }}>
                <AuthProvider>
                    <Navigation />
                    <main className="mt-[60px]">{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
