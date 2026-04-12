'use client';

import Image from 'next/image';
import React from 'react';

const Brandintro = () => {
    return (
        <section id="about" className="py-24 bg-Bgreen text-white">
            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-16">
                <div className="md:w-1/2 flex justify-center">
                    <Image
                        src="/monstera1.png"
                        alt="monstera image"
                        width={500}
                        height={300}
                        className="object-contain drop-shadow-lg"
                    />
                </div>

                <div className="md:w-1/2 bg-Bbeige px-8 py-10 rounded-3xl shadow-lg text-Bblack space-y-6">
                    <h2 className="italic text-xl md:text-4xl font-semibold text-Bgreen leading-tight">
                        “Not the senses I have but what I do with them is my kingdom.”
                    </h2>

                    <p className="text-lg text-Bblack">
                        내가 가진 감각들이 아니라, <br />
                        그것으로 하는 무엇인가가 나의 세계다.
                    </p>

                    <div className="space-y-5 text-base md:text-lg leading-relaxed">
                        <p>
                            <span className="font-medium text-Bgreen">ReframePoint</span>는 헬렌 켈러의 이 말을 마음에
                            새깁니다. 조건보다 그 조건을 통해 <span className="font-medium">무엇을 해내느냐</span>가
                            중요하니까요.
                        </p>

                        <p className="bg-Byellow/30 p-4 rounded-xl">
                            성장의 여정은 혼자서는 완성되지 않습니다.
                            <br />
                            함께할 때 더 깊고, 넓고, 의미 있어집니다.
                        </p>

                        <p>
                            <span className="font-medium text-Bgreen">ReframePoint</span>는 각자의 가능성과 이야기를
                            존중하며, 서로의 빛이 되어 주는 관계를 지향합니다.
                        </p>

                        <div className="border-l-4 border-Bgreen pl-4 text-Bblack/80 italic">
                            멘토와 멘티가 함께 만드는 이 공간은
                            <br />
                            단순한 상담을 넘어 삶의 변화를 이끄는 ‘출발점’입니다.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brandintro;
