import { getIdAnswers } from '@/app/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    // URL에서 clientid 추출
    const { searchParams } = new URL(req.url);
    const clientid = searchParams.get('clientid');

    if (!clientid) {
        return new Response(JSON.stringify({ error: 'Missing clientid parameter' }), { status: 400 });
    }

    try {
        const data = await getIdAnswers(clientid);
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ answers: data }), { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
