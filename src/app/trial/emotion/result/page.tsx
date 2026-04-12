import { Suspense } from 'react';
import EmotionResultPageClient from './EmotionResultPageClient';

export default function AdminResultPage() {
    return (
        <Suspense fallback={<p>로딩 중...</p>}>
            <EmotionResultPageClient />
        </Suspense>
    );
}
