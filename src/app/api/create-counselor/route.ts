import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password, name, region } = body;

    if (!email || !password || !name || !region) {
        return NextResponse.json({ success: false, message: '모든 필드를 입력하세요.' }, { status: 400 });
    }

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError || !data?.user) {
        return NextResponse.json({ success: false, message: signUpError?.message || '회원가입 실패' }, { status: 400 });
    }

    const userId = data.user.id;

    const { error: insertError } = await supabase.from('counselors').insert([{ user_id: userId, name, email, region }]);

    if (insertError) {
        return NextResponse.json({ success: false, message: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: '코치 계정 생성 완료' });
}
