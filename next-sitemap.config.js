/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://www.reframepoint.co.kr/',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 1,
    // admin, dashboard 경로 제외
    exclude: ['/admin*', '/dashboard*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/dashboard'], // robots.txt 차단
            },
        ],
    },
};
