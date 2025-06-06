import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const OutcomeChart = ({ transactions }) => {
    const outcomes = transactions?.filter(t => t.type === 'outcome');

    const grouped = outcomes.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(grouped),
        datasets: [
            {
                label: 'Expenses',
                data: Object.values(grouped),
                backgroundColor: [
                    '#f21818', '#f26f18', '#f2c718', '#c7f218', '#007A33', '#00CFC1', '#5B00AE', '#1847f2',
                    '#7c18f2', '#d118f2', '#f2189e', '#f2185c', '#f21832', '#18f2a2', '#18f2f0'
                ],
                borderWidth: 1,
            },
        ],
    };

    return transactions ? (
        <div className="max-w-md mx-auto mt-6">
            <h2 className="text-xl font-bold mb-2">Outcome Chart</h2>
            <Pie data={data} />
        </div>
    ) : null;
};

export default OutcomeChart;
