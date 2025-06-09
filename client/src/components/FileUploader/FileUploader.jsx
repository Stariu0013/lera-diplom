import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { seedTransactionsFromCsv } from "../../utils/csvUtils.js";

const FileUploader = ({ onFileUpload, onSucceed, csvFile }) => {
    const fileInputRef = React.useRef();

    const handleFileUpload = (event) => {
        if (event.target.files) {
            onFileUpload(event.target.files[0]);
        }
    };

    const handleImportCsv = () => {
        if (csvFile) {
            seedTransactionsFromCsv(csvFile, onSucceed);
            toast.success('Дані успішно додано!');
        } else {
            toast.error('Будь ласка, виберіть файл для імпорту!');
        }
    };

    const handleCustomClick = () => {
        fileInputRef.current.click(); // Trigger hidden file input click
    };

    return (
        <Box
            sx={{
                my: 3,
                p: 2,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                bgcolor: 'grey.100',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
            }}
        >
            <Typography variant="h6">Завантажте виписку</Typography>
            <Typography sx={{ margin: '10px 0' }}>
                Необхідно завантажити CSV файл, що попередньо викачаний з онлайн-банкінгу
            </Typography>

            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, mb: 2 }}>
                <Button
                    variant="outlined"
                    onClick={handleCustomClick}
                >
                    Вибрати файл
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'primary.main', color: 'white' }}
                    disabled={!csvFile}
                    onClick={handleImportCsv}
                >
                    Імпортувати дані
                </Button>
            </Box>

        </Box>
    );
};

export default FileUploader;