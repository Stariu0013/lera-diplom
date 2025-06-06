import {memo, useState} from 'react';
import {
    Box,
    Button,
    IconButton,
    Typography,
    Grid,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from 'react-i18next';

function TransactionModal({open, onClose, modalType, categories, onSubmit}) {
    const {t} = useTranslation(); // Importing the translation function
    const [transaction, setTransaction] = useState({
        description: '',
        category: '',
        amount: '',
        type: modalType,
    });

    const handleChange = (field, value) => {
        setTransaction((prev) => ({...prev, [field]: value}));
    };

    // Clear form values
    const resetForm = () => {
        setTransaction({
            description: '',
            category: '',
            amount: '',
            type: modalType,
        });
    };

    const handleSubmit = () => {
        if (transaction.category && transaction.description && transaction.amount) {
            onSubmit(transaction);
            resetForm();
        }
    };

    // Close modal on outside click
    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-container') {
            onClose();
        }
    };

    if (!open) return null;

    return (
        <Box
            id="modal-container"
            onClick={handleOutsideClick}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1300,
            }}
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 3,
                    minWidth: 400,
                    maxWidth: '90%',
                    position: 'relative',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#666',
                        '&:hover': {color: '#000'},
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                {/* Modal Title */}
                <Typography
                    variant="h6"
                    sx={{mb: 3, fontWeight: 'bold', textAlign: 'center'}}
                >
                    {modalType === 'add' ? t('Add Income') : t('Add Outcome')}
                </Typography>

                {/* Form Fields */}
                <Box sx={{mb: 3}}>
                    <TextField
                        fullWidth
                        label={t('Description')}
                        variant="outlined"
                        size="small"
                        value={transaction.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        sx={{mb: 2}}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label={t('Amount')}
                        variant="outlined"
                        size="small"
                        value={transaction.amount}
                        onChange={(e) => handleChange('amount', e.target.value)}
                        sx={{mb: 3}}
                    />

                    <Typography gutterBottom variant="body1" fontWeight="bold">
                        {t('Select Category')}
                    </Typography>
                </Box>

                {/* Category Selector */}
                <Grid container spacing={2}>
                    {categories.map((item, index) => (
                        <Grid item xs={4} sm={3} md={2} key={index}>
                            <Box
                                onClick={() => handleChange('category', item.title)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 1,
                                    border: transaction.category === item.title
                                        ? '2px solid #1976d2'
                                        : '1px solid #ccc',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    '&:hover': {backgroundColor: '#f5f5f5'},
                                }}
                            >
                                {item.icon}
                                <Typography variant="caption" sx={{mt: 1, textAlign: 'center'}}>
                                    {t(item.title)}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Buttons */}
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 4}}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color={modalType === 'income' ? 'success' : 'error'}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                        }}
                    >
                        {modalType === 'income' ? t('Add Income') : t('Add Outcome')}
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="primary"
                        sx={{
                            ml: 2,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                        }}
                    >
                        {t('Cancel')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default memo(TransactionModal);