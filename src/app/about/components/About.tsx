import { motion } from 'framer-motion';

export default function About() {
    return (
        <motion.section
            className="py-24 px-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* 회사명 및 의미 */}
            <div className="text-center mb-24">
                <h2 className="text-5xl font-extrabold text-Bdark leading-tight tracking-tight">
                    <span className="text-Byellow"> {'" REFRAMEPOINT "'}</span>
                </h2>
                <p className="mt-6 text-lg text-Bblack max-w-3xl mx-auto leading-relaxed tracking-wide">
                    ‘Reframe’은 <br />
                    <span className="font-semibold text-Bgreen">새로운 시각으로 바라본다</span>는 의미입니다.
                    <br />
                    ‘Point’는 <br />
                    <span className="font-semibold text-Byellow">핵심, 출발점</span>을 뜻합니다.
                    <br />
                    <br />
                    그래서 REFRAMEPOINT는
                    <br />
                    <span className="italic text-Bbrown text-lg">‘삶의 관점을 바꾸는 시작점’</span>입니다.
                </p>
            </div>

            {/* 회사 취지 */}
            <div className="mb-24 text-center px-6">
                <h3 className="text-3xl font-semibold text-Bgreen mb-6 tracking-wide">우리의 마음, 우리의 힘</h3>
                <p className="text-Bblack text-lg max-w-3xl mx-auto leading-relaxed tracking-wide">
                    ReframePoint는 심리상담사, 재능기부자, 다양한 분야의 멘토들이 모여
                    <br />
                    청년들의 성장과 자립을 위한 든든한 기반이 되어주는{' '}
                    <span className="font-semibold text-Byellow">멘토링 커뮤니티</span>입니다.
                    <br />
                    혼자서 길을 찾기 어려운 순간, 따뜻한 손길과 깊은 공감이 필요한 순간에
                    <br />
                    언제든 머무를 수 있는 안전한 공간이 되길 바랍니다.
                </p>
            </div>

            {/* 설립 이념 */}
            <div className="mb-24 px-10 py-12 bg-Bbeige rounded-3xl shadow-lg max-w-4xl mx-auto">
                <h3 className="text-3xl font-extrabold text-Bdark mb-8 text-center tracking-wide">설립 목적</h3>
                <p
                    className="text-Bbrown text-lg leading-relaxed whitespace-pre-line tracking-wide"
                    style={{ lineHeight: 1.8 }}
                >
                    {`우리는 변화를 두려워하지 않고,
새로운 관점으로 자신을 재정의하는 용기를 응원합니다.

성장의 여정은 혼자서 완성되지 않습니다.
함께라서 더 깊고, 더 넓으며, 더 의미 있죠.

ReframePoint는 각자가 가진 가능성과 이야기를 존중하며,
서로의 빛이 되어 주는 관계를 꿈꿉니다.

멘토와 멘티가 함께 만드는 이 공간은
단순한 상담을 넘어 삶의 변화를 촉진하는 ‘출발점’입니다.`}
                </p>
            </div>

            <div className="text-center px-6 max-w-3xl mx-auto">
                <h3 className="text-3xl font-semibold text-Byellow mb-6 tracking-wide">우리가 나아갈 길</h3>
                <p className="text-Bblack text-lg leading-relaxed tracking-wide">
                    앞으로도 ReframePoint는
                    <br />
                    <span className="font-semibold text-Bgreen">
                        “모두가 자신의 삶을 스스로 디자인하는 힘을 키우는 것”
                    </span>
                    을 지향합니다.
                    <br />
                    깊은 공감과 실질적 도움으로 이어지는 멘토링을 통해,
                    <br />
                    청년 한 사람 한 사람이 자신의 빛을 발견하고 빛나도록 함께하겠습니다.
                </p>
            </div>
        </motion.section>
    );
}
