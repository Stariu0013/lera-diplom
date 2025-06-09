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

function TransactionModal({open, onClose, modalType, categories, onSubmit}) {
    const [transaction, setTransaction] = useState({
        description: '',
        category: '',
        amount: '',
        type: modalType,
    });

    const [errors, setErrors] = useState({
        description: false,
        amount: false,
    });

    const handleChange = (field, value) => {
        setTransaction((prev) => ({...prev, [field]: value}));
        setErrors((prev) => ({...prev, [field]: false})); // Reset the error state on value change
    };

    const resetForm = () => {
        setTransaction({
            description: '',
            category: '',
            amount: '',
            type: modalType,
        });
        setErrors({
            description: false,
            amount: false,
        });
    };

    const validateForm = () => {
        const newErrors = {
            description: transaction.description.trim() === '',
            amount: transaction.amount <= 0 || transaction.amount === '',
        };
        setErrors(newErrors);
        return !newErrors.description && !newErrors.amount;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(transaction);
            resetForm();
        }
    };

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
                    <CloseIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{mb: 3, fontWeight: 'bold', textAlign: 'center'}}
                >
                    {modalType === 'add' ? 'Додати дохід' : 'Додати витрату'}
                </Typography>

                <Box sx={{mb: 3}}>
                    <TextField
                        fullWidth
                        label="Опис"
                        variant="outlined"
                        size="small"
                        value={transaction.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        error={errors.description}
                        helperText={errors.description ? 'Опис не може бути порожнім' : ''}
                        sx={{mb: 2}}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Сума"
                        variant="outlined"
                        size="small"
                        value={transaction.amount}
                        onChange={(e) =>
                            handleChange('amount', parseFloat(e.target.value))
                        }
                        error={errors.amount}
                        helperText={
                            errors.amount ? 'Сума має бути додатнім числом' : ''
                        }
                        sx={{mb: 3}}
                    />

                    <Typography gutterBottom variant="body1" fontWeight="bold">
                        Оберіть категорію
                    </Typography>
                </Box>

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
                                <Typography
                                    variant="caption"
                                    sx={{mt: 1, textAlign: 'center'}}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

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
                        {modalType === 'income' ? 'Додати дохід' : 'Додати витрату'}
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
                        Скасувати
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default memo(TransactionModal);