import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Select, MenuItem, Modal, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTransactions from '../../hooks/useTransactions.jsx';
import TransactionList from '../../components/TransactionList/TransactionList.jsx';
import TransactionModal from '../../components/Modal/TransactionModal.jsx';
import OutcomeChart from '../../components/Chart/OutcomeChart.jsx';
import { incomeCategories, outcomeCategories } from '../../utils/categoryUtils.jsx';
import TransactionSummary from '../../components/TransactionSummary/TransactionSummary.jsx';
import TransactionControls from '../../components/TransactionControls/TransactionControls.jsx';
import FileUploader from '../../components/FileUploader/FileUploader.jsx';
import IncomeChart from "../../components/Chart/IncomeChart.jsx";
import axiosInstance from "../../helpers/axios.js";
import CategoryExpenseChart from "../../components/Chart/CategoryExpenseChart.jsx";
import IncomeComparisonChart from "../../components/Chart/IncomeComparisonChart.jsx";
import {getCategoryInsights, getOverBudgetMessage} from "../../utils/getCategoryInsights.js";

function BudgetTracker() {
    const { transactions, setTransactions, addTransaction, deleteTransaction } = useTransactions();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('income');
    const [dataModalOpen, setDataModalOpen] = useState(false);
    const [budget, setBudget] = useState(0);
    const [csvFile, setCsvFile] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [errors, setErrors] = useState({ budget: '', months: '' });

    const [isUseIncome, setIsUseIncome] = useState(false);

    const years = Array.from(new Set(transactions.map(t => new Date(t.createdAt).getFullYear())));

    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.createdAt);
        const transactionMonth = transactionDate.getMonth() + 1;
        const transactionYear = transactionDate.getFullYear();
        return transactionMonth === selectedMonth && transactionYear === selectedYear;
    });

    const filteredIncome = filteredTransactions
        .filter(transaction => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

    const filteredOutcome = filteredTransactions
        .filter(transaction => transaction.type === 'outcome')
        .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

    useEffect(() => {
        setBudget(isUseIncome ? filteredIncome : filteredOutcome);
    }, [filteredOutcome, isUseIncome]);

    const handleSubmitData = () => {
        const newErrors = { budget: '', months: '' };

        if (budget <= 0) {
            newErrors.budget = 'Budget must be greater than 0';
        }

        setErrors(newErrors);

        if (newErrors.months) {
            toast.error('Please fix the errors before submitting.');
            return;
        }

        axiosInstance.post('/analysis', {
            transactions: filteredTransactions,
            budget,
        }).then(response => {
            console.log(response);
            setAnalysisData(response.data);
            toast.success('Analysis data submitted successfully!');
            setDataModalOpen(false);
            setBudget(0);
        }).catch(error => {
            console.error(error);
            toast.error('Failed to submit analysis data!');
        });
    };

    const handleAddTransaction = transaction => {
        if (transaction.amount < 1) {
            toast.error('Amount must be greater than or equal to 1.');
            return;
        }
        if (!transaction.description || !transaction.amount) {
            toast.error('All fields are required.');
            return;
        }
        addTransaction({
            ...transaction,
            type: modalType,
        });
        setModalOpen(false);
        toast.success(`${modalType === 'income' ? 'Income' : 'Outcome'} added successfully!`);
    };

    const overBudgetMessage = analysisData ?
        getOverBudgetMessage(
            analysisData.forecast.overBudget,
            analysisData.forecast.averageExpense,
            analysisData.forecast.predictedExpense
        ) : '';

    const categoryInsights = analysisData
        ? getCategoryInsights(analysisData.categoryStats)
        : null;

    return (
        <Box
            sx={{
                maxWidth: 1240,
                mx: 'auto',
                mt: 4,
                p: 2,
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}
            >
                💰 Budget Tracker
            </Typography>

            <FileUploader onFileUpload={setCsvFile} onSucceed={setTransactions} csvFile={csvFile} />

            <TransactionControls
                onAddIncome={() => {
                    setModalType('income');
                    setModalOpen(true);
                }}
                onAddOutcome={() => {
                    setModalType('outcome');
                    setModalOpen(true);
                }}
            />

            <Button
                variant="contained"
                color="primary"
                sx={{ my: 2 }}
                onClick={() => setDataModalOpen(true)}
            >
                Open Analysis Modal
            </Button>

            <Modal
                open={dataModalOpen}
                onClose={() => setDataModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Submit Analysis Data
                    </Typography>

                    {/* Radio Toggler */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Set Budget Source:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant={isUseIncome ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => setIsUseIncome(true)}
                            >
                                Use Income
                            </Button>
                            <Button
                                variant={!isUseIncome ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => setIsUseIncome(false)}
                            >
                                Use Outcome
                            </Button>
                        </Box>
                    </Box>

                    <TextField
                        fullWidth
                        label="Budget"
                        type="number"
                        value={budget}
                        onChange={(e) => {
                            setBudget(+e.target.value);
                            setErrors((prev) => ({ ...prev, budget: '' })); // Clear error on change
                        }}
                        sx={{ mt: 2 }}
                        error={!!errors.budget}
                        helperText={errors.budget}
                    />

                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '1.25rem', md: '1.5rem', },
                            textAlign: { xs: 'left', sm: 'center', },
                        }}
                    >
                        Рахується зміна бюджету через інфляцію в порівнянні з попереднім місяцем
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitData}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setDataModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Column for extra small screens, row for small and above
                    justifyContent: { xs: 'flex-start', sm: 'center' }, // Align left on mobile, center on larger screens
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}> {/* Align text left on small devices */}
                    <Typography variant="h6">Filter by Month</Typography>
                    <Select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        sx={{
                            width: { xs: '100%', sm: 200 }, // Full-width on mobile, fixed width on larger screens
                            mt: 1,
                        }}
                    >
                        {Array.from({ length: 12 }).map((_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {new Date(0, index).toLocaleString('uk', { month: 'long' })}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}> {/* Align text left on small devices */}
                    <Typography variant="h6">Filter by Year</Typography>
                    <Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        sx={{
                            width: { xs: '100%', sm: 200 }, // Full-width on mobile, fixed width on larger screens
                            mt: 1,
                        }}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
            <TransactionSummary income={filteredIncome} outcome={filteredOutcome} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 1 }}>
                    Transactions Overview
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4
                    }}
                >
                    <OutcomeChart transactions={filteredTransactions} />
                    <IncomeChart transactions={filteredTransactions} />
                </Box>

            </Box>

            {analysisData && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Analysis Insights
                    </Typography>

                    {/* Expense Breakdown by Category */}
                    <CategoryExpenseChart data={analysisData.categoryStats} />

                    {/* Monthly Income Comparison */}
                    <IncomeComparisonChart data={analysisData.monthlyIncome} />

                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Пояснення для аналізу
                    </Typography>

                    {/* Показуємо повідомлення про бюджет */}
                    <Typography sx={{ mb: 2 }}>
                        {overBudgetMessage}
                    </Typography>

                    {/* Показуємо рекомендації по категоріях */}
                    <Typography>
                        📊 Найбільша витрата: {categoryInsights.mostExpensiveCategory} ({categoryInsights.mostExpensivePercentage}%).
                    </Typography>
                    <Typography>
                        🛠 Найменша витрата: {categoryInsights.leastExpensiveCategory} ({categoryInsights.leastExpensivePercentage}%).
                    </Typography>

                </Box>
            )}


            <TransactionList transactions={filteredTransactions} deleteTransaction={deleteTransaction} />

            <TransactionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                modalType={modalType}
                categories={modalType === 'income' ? incomeCategories : outcomeCategories}
                onSubmit={handleAddTransaction}
            />

            <ToastContainer />
        </Box>
    );
}

export default BudgetTracker;