function getCategoryInsights(categoryStats) {
    const entries = Object.entries(categoryStats).map(([category, percentage]) => ({
        category,
        percentage: parseFloat(percentage),
    }));

    const mostExpensive = entries.reduce((max, curr) => (curr.percentage > max.percentage ? curr : max));
    const leastExpensive = entries.reduce((min, curr) => (curr.percentage < min.percentage ? curr : min));

    return {
        mostExpensiveCategory: mostExpensive.category,
        mostExpensivePercentage: mostExpensive.percentage,
        leastExpensiveCategory: leastExpensive.category,
        leastExpensivePercentage: leastExpensive.percentage,
    };
}

function getOverBudgetMessage(overBudget, averageExpense, predictedExpense) {
    if (overBudget) {
        return (
            `⚠️ Передбачувані витрати (${predictedExpense} грн) перевищують ваш середній бюджет (${averageExpense} грн). ` +
            `Рекомендуємо скоротити витрати, щоб уникнути фінансових труднощів.`
        );
    } else {
        return (
            `✅ Ваші передбачувані витрати (${predictedExpense} грн) знаходяться в межах бюджету (${averageExpense} грн). ` +
            `Добра робота! Продовжуйте слідкувати за витратами.`
        );
    }
}

export { getCategoryInsights, getOverBudgetMessage };