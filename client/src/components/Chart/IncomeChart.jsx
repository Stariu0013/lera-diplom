import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './IncomeChart.module.scss';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function IncomeChart({ transactions }) {
    const incomeTransactions = transactions.filter(t => t.type === 'income');

    const groupedData = incomeTransactions.reduce((acc, t) => {
        if (!acc[t.category]) {
            acc[t.category] = 0;
        }
        acc[t.category] += t.amount;
        return acc;
    }, {});

    const categories = Object.keys(groupedData);
    const amounts = Object.values(groupedData);

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: 'Доходи',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Категорія',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Сума (₴)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Графік доходів за категоріями</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default IncomeChart;