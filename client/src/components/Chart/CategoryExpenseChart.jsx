import React from "react";
import { Doughnut } from "react-chartjs-2";

function CategoryExpenseChart({ data }) {
    const categories = Object.keys(data); // Категорії
    const percentages = Object.values(data).map(val => parseFloat(val));

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: "Відсоток витрат за категоріями",
                data: percentages,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56",
                    "#74C476", "#A1DAB4", "#B3DE69", "#FDD49E", "#B3CDE3", "#FDB462", "#FCCDE5"
                ],
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