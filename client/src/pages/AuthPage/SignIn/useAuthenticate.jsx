import { useState } from 'react';

export const useAuthenticate = ({ login }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [globalError, setGlobalError] = useState('');

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateInputs = () => {
        const errors = {};
        let isFormValid = true;

        if (!formData.username.trim()) {
            errors.username = "Поле 'Користувач' не може бути порожнім.";
            isFormValid = false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            errors.email = 'Введіть дійсну електронну адресу.';
            isFormValid = false;
        }

        if (formData.password.length < 6) {
            errors.password = 'Пароль має бути не менш ніж 6 символів.';
            isFormValid = false;
        }

        setValidationErrors(errors);
        return isFormValid;
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (validateInputs()) {
            login(formData)
                .then(() => {
                    setGlobalError('');
                })
                .catch((err) => {
                    setGlobalError('Електронна адреса або пароль невірні.');
                    console.error(err);
                });
        }
    };

    return {
        formData,
        validationErrors,
        globalError,
        handleInputChange,
        submitHandler,
    };
};