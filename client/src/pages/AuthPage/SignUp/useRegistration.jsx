import { useState } from "react";

export const useRegistration = ({ registerUser }) => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    const [globalError, setGlobalError] = useState('');

    const handleInputChange = (field, value) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const validateInputs = () => {
        let validationErrors = {};
        let isValid = true;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formValues.email)) {
            validationErrors.email = 'Enter a valid email address.';
            isValid = false;
        }

        if (formValues.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters in length.';
            isValid = false;
        }

        if (!formValues.username.trim()) {
            validationErrors.username = 'Username must not be empty.';
            isValid = false;
        }

        if (formValues.password !== formValues.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords must match.';
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (validateInputs()) {
            registerUser({
                username: formValues.username,
                email: formValues.email,
                password: formValues.password,
            })
                .then((response) => {
                    if (response && response.status === 201) {
                        setGlobalError('');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setGlobalError(
                        error.response?.data?.message || 'An issue occurred. Please try again later.'
                    );
                });
        }
    };

    return {
        formValues,
        errors,
        globalError,
        handleInputChange,
        handleFormSubmit,
    };
};