import React from "react";
import { Bar } from "react-chartjs-2";

function IncomeComparisonChart({ data }) {
    const months = Object.keys(data);
    const incomes = Object.values(data);

    const chartData = {
        labels: months.map((month) =>
            new Date(`${month}-01`).toLocaleString("default", {
                month: "long",
                year: "numeric",
            })
        ),
        datasets: [
            {
                label: "Щомісячний дохід",
                data: incomes,
                backgroundColor: ["#36A2EB", "#FF6384"],
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
            <p>Графік порівняння доходів</p>
        </div>
    );
}

export default IncomeComparisonChart;