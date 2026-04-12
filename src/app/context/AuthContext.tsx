'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/auth-helpers-nextjs';
import { getSession, signIn, signOut, onAuthStateChange } from '../api/supabaseApi';

type AuthContextType = {
    session: Session | null | undefined;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null | undefined>(undefined);
    const router = useRouter();

    // 🔒 12시간(밀리초 단위)
    const EXPIRATION_TIME = 12 * 60 * 60 * 1000;

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            const loginTime = localStorage.getItem('login_time');

            if (session && loginTime) {
                const elapsed = Date.now() - Number(loginTime);
                if (elapsed > EXPIRATION_TIME) {
                    // 12시간 초과 → 자동 로그아웃
                    await handleAutoLogout();
                } else {
                    setSession(session);
                    // 남은 시간 후 자동 로그아웃 예약
                    scheduleLogout(EXPIRATION_TIME - elapsed);
                }
            } else {
                setSession(session);
            }
        };

        const handleAutoLogout = async () => {
            await signOut();
            setSession(null);
            localStorage.removeItem('login_time');
            router.replace('/login');
        };

        const scheduleLogout = (timeLeft: number) => {
            setTimeout(() => {
                handleAutoLogout();
            }, timeLeft);
        };

        checkSession();

        const { data: authListener } = onAuthStateChange((event, session) => {
            setSession(session);
            if (event === 'SIGNED_IN') {
                localStorage.setItem('login_time', Date.now().toString());
                // 새 로그인 시 12시간 후 자동 로그아웃 예약
                scheduleLogout(EXPIRATION_TIME);
            } else if (event === 'SIGNED_OUT') {
                localStorage.removeItem('login_time');
                router.replace('/login');
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [router]);

    const login = async (email: string, password: string) => {
        const { data, error } = await signIn(email, password);
        if (error) {
            alert('로그인 실패: ' + error.message);
        } else {
            setSession(data.session);
            localStorage.setItem('login_time', Date.now().toString());
            router.replace('/dashboard');
        }
    };

    const logout = async () => {
        await signOut();
        setSession(null);
        localStorage.removeItem('login_time');
        router.replace('/login');
    };

    return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
