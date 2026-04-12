/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                Byellow: '#FFB018',
                Bgreen: '#334B35',
                Bgrey: '#E5DCCB',
                Bbrown: '#B76939',
                Borange: '#FB624B',
                Bblack: '#020003',
                Bbeige: '#F6EEE1',
                Bdark: '#24272C',
                Benamel: '#f4e2d0',
                Blightbeige: '#faf8f4',
            },
        },
    },
    plugins: [],
};
