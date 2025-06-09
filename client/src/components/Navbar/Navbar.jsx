import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Головна
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/settings')}>
                Налаштування
            </Button>
        </div>
    );
};

export default Navbar;