import { Typography } from '@mui/material'

export function Text({ text }) {
    return (
        <Typography
            sx={{
                color: 'neutral.400',
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                color: 'neutral.500'
            }}
        >
            {text}
        </Typography>
    )
}