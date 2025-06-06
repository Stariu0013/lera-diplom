import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import i18n translation hook

const Navbar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(); // Initialize useTranslation hook

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                {t('Home')} {/* Tagging the "Home" string */}
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/settings')}>
                {t('Settings')}
            </Button>
        </div>
    );
};

export default Navbar;