/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                monstera: {
                    dark: '#2F3D2A',
                    green: '#40513B',
                    medium: '#609966',
                    light: '#9DC08B',
                    pale: '#EDF1D6',
                }
            },
            fontFamily: {
                branding: ['"Lemon"', 'cursive'],
                sans: ['"Inter"', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'monstera-gradient': 'linear-gradient(135deg, #9DC08B 0%, #8AB07A 50%, #609966 100%)',
            }
        },
    },
    plugins: [],
}
