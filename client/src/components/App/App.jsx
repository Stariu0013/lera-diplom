import React from 'react';
import BudgetTracker from '../../pages/BudgetTracker/BudgetTracker.jsx';
import SignInForm from "../../pages/AuthPage/SignIn/SignInForm.jsx";
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {useApp} from "./useApp.jsx";
import {Button, Typography} from "@mui/material";
import SignUpForm from "../../pages/AuthPage/SignUp/SignUpForm.jsx";
import {SettingPage} from "../../pages/SettingPage/SettingPage.jsx";
import Navbar from "../Navbar/Navbar.jsx";

const AuthRoutes = React.memo(({ signIn, signUp, isSignUpPage, toggleAuthForm }) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignInForm signIn={signIn} />} />
                <Route path="/signup" element={<SignUpForm signUp={signUp} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Typography align="center">
                {isSignUpPage
                    ? "Ви вже маєте аккаунт?"
                    : "У вас немає аккаунту?"}{' '}
                <Button onClick={toggleAuthForm} color="primary">
                    {isSignUpPage ? "Увійти" : "Зареєструватися"}
                </Button>
            </Typography>
        </>
    );
});

const MainRoutes = React.memo(() => {
    return (
        <Routes>
            <Route path="/" element={<BudgetTracker />} />
            <Route path="/settings" element={<SettingPage />} />
        </Routes>
    );
});

function App() {
    const navigate = useNavigate();
    const { isAuth, isSignUpPage, signIn, signUp, toggleAuthForm, logout } = useApp();

    const handleLogout = () => {
        logout();

        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        const token = JSON.parse(localStorage.getItem('accessToken'));

        if (!refreshToken && !token) {
            navigate('/');
        }
    };

    return (
        <main>
            {!isAuth ? (
                <AuthRoutes
                    signIn={signIn}
                    signUp={signUp}
                    isSignUpPage={isSignUpPage}
                    toggleAuthForm={toggleAuthForm}
                />
            ) : (
                <>
                    <Navbar />
                    <MainRoutes handleLogout={handleLogout} />
                </>
            )}
        </main>
    );
}

export default App;