import axios from 'axios';
const API_URL = 'http://localhost:5125/api/transactions';

const fetchTransactions = async () => {
    const { data } = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data;
};

const addTransaction = async (transaction) => {
    const { data } = await axios.post(API_URL, transaction, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data;
};

const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
};

export default { fetchTransactions, addTransaction, deleteTransaction };