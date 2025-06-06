import React from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next"; // Import i18n translation hook

function IncomeComparisonChart({ data }) {
    const { t } = useTranslation(); // Initialize i18n translation function

    const months = Object.keys(data);
    const incomes = Object.values(data);

    const chartData = {
        labels: months.map(month => 
            new Date(`${month}-01`).toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
            })
        ), // Format month-year, could localize if required
        datasets: [
            {
                label: t("Monthly Income"), // Wrap dataset label for translation
                data: incomes,
                backgroundColor: ["#36A2EB", "#FF6384"], // Add more colors if needed
                borderColor: ["#36A2EB", "#FF6384"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
            <Bar data={chartData} options={options} />
            <p>{t("Income Comparison Chart")}</p> {/* Optionally, add a title */}
        </div>
    );
}

export default IncomeComparisonChart;