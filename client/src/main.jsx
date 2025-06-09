import React from 'react';
import { CssBaseline } from '@mui/material';
import App from './components/App/App.jsx';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {UserAuthProvider} from "./context/AuthProvide.jsx";

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
        <UserAuthProvider>
            <Root />
        </UserAuthProvider>
    </BrowserRouter>,
)

export default Root;