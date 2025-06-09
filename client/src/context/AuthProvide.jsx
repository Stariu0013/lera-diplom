import { createContext, useContext as useAppContext, useState as useAppState, useEffect } from 'react';
import { jwtDecode as decodeJWT } from 'jwt-decode';
import httpClient from 'axios';
import {useNavigate} from "react-router-dom";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useAppState(null);
    const [isTokenVerificationInProgress, setTokenVerificationProgress] = useAppState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuthorization = async () => {
            const storedToken = localStorage.getItem('accessToken');

            if (storedToken) {
                try {
                    const parsedToken = decodeJWT(storedToken);
                    const timeStampNow = Date.now() / 1000;

                    if (parsedToken.exp < timeStampNow) {
                        await refreshAuthToken();
                    } else {
                        setCurrentUser(parsedToken.user);
                    }
                } catch (error) {
                    console.error('Error with token:', error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            }
            setTokenVerificationProgress(false);
        };

        initializeAuthorization();
    }, []);

    const refreshAuthToken = async () => {
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (!storedRefreshToken) {
            handleLogout();
            throw new Error('No refresh token available');
        }

        try {
            const serverResponse = await httpClient.post('https://lera-diplom-api.onrender.com/api/auth/refresh-token', {
                refreshToken: storedRefreshToken,
            });

            const { token: newAccessToken, refreshToken: updatedRefreshToken, user: updatedUser } = serverResponse.data;

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', updatedRefreshToken);
            setCurrentUser(updatedUser);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            handleLogout();
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/';
    };

    if (isTokenVerificationInProgress) return <div>Loading...</div>;

    return (
        <UserAuthContext.Provider value={{ currentUser, setCurrentUser, handleLogout, refreshAuthToken }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuth = () => useAppContext(UserAuthContext);
