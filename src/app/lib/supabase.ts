'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// 타입 정의가 없으면 이렇게:
export const supabase = createClientComponentClient();
