import { useEffect, useState } from 'react';
import transactionService from '../services/transactionService';

const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        transactionService.fetchTransactions().then(setTransactions);
    }, []);

    const addTransaction = async (transaction) => {
        const newTransaction = await transactionService.addTransaction(transaction);
        setTransactions((prev) => [...prev, newTransaction]);
    };


    const deleteTransaction = async (id) => {
        await transactionService.deleteTransaction(id);
        setTransactions((prev) => prev.filter((t) => t._id !== id));
    };

    const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const outcome = transactions
        .filter((t) => t.type === 'outcome')
        .reduce((sum, t) => sum + t.amount, 0);

    return { transactions, setTransactions, addTransaction, deleteTransaction, income, outcome };
};

export default useTransactions;