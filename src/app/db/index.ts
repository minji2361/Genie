import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/* =====================
   타입
===================== */
export interface AnswerData {
    clientid: string;
    contact: string;
    answers: Record<string, number>;
    created_at: string;
}

/* =====================
   답변 저장
===================== */
export const insertAnswers = async (clientid: string, contact: string, answers: Record<string, number>) => {
    const supabase = createServerComponentClient({ cookies });

    const { error } = await supabase.from('responses').insert([
        {
            clientid,
            contact,
            answers,
        },
    ]);

    if (error) {
        console.error('Error inserting data:', error.message);
        throw new Error('답변 저장 오류');
    }
};

/* =====================
   전체 답변 조회
===================== */
export const getAnswers = async (): Promise<AnswerData[]> => {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.from('responses').select('clientid, contact, answers, created_at');

    if (error) {
        console.error('데이터 조회 오류:', error.message);
        throw new Error('데이터 조회 오류');
    }

    return data ?? [];
};

/* =====================
   특정 사용자 조회
===================== */
export const getIdAnswers = async (clientid: string): Promise<AnswerData | null> => {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
        .from('responses')
        .select('clientid, contact, answers, created_at')
        .eq('clientid', clientid)
        .single();

    if (error) {
        console.error('데이터 조회 오류:', error.message);
        return null;
    }

    return data;
};

/* =====================
   사용자 삭제
===================== */
export const deleteUser = async (clientid: string): Promise<void> => {
    const supabase = createServerComponentClient({ cookies });

    const { error } = await supabase.from('responses').delete().eq('clientid', clientid);

    if (error) {
        console.error('사용자 삭제 오류:', error.message);
        throw new Error('사용자 삭제 중 오류');
    }
};

// 도장(stamp) 업데이트
export const updateStamp = async (
    clientid: string,
    stampType: 'firststamp' | 'secondstamp' | 'thirdstamp' | 'laststamp',
): Promise<void> => {
    const supabase = createServerComponentClient({ cookies });

    const { error } = await supabase
        .from('responses')
        .update({ [stampType]: true })
        .eq('clientid', clientid);

    if (error) {
        console.error('도장 업데이트 오류:', error.message);
        throw new Error('도장 업데이트 오류');
    }
};

// 도장 상태 조회
