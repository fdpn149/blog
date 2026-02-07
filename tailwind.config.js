/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic colors mapped to CSS variables defined in global.scss
                'theme-bg': 'var(--background-color)',
                'theme-text': 'var(--text-color)',
                'theme-shadow': 'var(--shadow-color)',
                'theme-shadow-strong': 'var(--strong-shadow-color)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/postcss'),
    ],
}
