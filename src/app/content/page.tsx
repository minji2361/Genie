'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/app/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// -------------------------------
// 마인드 포인트 (그룹 컨설팅)
// -------------------------------
function MindPointPage() {
    const faqs = [
        {
            question: '프로그램 참여 대상은 어떻게 되나요?',
            answer: '20대에서 30대 초반 청년층을 대상으로 합니다. 자신을 탐구하고 성장하고 싶은 모든 분들을 환영합니다.',
        },
        {
            question: '프로그램은 언제 진행되나요?',
            answer: '총 3주 동안 주 2회, 총 4회 진행됩니다. 구체적인 요일과 시간은 신청 페이지에서 확인해주세요.',
        },
        {
            question: '준비물이나 사전 지식이 필요한가요?',
            answer: '아니요, 특별한 준비물이나 사전 지식은 필요하지 않습니다. 편안한 마음으로 참여하시면 됩니다.',
        },
        { question: '온라인으로 진행되나요?', answer: '모든 과정은 오프라인, 대면으로 진행 됩니다.' },
        {
            question: '프로그램은 어떤 방식으로 진행되나요?',
            answer: '소규모 그룹으로 진행되며, 각 회차별 주제에 맞춰 개인적인 성찰과 그룹 내 공유를 통해 함께 성장하는 방식입니다.',
        },
    ];

    const expectations = [
        '정체성 혼란 극복 → “나는 누구인가?”에 대한 답을 찾아갑니다.',
        '가치 명료화 → 나만의 핵심 가치와 삶의 우선순위를 세웁니다.',
        '삶의 의미와 소명 발견 → 단순한 진로를 넘어 ‘내가 존재하는 이유’를 성찰합니다.',
        '나만의 서사 구축 → 나의 이야기를 서사로 정리하고 미래를 설계합니다.',
        '지속 가능한 성장을 위한 발판 마련 → 이후에도 스스로 성장할 수 있는 토대를 마련합니다.',
    ];

    const recommend = [
        '“나는 누구인가?”라는 질문을 하고 계신 분',
        '진로, 가치, 인간관계 속에서 방향성을 잃었다고 느끼는 분',
        '미래에 대한 불안감과 내면의 혼란을 느끼는 분',
        '일시적 동기부여가 아닌 지속 가능한 성장 기반을 찾고 싶은 분',
        '자기 성찰을 넘어 진정한 자기 실현을 꿈꾸는 분',
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="font-sans text-gray-900">
            {/* Hero Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center md:justify-start">
                        <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-200/50">
                            <Image
                                src="/poster.jpg"
                                alt="마인드 포인트 포스터"
                                width={600}
                                height={800}
                                layout="responsive"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <p className="text-indigo-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                            2025 청년 성장 프로그램
                        </p>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-2">
                            MIND POINT
                        </h1>
                        <p className="mb-4">“당신의 마음이 머무는 지점, 삶의 의미가 시작되는 좌표.”</p>
                        <p className="text-lg text-gray-700 mb-6">
                            <span className="font-semibold text-gray-800">3주 (주 2회, 총 4회)</span> 자기 성장 프로그램
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Link
                                href="https://www.latpeed.com/products/bctks"
                                target="_blank"
                                className="px-20 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-sm hover:bg-indigo-600 transition-all"
                            >
                                신청하기
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 기대 효과 */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">🎯 기대 효과</h2>
                    <ul className="space-y-4">
                        {expectations.map((item, i) => (
                            <li
                                key={i}
                                className="bg-gray-50 p-4 rounded-lg border"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 추천 대상 */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">🚀 이런 분들에게 추천합니다</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recommend.map((r, i) => (
                            <div
                                key={i}
                                className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {r}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">⁉️ 자주 묻는 질문</h2>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="border rounded-lg mb-4"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex justify-between items-center p-4 text-left"
                            >
                                <span className="font-semibold">{faq.question}</span>
                                <ChevronRight className={`transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 border-t text-gray-600"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// -------------------------------
// 마인드 포인트 (개별 컨설팅 = 기존 Contents)
// -------------------------------
function Contents() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [contents, setContents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState<number | null>(null);

    useEffect(() => {
        const fetchContents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('contents')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) setContents(data);
            setLoading(false);
        };
        fetchContents();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-center text-Bgreen">마인드 포인트(개별)</h2>

                {loading ? (
                    <p className="text-center mt-10 text-gray-500">불러오는 중...</p>
                ) : contents.length === 0 ? (
                    <p className="text-center mt-10 text-gray-500">등록된 컨텐츠가 없습니다.</p>
                ) : (
                    <div className="mt-12 space-y-6">
                        {contents.map((content) => (
                            <div
                                key={content.id}
                                className="bg-white border rounded-xl hover:bg-Bbeige/20 transition-colors"
                            >
                                <button
                                    onClick={() => setOpenId(openId === content.id ? null : content.id)}
                                    className="w-full flex justify-between items-center p-6 text-left"
                                >
                                    <h4 className="text-xl font-semibold text-Bgreen">{content.title}</h4>
                                    <ChevronRight
                                        className={`transition-transform ${
                                            openId === content.id ? 'rotate-90 text-Bgreen' : 'text-gray-400'
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openId === content.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="p-6 border-t"
                                        >
                                            {content.image_url && (
                                                <Image
                                                    src={content.image_url}
                                                    alt={content.title}
                                                    width={400}
                                                    height={200}
                                                    className="rounded-lg mb-4"
                                                />
                                            )}
                                            <p className="text-gray-700">{content.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

type FaqItem = { q: string; a: string };
type CurriculumItem = {
    week: string;
    roman: string;
    title: string;
    subTitle: string;
    desc: string;
};

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function SectionTitle({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
    return (
        <div className="text-center max-w-3xl mx-auto">
            {eyebrow && <p className="text-xs tracking-[0.35em] uppercase text-white/60">{eyebrow}</p>}
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-white">{title}</h2>
            {desc && <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">{desc}</p>}
        </div>
    );
}

function StatRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-5 border-b border-white/10">
            <div className="md:w-48 text-white/60 font-medium">{label}</div>
            <div className="text-white text-lg md:text-xl font-light">{value}</div>
        </div>
    );
}

function NumberedList({ items }: { items: string[] }) {
    return (
        <ul className="divide-y divide-white/10 border-y border-white/10">
            {items.map((t, i) => (
                <li
                    key={i}
                    className="group flex gap-5 items-start py-6 px-4 hover:bg-white/[0.03] transition"
                >
                    <div className="w-12 shrink-0 font-serif text-xl text-amber-200/70 group-hover:text-amber-200 transition">
                        {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="text-white/80 group-hover:text-white transition leading-relaxed">{t}</div>
                </li>
            ))}
        </ul>
    );
}

function FeatureGrid({ items }: { items: { title: string; desc: string }[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {items.map((it, idx) => (
                <div
                    key={idx}
                    className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8 hover:bg-white/[0.04] transition"
                >
                    <div className="flex items-center gap-4">
                        <div className="font-serif text-2xl text-amber-200/70 group-hover:text-amber-200 transition">
                            {String(idx + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white">{it.title}</h3>
                    </div>
                    <div className="mt-5 h-px w-full bg-white/10 group-hover:bg-amber-200/30 transition" />
                    <p className="mt-5 text-white/75 leading-relaxed">{it.desc}</p>
                </div>
            ))}
        </div>
    );
}

function Curriculum({ items }: { items: CurriculumItem[] }) {
    const [open, setOpen] = useState(0);

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
                {items.map((it, idx) => {
                    const isOpen = open === idx;
                    return (
                        <div
                            key={idx}
                            className="border-b border-white/10 last:border-b-0"
                        >
                            <button
                                onClick={() => setOpen(isOpen ? -1 : idx)}
                                className="w-full text-left p-6 md:p-8 hover:bg-white/[0.03] transition relative"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200/90 to-amber-400/20" />
                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-5 md:gap-8">
                                        <div className="w-12 text-center font-serif text-2xl text-amber-200/80">
                                            {it.roman}
                                        </div>
                                        <div>
                                            <div className="text-xs tracking-[0.25em] uppercase text-white/50">
                                                {it.week}
                                            </div>
                                            <div className="mt-1 text-lg md:text-2xl font-semibold text-white">
                                                {it.title}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`text-2xl font-light text-white/60 transition-transform ${
                                            isOpen ? 'rotate-45' : ''
                                        }`}
                                    >
                                        +
                                    </div>
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 md:px-8 pb-8 md:pl-[7.25rem]">
                                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
                                                <div className="text-amber-200 font-semibold">{it.subTitle}</div>
                                                <p className="mt-3 text-white/75 leading-relaxed">{it.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
            <p className="mt-4 text-center text-white/50 text-sm">4주간의 밀도 있는 항해</p>
        </div>
    );
}

function Timeline() {
    const items = [
        {
            time: '00:00 - 00:30',
            title: '도입 강의',
            desc: '오늘 다룰 질문의 배경과 깊이를 여는 시간',
        },
        {
            time: '00:30 - 01:30',
            title: '그룹 토의',
            desc: '텍스트에 비추어 나의 질문을 세우고, 그룹 멤버들과 논의',
        },
        {
            time: '01:30 - 02:00',
            title: '랩업 및 개인 선언',
            desc: '오늘 발견한 질문을 한 문장으로 정리하고 나누는 시간',
        },
    ];

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="relative pl-6 md:pl-10">
                <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                <div className="space-y-8">
                    {items.map((it, idx) => (
                        <div
                            key={idx}
                            className="relative group"
                        >
                            <div className="absolute -left-[0.45rem] top-2 w-3 h-3 rounded-full border-2 border-amber-200/50 bg-black group-hover:bg-amber-200/70 group-hover:border-amber-200 transition" />
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 hover:bg-white/[0.04] transition">
                                <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs tracking-widest text-white/70">
                                    {it.time}
                                </div>
                                <h3 className="mt-3 text-lg md:text-2xl font-semibold text-white">{it.title}</h3>
                                <p className="mt-2 text-white/70 leading-relaxed">{it.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FAQ({ items }: { items: FaqItem[] }) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
                {items.map((it, i) => {
                    const isOpen = open === i;
                    return (
                        <div
                            key={i}
                            className="border-b border-white/10 last:border-b-0"
                        >
                            <button
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left hover:bg-white/[0.03] transition"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="font-serif text-2xl text-amber-200/80">Q.</span>
                                    <span className="text-white font-medium text-lg md:text-xl leading-snug">
                                        {it.q}
                                    </span>
                                </div>
                                <ChevronRight
                                    className={`shrink-0 text-white/60 transition-transform ${
                                        isOpen ? 'rotate-90' : ''
                                    }`}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 md:px-8 pb-8 md:pl-[5.25rem]">
                                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
                                                <p className="text-white/75 leading-relaxed">
                                                    <span className="text-amber-200/80 font-semibold mr-2">A.</span>
                                                    {it.a}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function DeepQuestionPage() {
    const recommend = useMemo(
        () => [
            '생각은 많은데 결정이 잘 내려지지 않는 분',
            '삶의 방향에 대한 고민으로 생각이 복잡한 분',
            '나 자신에 대한 질문이 있으신 분',
            '토의를 통해 사고를 더 깊게 확장하고 싶은 분',
            '‘정답 찾기’가 아니라 ‘질문 세우기’를 훈련하고 싶은 분',
        ],
        []
    );

    const features = useMemo(
        () => [
            {
                title: '텍스트 기반 사고 훈련',
                desc: '성경과 고전의 맥락을 이해하고, 그 안에서 인간 존재에 대한 근본 질문을 발견합니다.',
            },
            {
                title: '강의 + 팀 토의 결합 구조',
                desc: '강의로 사고의 틀을 얻고, 팀 토의로 질문을 구조화하고 검증합니다.',
            },
            {
                title: '퍼실리에이션 코칭',
                desc: '질문이 피상적으로 흐르지 않도록, 퍼실리에이터가 각 팀을 순회하며 질문의 깊이를 끝까지 밀어줍니다.',
            },
            {
                title: '‘나만의 질문’ 완성',
                desc: '4회가 끝나면, 참가자는 삶에 적용 가능한 핵심 질문 1~3개를 갖게 됩니다.',
            },
        ],
        []
    );

    const bibleQs = useMemo(
        () => [
            '• 고통의 한가운데서 우리는 무엇을 물어야 하는가? (욥기)',
            '• 끝없는 욕망 속에서 삶의 의미는 어떻게 찾는가? (전도서)',
            '• 나의 부서짐은 어떻게 새로운 시작이 될 수 있는가? (다윗의 시편)',
        ],
        []
    );

    const curriculum = useMemo<CurriculumItem[]>(
        () => [
            {
                roman: 'Ⅰ',
                week: 'Week 01',
                title: '태초를 향한 질문',
                subTitle: '우리는 어디에서 왔는가',
                desc: '우리의 기원과 시작, 그리고 그 탐구를 향한 질문의 근원을 태초의 이야기로부터 발견합니다.',
            },
            {
                roman: 'Ⅱ',
                week: 'Week 02',
                title: '너 어디에 있느냐?',
                subTitle: '우리는 왜 고통받는가',
                desc: '인간의 불행과 고통은 어디에서 비롯되었었을까? 오랜 옛날부터 인간이 던져온 이 깊은 질문을 아담과 하와, 그리고 선악과 이야기 속에서 탐구합니다.',
            },
            {
                roman: 'Ⅲ',
                week: 'Week 03',
                title: '네 이름이 무엇이냐?',
                subTitle: '사람은 변할 수 있을까',
                desc: '우리는 무언가 되고자하는 욕망이 있습니다. 내가 되고 싶은 나로 변화하기 위해 갖춰야 할 것, 시작하기 위해 필요한 이야기를 아브라함과 야곱을 통해 탐구합니다.',
            },
            {
                roman: 'Ⅳ',
                week: 'Week 04',
                title: '너희는 나를 누구라고 하느냐?',
                subTitle: '예수, 구원자인가 인간인가',
                desc: '인류 역사에서 가장 큰 영향을 끼친 한 사람을 둔 여러가지 질문, 엇갈리는 시각을 통해 우리는 어디에서 와서 어디로 가야하는지 탐구합니다.',
            },
        ],
        []
    );

    const faq = useMemo<FaqItem[]>(
        () => [
            {
                q: '종교가 없어도 참여할 수 있나요?',
                a: "물론입니다. 본 프로그램에서 성경이나 고전은 ‘종교적 정답’을 배우는 교재가 아니라, 인류 보편의 고민을 깊이 탐구하기 위한 '질문의 거울'로 활용됩니다. 종교 유무와 관계없이 자신의 삶을 성찰하고 싶은 분이라면 누구든 환영합니다.",
            },
            {
                q: '어떤 사람들이 주로 오나요?',
                a: '업무와 일상에 치여 잠시 멈추고 근본적인 고민을 하고 싶은 직장인, 인생의 중요한 선택을 앞두고 자기만의 기준을 세우고 싶은 분, 피상적인 대화보다 본질적인 대화를 원하시는 분들이 많이 참여합니다.',
            },
            {
                q: '매주 과제가 있나요?',
                a: "미리 읽어올 분량이 많지는 않지만, 세션을 위한 텍스트나 아티클이 제공될 수 있습니다. 중요한 것은 지식을 외우는 것이 아니라, 텍스트를 읽고 '나의 질문' 하나를 품고 오는 것입니다.",
            },
            {
                q: '결석하면 어떻게 되나요?',
                a: '팀 기반의 오프라인 토의가 핵심이므로 가급적 모든 일정 참석을 권장합니다. 부득이한 사정으로 결석 시, 해당 주차의 핵심 텍스트와 가이드라인은 제공되나 별도의 보강 세션은 없습니다.',
            },
        ],
        []
    );

    return (
        <main className="flex flex-col w-full min-h-screen bg-black text-white">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.18)_0%,_transparent_55%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
                <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-24 md:py-32 lg:py-40 min-h-[92vh] flex items-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="w-full"
                    >
                        <div className="mx-auto max-w-4xl text-center border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 md:p-14">
                            <div className="text-[5rem] md:text-[8rem] font-serif leading-none text-amber-200/60 select-none -mb-10">
                                “
                            </div>

                            <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
                                당신의 질문은 무엇입니까?
                            </h1>

                            <p className="mt-6 text-lg md:text-2xl text-white/70 font-light leading-relaxed">
                                AI 시대, 답보다 중요한 건 <span className="text-white">‘무엇을 물을지’</span>입니다.
                            </p>

                            <p className="mt-6 text-amber-200 font-semibold tracking-wide">프로젝트 딥퀘스쳔</p>
                            <p className="mt-2 text-xs md:text-sm text-white/55">Powered by Reframe Point.</p>

                            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href="/content"
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold border border-amber-200/40 bg-white/[0.03] hover:bg-white/[0.06] transition"
                                >
                                    프로젝트 딥퀘스쳔 시작하기 →
                                </Link>
                                <a
                                    href="#why"
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold border border-white/10 bg-transparent hover:bg-white/[0.03] transition text-white/80"
                                >
                                    자세히 보기
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col items-center gap-2 opacity-70">
                            <span className="text-xs tracking-[0.35em] uppercase text-white/60">Scroll</span>
                            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* WHY */}
            <section
                id="why"
                className="relative border-t border-white/10 bg-black"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.10)_0%,_transparent_55%)]" />
                <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            className="lg:col-span-5"
                        >
                            <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-10 flex items-center justify-center min-h-[340px]">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                                <div className="absolute inset-8 rounded-2xl border border-white/10" />
                                <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-amber-200/40 to-transparent" />
                                <div className="absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
                                <div className="text-7xl md:text-8xl font-serif text-amber-200/70 drop-shadow-[0_0_18px_rgba(245,158,11,0.25)]">
                                    ?
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            className="lg:col-span-7"
                        >
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                                왜 지금, ‘질문’인가요?
                            </h2>
                            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed font-light">
                                AI는 빠르게 답을 제공합니다.
                                <br />
                                그러나 어떤 질문을 던질지, 무엇을 의심할지, 무엇을 선택할지는 여전히 인간의 몫입니다.
                            </p>

                            <div className="mt-10 rounded-2xl border-l-4 border-amber-200/70 bg-gradient-to-r from-amber-200/10 to-transparent p-6 md:p-8">
                                <p className="text-xl md:text-3xl font-medium italic text-white leading-relaxed">
                                    “나는 무엇을 믿고, 무엇을 따르며, 무엇을 선택할 것인가?”
                                </p>
                            </div>

                            <div className="mt-10 space-y-5 text-white/70 text-lg font-light">
                                <p>정보는 넘쳐나지만 정작 이 질문 앞에서는 많은 사람이 멈춥니다.</p>
                                <p className="text-white font-semibold">
                                    프로젝트 딥퀘스쳔은 지식을 더하는 프로그램이 아니라,
                                    <br />
                                    삶을 지탱할 질문을 세우는 훈련입니다.
                                </p>
                            </div>

                            <div className="mt-10">
                                <Link
                                    href="/content"
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold border border-amber-200/30 bg-white/[0.03] hover:bg-white/[0.06] transition"
                                >
                                    프로젝트 딥퀘스쳔 알아보기 <span className="ml-2">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* RECOMMEND */}
            <section className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <SectionTitle title="이런 분께 권합니다" />
                    <div className="mt-10">
                        <NumberedList items={recommend} />
                    </div>
                </div>
            </section>

            {/* DIFFERENT */}
            <section className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <SectionTitle title="프로젝트 딥퀘스쳔은 이렇게 다릅니다" />
                    <div className="mt-12">
                        <FeatureGrid items={features} />
                    </div>
                </div>
            </section>

            {/* BIBLE TRACK */}
            <section className="relative border-t border-white/10 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.10)_0%,_transparent_55%)]" />
                <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        <div className="lg:col-span-4">
                            <p className="text-white/60">Project DEEP QUESTION : Bible Track,</p>
                            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
                                <span className="text-amber-200 font-serif italic font-medium">
                                    신의 질문, 인간의 질문
                                </span>
                            </h2>
                            <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
                                성경은 답을 주는 책을 넘어,
                                <br />
                                인간 존재를 뒤흔드는 질문으로 가득한 책입니다.
                            </p>

                            <div className="mt-10 rounded-2xl border border-amber-200/20 bg-white/[0.02] p-6 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/10 rounded-full blur-2xl" />
                                <p className="font-serif italic text-xl md:text-2xl text-white leading-relaxed">
                                    &quot;아담아, 네가 어디 있느냐?&quot;
                                </p>
                                <p className="mt-3 text-white/60 font-light">— 창세기 3:9</p>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <h3 className="text-2xl md:text-3xl font-bold">신의 질문, 인간의 질문</h3>
                            <div className="mt-6 space-y-6 text-lg md:text-xl text-white/70 font-light leading-relaxed">
                                <p>
                                    &quot;프로젝트 딥퀘스쳔&quot; 은 성경을 읽고 지식을 쌓는 성경 공부가 아닙니다. 성경
                                    속 인물들이 마주했던 거대한 질문들을 나의 삶으로 가져와 씨름하는 과정입니다.
                                </p>
                                <p className="border-l-4 border-amber-200/40 pl-5 text-white">
                                    우리는 성경을 텍스트 삼아,
                                    <br />
                                    <span className="font-semibold text-white">나만의 거대한 질문을 세우는 법</span>을
                                    배울 것입니다.
                                </p>
                            </div>

                            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                                <p className="text-amber-200 font-semibold mb-4">이런 질문들을 다룹니다</p>
                                <ul className="space-y-3 text-white/75 font-light">
                                    {bibleQs.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <Link
                                        href="https://www.latpeed.com/products/bctks"
                                        target="_blank"
                                        className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border border-amber-200/30 bg-transparent hover:bg-white/[0.04] transition"
                                    >
                                        프로그램 신청하기 <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CURRICULUM */}
            <section className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <SectionTitle
                        title="커리큘럼"
                        desc="4주간의 밀도 있는 항해"
                    />
                    <div className="mt-12">
                        <Curriculum items={curriculum} />
                    </div>
                </div>
            </section>

            {/* 2 HOURS */}
            <section className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <SectionTitle
                        title="2시간은 이렇게 흐릅니다"
                        desc="밀도 높은 질문의 시간"
                    />
                    <div className="mt-12">
                        <Timeline />
                    </div>
                </div>
            </section>

            {/* PROGRAM INFO */}
            <section className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <SectionTitle title="프로그램 정보" />
                    <div className="mt-12 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
                        <div className="border-t border-white/10">
                            <StatRow
                                label="정원"
                                value="15~20명 (소규모 운영)"
                            />
                            <StatRow
                                label="팀 구성"
                                value="3~4팀 (팀당 4~6명, 고정 팀 운영)"
                            />
                            <StatRow
                                label="진행 인력"
                                value="메인 퍼실리에이터 1명 + 보조 1명 + 진행자 1명"
                            />
                            <StatRow
                                label="일정"
                                value="주 2회 / 총 4회 / 회당 2시간"
                            />
                            <div className="py-5">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                    <div className="md:w-48 text-white/60 font-medium">형태</div>
                                    <div className="text-white text-lg md:text-xl font-light">
                                        오프라인 강의 + 팀 토의
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUTCOMES */}
            <section className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <SectionTitle title="이 과정이 끝나면 남는 것" />
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {[
                            '내 삶을 관통하는 핵심 질문 1~3개',
                            '질문을 구조화하는 프레임',
                            '질문이 좋은 질문인지 검증하는 기준',
                            '이번 주 바로 실행할 작은 실천 항목',
                        ].map((t, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-10 hover:bg-white/[0.04] transition"
                            >
                                <div className="font-serif text-xl text-amber-200/80">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <div className="mt-4 text-xl md:text-2xl font-medium text-white/80">
                                    {t.includes('핵심 질문') ? (
                                        <>
                                            내 삶을 관통하는{' '}
                                            <span className="text-white font-bold">핵심 질문 1~3개</span>
                                        </>
                                    ) : (
                                        <span className="text-white/80">{t}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center max-w-2xl mx-auto text-white/70 text-lg font-light leading-relaxed space-y-5">
                        <p>
                            무엇을 믿을지,
                            <br />
                            무엇을 따를지,
                            <br />
                            무엇을 선택할지에 대한
                        </p>
                        <p className="text-2xl text-white font-semibold italic">내 기준이 조금 더 또렷해집니다.</p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28">
                    <SectionTitle title="자주 묻는 질문" />
                    <div className="mt-12">
                        <FAQ items={faq} />
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative border-t border-white/10 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(245,158,11,0.16)_0%,_transparent_60%)]" />
                <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-20 md:py-28 lg:py-32">
                    <div className="mx-auto max-w-3xl text-center rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-14">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15]">
                            당신의 질문은
                            <br />
                            준비되었습니까?
                        </h2>
                        <p className="mt-6 text-xl md:text-2xl text-white/70 font-light leading-relaxed">
                            답이 없는 시대,
                            <br className="md:hidden" />
                            가장 강력한 무기는 <span className="text-white font-medium">‘나만의 질문’</span>입니다.
                        </p>

                        <div className="mt-10 relative inline-block">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-200/30 to-amber-400/10 blur opacity-60" />
                            <Link
                                href="https://www.latpeed.com/products/bctks"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative inline-flex items-center justify-center px-10 py-5 md:px-12 md:py-6 rounded-full font-bold text-lg md:text-xl border border-amber-200/30 bg-white/[0.03] hover:bg-white/[0.06] transition"
                            >
                                프로젝트 딥퀘스쳔 시작하기
                            </Link>
                        </div>

                        <p className="mt-6 text-xs md:text-sm text-white/55">Powered by Reframe Point.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

// -------------------------------
// 탭 통합 컴포넌트 (3개 탭)
// -------------------------------
export default function ConsultingTabs() {
    const [activeTab, setActiveTab] = useState<'mindpoint_personal' | 'mindpoint_group' | 'deepq'>(
        'mindpoint_personal'
    );

    return (
        <div className="min-h-screen bg-[#f9f9f8] py-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* 탭 버튼 */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('mindpoint_personal')}
                        className={`px-6 py-2 rounded-full font-semibold transition-all ${
                            activeTab === 'mindpoint_personal'
                                ? 'bg-Bgreen text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        개별 컨설팅
                    </button>

                    <button
                        onClick={() => setActiveTab('mindpoint_group')}
                        className={`px-6 py-2 rounded-full font-semibold transition-all ${
                            activeTab === 'mindpoint_group'
                                ? 'bg-Bgreen text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        마인드 포인트
                    </button>

                    <button
                        onClick={() => setActiveTab('deepq')}
                        className={`px-6 py-2 rounded-full font-semibold transition-all ${
                            activeTab === 'deepq'
                                ? 'bg-Bgreen text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        프로젝트 딥퀘스쳔
                    </button>
                </div>

                {/* 탭 내용 */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {activeTab === 'mindpoint_personal' && <Contents />}
                    {activeTab === 'mindpoint_group' && <MindPointPage />}
                    {activeTab === 'deepq' && <DeepQuestionPage />}
                </motion.div>
            </div>
        </div>
    );
}
