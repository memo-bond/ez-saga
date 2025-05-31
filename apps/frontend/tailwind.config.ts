import forms from '@tailwindcss/forms';
import scrollbar from 'tailwind-scrollbar';

export default {
    theme: {
        extend: {
            colors: {
                brand: {
                    purple: '#7e5bef',
                    blue: '#3f8efc',
                    slate: '#1e293b',
                },
            },
            borderRadius: {
                'xl2': '1.25rem',
            },
            boxShadow: {
                card: '0 4px 14px rgba(0, 0, 0, 0.1)',
            },
            fontFamily: {
                mono: ['Fira Code', 'monospace'],
            },
        },
    },
    plugins: [forms, scrollbar],
};