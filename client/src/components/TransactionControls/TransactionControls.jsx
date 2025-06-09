import React from 'react';
import { Button, Box } from '@mui/material';

const TransactionControls = ({ onAddIncome, onAddOutcome }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button
                variant="contained"
                sx={{
                    bgcolor: 'success.main',
                    color: 'white',
                    borderRadius: 50,
                    px: 4,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
                onClick={onAddIncome}
            >
                Додати дохід
            </Button>
            <Button
                variant="contained"
                sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    borderRadius: 50,
                    px: 4,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
                onClick={onAddOutcome}
            >
                Додати витрату
            </Button>
        </Box>
    );
};

export default TransactionControls;