import { COLORS } from './colors';

export const THEME = {
    colors: COLORS,
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40,
    },
    typography: {
        header: {
            fontSize: 28, // Daha büyük ve etkileyici başlıklar
            fontWeight: '900',
            color: COLORS.text,
            letterSpacing: -0.5,
        },
        title: {
            fontSize: 20,
            fontWeight: '700',
            color: COLORS.text,
            letterSpacing: -0.3,
        },
        body: {
            fontSize: 14,
            color: COLORS.text,
        },
        caption: {
            fontSize: 12,
            color: COLORS.textLight,
        },
    },
    borderRadius: {
        sm: 12,
        md: 20, // Daha oval modern kartlar
        lg: 28, // Ana konteynerlar
        xl: 36,
        round: 9999,
    },
    shadows: {
        card: {
            shadowColor: COLORS.cardShadow || '#000',
            shadowOffset: {
                width: 0,
                height: 8, // Daha derin ve premium gölgeler
            },
            shadowOpacity: 1,
            shadowRadius: 24,
            elevation: 8, // Android için de tatlı gölge
        },
        soft: {
            shadowColor: COLORS.cardShadow || '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 12,
            elevation: 4,
        }
    },
};
