import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { useRegistration } from "./useRegistration";

const RegistrationForm = ({ signUp }) => {
    const {
        formValues,
        errors,
        globalError,
        handleInputChange,
        handleFormSubmit
    } = useRegistration({ registerUser: signUp });

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: 'calc(100vh - 50px)' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Зареєструватися
                    </Typography>
                    {globalError && (
                        <Typography color="error" variant="body2" align="center" gutterBottom>
                            {globalError}
                        </Typography>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Ім'я"
                                variant="outlined"
                                value={formValues.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Електронна пошта"
                                variant="outlined"
                                type="email"
                                value={formValues.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Пароль"
                                variant="outlined"
                                type="password"
                                value={formValues.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Підтвердіть пароль"
                                variant="outlined"
                                type="password"
                                value={formValues.confirmPassword}
                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                        </Box>
                        <Box mb={2}>
                            <Button variant="outlined" color="secondary" fullWidth type="submit">
                                Зареєструватися
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default RegistrationForm;