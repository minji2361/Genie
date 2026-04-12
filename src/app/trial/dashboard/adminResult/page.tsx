import { Suspense } from 'react';
import ResultPage from './ResultPage';

export default function AdminResultPage() {
    return (
        <Suspense fallback={<p>로딩 중...</p>}>
            <ResultPage />
        </Suspense>
    );
}
