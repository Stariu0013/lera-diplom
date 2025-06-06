import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import axios from '../../helpers/axios.js';
import {toast} from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

export const SettingPage = () => {
    const {t, i18n} = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [price, setPrice] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const [subscribedItems, setSubscribedItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5125/api/subscriptions').then(res => {
            setSubscribedItems(res.data);
        });
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedDate(null);
        setPrice('');
        setEmail('');
        setErrors({});
    };

    const validateFields = () => {
        const newErrors = {};
        if (!selectedDate) {
            newErrors.date = 'Date is required';
        }
        if (!type.length && !type) {
            newErrors.type = 'Type is required';
        }
        if (!price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(price) || price <= 0) {
            newErrors.price = 'Price must be a valid positive number';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email must be a valid email address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateFields()) {
            return;
        }
        const data = {
            type,
            date: selectedDate ? selectedDate.format('YYYY-MM-DD') : '',
            price,
            email,
        };

        axios
            .post('http://localhost:5125/api/subscribe', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                toast.success('Saved successfully!');
                setSubscribedItems((prevItems) => [
                    ...prevItems,
                    {...data, id: res.data.id ?? Date.now()},
                ]);
                handleModalClose();
            })
            .catch((error) => {
                console.error('Failed to save:', error);
                alert('An error occurred while saving.');
            });
    };

    const handleRemoveItem = (id) => {
        axios.delete(`http://localhost:5125/api/subscriptions/${id}`).then(res => {
            const deletedItemId = res.data.deletedSubscription._id;

            setSubscribedItems((prevItems) => prevItems.filter((item) => item.id !== deletedItemId));
        }).catch(error => {
            toast.error('Failed to remove item!');
        });
    };

    return (
        <div style={{maxWidth: '1240px', margin: '0 auto', padding: '0 16px'}}>
            <h1>{t('welcome')}</h1>
            <label>{t('changeLanguage')}:</label>
            <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
                <option value="en">English</option>
                <option value="uk">Українська</option>
            </select>

            <Box sx={{marginTop: '20px'}}>
                <Button variant="contained" color="primary" onClick={handleModalOpen}>
                    Додати нове нагадування
                </Button>
            </Box>

            {/* Subscribed Items List */}
            {
                subscribedItems.length ? (<div style={{marginTop: '20px'}}>
                    <h2>Subscribed Items</h2>
                    <ul>
                        {subscribedItems.map((item) => (
                            <li key={item.id}
                                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span>
                                      {item.type} - {item.date} - ${item.price} - {item.email}
                                    </span>
                                <Button
                                    variant="text"
                                    onClick={() => handleRemoveItem(item._id)}
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
                    <h2>Enter Details</h2>
                    {/* Table for modal items */}
                    <div style={{marginBottom: '16px'}}>
                        <label>Type: </label>
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Enter type"
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                        />
                        {errors.type && <p style={{color: 'red'}}>{errors.type}</p>}
                    </div>
                    <div style={{marginBottom: '16px'}}>
                        <label>Date: </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                renderInput={(params) => <input {...params} />}
                            />
                        </LocalizationProvider>
                        {errors.date && <p style={{color: 'red'}}>{errors.date}</p>}
                    </div>
                    <div style={{marginBottom: '16px'}}>
                        <label>Price: </label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                        />
                        {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                    </div>
                    <div style={{marginBottom: '16px'}}>
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                        />
                        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
                        <Button variant="outlined" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};