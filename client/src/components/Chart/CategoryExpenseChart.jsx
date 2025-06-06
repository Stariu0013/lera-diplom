import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

function CategoryExpenseChart({ data }) {
    const { t } = useTranslation(); // i18n hook for translation

    // Transforming categoryStats data to chart.js format
    const categories = Object.keys(data); // Assume these keys are already localized
    const percentages = Object.values(data).map(val => parseFloat(val)); // Ensure values are numbers

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: t("Expense Percentage by Category"), // Tagging string for i18n
                data: percentages,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56",
                    "#74C476", "#A1DAB4", "#B3DE69", "#FDD49E", "#B3CDE3", "#FDB462", "#FCCDE5"
                ], // This is a palette of colors for categories
                hoverOffset: 5,
            },
        ],
    };

    return (
        <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
            <Doughnut data={chartData} />
        </div>
    );
}

export default CategoryExpenseChart;