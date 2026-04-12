import { NextResponse } from 'next/server';
import { insertAnswers } from '@/app/db';

export async function POST(request: Request) {
    try {
        const { clientid, answers, contact } = await request.json();

        if (!clientid || !contact || typeof answers !== 'object' || Object.keys(answers).length === 0) {
            return NextResponse.json(
                { message: '유효한 clientid와 답변 객체를 전달해야 합니다.' },
                { status: 400 }, // 잘못된 요청
            );
        }

        console.log('Received data:', { clientid, answers, contact });

        await insertAnswers(clientid, contact, answers);

        return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' }, { status: 200 });
    } catch (error: unknown) {
        // error가 Error 인스턴스인지 확인 후 처리
        if (error instanceof Error) {
            console.error('Error inserting data:', error.message);
            console.error('Error stack:', error.stack);
            return NextResponse.json(
                { message: '데이터 저장 중 오류가 발생했습니다.', error: error.message },
                { status: 500 }, // 서버 오류
            );
        }

        // 예상하지 못한 에러에 대한 처리
        console.error('Unknown error:', error);
        return NextResponse.json({ message: '데이터 저장 중 알 수 없는 오류가 발생했습니다.' }, { status: 500 });
    }
}
