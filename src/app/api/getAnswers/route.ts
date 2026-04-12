import { getAnswers } from '@/app/db';

export async function GET() {
    const data = await getAnswers();

    if (!data || data.length === 0) {
        return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
    }

    // 전체 데이터를 그대로 반환
    return new Response(JSON.stringify({ answers: data }), { status: 200 });
}
