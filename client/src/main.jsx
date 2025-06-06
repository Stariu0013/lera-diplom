import React from 'react';
import { CssBaseline } from '@mui/material';
import App from './components/App/App.jsx';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvide.jsx";

const Root = () => {
    return (
        <>
            <CssBaseline />
            <App />
        </>
    );
};

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <Root />
        </AuthProvider>
    </BrowserRouter>,
)

export default Root;