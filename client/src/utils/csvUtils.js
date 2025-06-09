import Papa from 'papaparse';
import { amountEn, amountUa, typeUa, timeEn,typeEn, timeUa, titleEn, titleUa } from '../types/scvFileType';
import axios from "axios";

export const parseCsvFile = (csvFile) => {
    if (!csvFile) return Promise.reject(new Error('No CSV file provided'));

    return new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                try {
                    const newTransactions = result.data.map((row) => {
                        const type = row[typeUa] || row[typeEn];
                        return {
                            time: row[timeUa] || row[timeEn],
                            description: row[titleUa] || row[titleEn],
                            amount: parseFloat(row[amountUa] || row[amountEn]),
                            type: type.indexOf('-') === 0 ? 'outcome' : 'income',
                            category: 'other',
                        };
                    });
                    resolve(newTransactions);
                } catch (error) {
                    reject(error);
                }
            },
            error: (error) => reject(error),
        });
    });
};


export async function seedTransactionsFromCsv(csvFile, callback) {
    try {
        const userId = '684090a24dfff4a3439337d7';

        const parsedTransactions = await parseCsvFile(csvFile);

        const transactionsForDb = parsedTransactions.map((transaction) => {
            const createdAt = new Date(transaction.time);

            return {
                userId,
                amount: transaction.amount,
                description: transaction.description,
                type: transaction.type,
                category: transaction.category,
                createdAt,
                updatedAt: createdAt,
            };
        });

        axios.post('https://lera-diplom-api.onrender.com/api/transactions/bulk', transactionsForDb, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }).then(res => {
            callback(res.data);
        });
    } catch (error) {
        console.error('Error seeding transactions:', error.message);
    }
}
