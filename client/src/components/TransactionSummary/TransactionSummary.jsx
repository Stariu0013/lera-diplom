import React from 'react';
import { Box, Typography } from '@mui/material';

const TransactionSummary = ({ income, outcome }) => {
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
                <strong>Дохід:</strong>{' '}
                <span style={{ color: '#388e3c' }}>${income.toFixed(2)}</span>
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
                <strong>Витрати:</strong>{' '}
                <span style={{ color: '#d32f2f' }}>${outcome.toFixed(2).replace('-', '')}</span>
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
                <strong>Баланс:</strong>{' '}
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