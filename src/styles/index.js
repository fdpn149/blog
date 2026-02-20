export const dimens = {
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    card: {
        minWidth: '280px',
        maxWidth: '360px',
    }
};

export const commonStyles = {
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${dimens.card.minWidth}, ${dimens.card.maxWidth}))`,
        gap: dimens.spacing.xl,
        padding: dimens.spacing.md
    }
};
