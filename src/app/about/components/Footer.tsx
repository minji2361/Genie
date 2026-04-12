'use client';

import { brandColor } from '@/app/lib/brandcolor';

export default function Footer() {
    return (
        <footer className="py-12" style={{ backgroundColor: brandColor.deepmoss, color: brandColor.enamel }}>
            <div className="container mx-auto px-6 md:px-0 max-w-4xl text-center space-y-4">
                <p className="text-sm md:text-base font-semibold tracking-wide">
                    © 2022 ReframePoint. All rights reserved.
                </p>

                <p className="text-sm md:text-base flex items-center justify-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        style={{ color: brandColor.orangeish }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a4 4 0 005.657-5.657z"
                        />
                        <circle cx="12" cy="12" r="3" stroke="none" fill="currentColor" />
                    </svg>
                    서울 노원구 화랑로 453, 5층
                </p>

                <p className="text-sm md:text-base">
                    문의:{' '}
                    <a
                        href="mailto:contact@reframepoint.com"
                        style={{ textDecoration: 'underline', color: brandColor.enamel }}
                        onMouseOver={(e) => (e.currentTarget.style.color = brandColor.orangeish)}
                        onMouseOut={(e) => (e.currentTarget.style.color = brandColor.enamel)}
                    >
                        contact@reframepoint.com
                    </a>
                </p>
            </div>
        </footer>
    );
}
