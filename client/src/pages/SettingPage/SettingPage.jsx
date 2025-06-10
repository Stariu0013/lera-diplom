import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import axios from '../../helpers/axios.js';
import {toast} from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import {useUserAuth} from "../../context/AuthProvide.jsx";
import 'dayjs/locale/uk';
import dayjs from "dayjs";

dayjs.locale('uk');

export const SettingPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [subscribedItems, setSubscribedItems] = useState([]);
    const { handleLogout } = useUserAuth();

    const fetchSubscribedItems = async (setSubscribedItems) => {
        try {
            const response = await axios.get('http://localhost:5125/api/subscriptions');
            setSubscribedItems(response.data);
        } catch (error) {
            console.error('Помилка під час отримання підписок:', error);
        }
    };

    useEffect(() => {
        fetchSubscribedItems(setSubscribedItems);
    }, []);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedDate(null);
        setPrice('');
        setErrors({});
    };

    const validateFields = () => {
        const newErrors = {};
        if (!selectedDate) {
            newErrors.date = 'Дата є обов’язковою';
        }
        if (!type.length && !type) {
            newErrors.type = 'Тип є обов’язковим';
        }
        if (!price) {
            newErrors.price = 'Ціна є обов’язковою';
        } else if (isNaN(price) || price <= 0) {
            newErrors.price = 'Ціна має бути додатним числом';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveSubscription = async (data, handleModalClose, setSubscribedItems) => {
        try {
            const response = await axios.post('http://localhost:5125/api/subscribe', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            toast.success('Успішно збережено!');
            setSubscribedItems((prevItems) => [
                ...prevItems,
                { ...data, id: response.data.id ?? Date.now() },
            ]);
            handleModalClose();
        } catch (error) {
            console.error('Не вдалося зберегти:', error);
            alert('Виникла помилка під час збереження.');
        }
    };

    const handleSave = () => {
        if (!validateFields()) {
            return;
        }
        const data = {
            type,
            date: selectedDate ? selectedDate.format('YYYY-MM-DD') : '',
            price,
            email: localStorage.getItem('email'),
        };

        saveSubscription(data, handleModalClose, setSubscribedItems);
    };

    const removeSubscription = (id) => {
        axios.delete(`http://localhost:5125/api/subscriptions/${id}`).then(res => {
            const deletedItemId = res.data.deletedSubscription._id;

            setSubscribedItems((prevItems) => prevItems.filter((item) => item.id !== deletedItemId));
        }).catch(error => {
            toast.error('Не вдалося видалити елемент!');
        });
    };

    return (
        <div style={{maxWidth: '1240px', margin: '0 auto', padding: '0 16px'}}>
            <Box sx={{marginTop: '20px'}}>
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Вийти з облікового запису
                </Button>
            </Box>
            <Box sx={{marginTop: '20px'}}>
                <Button variant="contained" color="primary" onClick={handleModalOpen}>
                    Додати нове нагадування
                </Button>
            </Box>

            {
                subscribedItems.length ? (<div style={{marginTop: '20px'}}>
                    <h2>Мої підписки</h2>
                    <ul>
                        {subscribedItems.map((item) => (
                            <li key={item.id}
                                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span>
                                      {item.type} - {item.date} - ${item.price} - {item.email}
                                    </span>
                                <Button
                                    variant="text"
                                    onClick={() => removeSubscription(item._id)}
                                    startIcon={<DeleteIcon color="error"/>}
                                ></Button>
                            </li>
                        ))}
                    </ul>
                </div>) : null
            }

            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2>Заповніть деталі</h2>
                    <div style={{marginBottom: '16px'}}>
                        <label>Тип: </label>
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Введіть тип"
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                        />
                        {errors.type && <p style={{color: 'red'}}>{errors.type}</p>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block' }}>Дата: </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                renderInput={(params) => <input {...params} />}
                            />
                        </LocalizationProvider>
                        {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                    </div>
                    <div style={{marginBottom: '16px'}}>
                        <label>Сума: </label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Введіть суму"
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                        />
                        {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
                        <Button variant="outlined" onClick={handleModalClose}>
                            Скасувати
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Зберегти
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};