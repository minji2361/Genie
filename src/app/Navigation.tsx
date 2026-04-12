'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from './context/AuthContext';

export default function Navigation() {
    const [scrolling, setScrolling] = useState(false);
    const pathname = usePathname();
    const { session, logout } = useAuth();
    const isDashboardSection = Boolean(pathname?.startsWith('/dashboard'));

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={`fixed h-[60px] top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out bg-Bbeige ${
                    scrolling ? 'backdrop-blur-md shadow-lg' : ''
                }`}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="container mx-auto flex h-full justify-between items-center gap-2 px-4 sm:px-6">
                    <Link className="flex shrink-0 justify-center items-center min-w-0" href="/">
                        <Image
                            src="/Group 6.png"
                            alt="ReframePoint Logo"
                            width={60}
                            height={60}
                            priority
                            className="mr-2 size-10 sm:size-[60px]"
                        />
                        <h1 className="text-sm font-bold sm:text-base lg:text-xl">
                            <span className="text-Bgreen">Reframe</span>
                            <span className="text-Byellow">Point</span>
                        </h1>
                    </Link>

                    <nav className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-x-2 overflow-x-auto sm:gap-x-4 sm:space-x-2 lg:flex-none lg:space-x-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <Link
                            href="/about"
                            className="px-2 py-1 sm:px-3 text-sm sm:text-base rounded-full font-bold text-Bblack transition-colors duration-300 hover:bg-Byellow hover:text-black"
                        >
                            About
                        </Link>
                        {session ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="px-2 py-1 sm:px-3 text-sm sm:text-base rounded-full font-bold text-Bblack transition-colors duration-300 hover:bg-Byellow hover:text-black"
                                >
                                    대시보드
                                </Link>
                                {isDashboardSection && (
                                    <Link
                                        href="/dashboard/participant/new"
                                        className="px-2 py-1 sm:px-3 text-sm sm:text-base rounded-full font-bold text-Bblack transition-colors duration-300 hover:bg-Byellow hover:text-black whitespace-nowrap"
                                    >
                                        대상자 등록
                                    </Link>
                                )}
                                {session.user?.email === 'seouljdb@jdb.com' && (
                                    <Link
                                        href="/admins"
                                        className="px-2 py-1 sm:px-3 text-sm sm:text-base rounded-full font-bold text-Bblack transition-colors duration-300 hover:bg-Byellow hover:text-black"
                                    >
                                        관리자
                                    </Link>
                                )}
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="px-2 py-1 sm:px-3 text-sm sm:text-base rounded-full font-bold text-Bblack transition-colors duration-300 hover:bg-Byellow hover:text-black"
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-2 py-1 sm:px-3 text-sm sm:text-base rounded-full font-bold text-Bblack transition-colors duration-300 hover:bg-Byellow hover:text-black whitespace-nowrap"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </motion.header>
        </>
    );
}
