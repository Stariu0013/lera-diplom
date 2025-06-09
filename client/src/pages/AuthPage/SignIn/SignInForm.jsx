import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { useAuthenticate } from './useAuthenticate.jsx';

const LoginComponent = ({ signIn }) => {
    const {
        formData,
        validationErrors,
        globalError,
        handleInputChange,
        submitHandler,
    } = useAuthenticate({ login: signIn });

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 50px)' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Вхід
                    </Typography>
                    {globalError && (
                        <Typography color="error" variant="body2" align="center" gutterBottom>
                            {globalError}
                        </Typography>
                    )}
                    <form onSubmit={submitHandler}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Ім'я користувача"
                                variant="outlined"
                                value={formData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                error={!!validationErrors.username}
                                helperText={validationErrors.username}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Електронна пошта"
                                variant="outlined"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                error={!!validationErrors.email}
                                helperText={validationErrors.email}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Пароль"
                                variant="outlined"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                error={!!validationErrors.password}
                                helperText={validationErrors.password}
                            />
                        </Box>
                        <Box mb={2}>
                            <Button variant="outlined" color="secondary" fullWidth type="submit">
                                Вхід
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginComponent;