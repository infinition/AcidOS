tailwind.config = {
    theme: {
        extend: {
            keyframes: {
                jiggle: {
                    '0%': { transform: 'rotate(-1.5deg)' },
                    '100%': { transform: 'rotate(1.5deg)' },
                }
            },
            animation: {
                jiggle: 'jiggle 0.3s infinite alternate',
            }
        }
    }
}
