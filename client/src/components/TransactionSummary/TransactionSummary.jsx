import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TransactionSummary = ({ income, outcome }) => {
    const { t } = useTranslation();

    let balance = outcome + income;

    return (
        <Box
            sx={{
                mt: 4,
                bgcolor: 'grey.200',
                p: 2,
                borderRadius: 3,
            }}
        >
            <Typography sx={{ fontWeight: 500 }}>
                <strong>{t('Income')}:</strong>{' '}
                <span style={{ color: '#388e3c' }}>${income.toFixed(2)}</span>
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
                <strong>{t('Outcome')}:</strong>{' '}
                <span style={{ color: '#d32f2f' }}>${outcome.toFixed(2).replace('-', '')}</span>
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
                <strong>{t('Balance')}:</strong>{' '}
                <span
                    style={{
                        color: balance >= 0 ? '#388e3c' : '#d32f2f',
                    }}
                >
                    ${balance.toFixed(2)}
                </span>
            </Typography>
        </Box>
    );
};

export default TransactionSummary;