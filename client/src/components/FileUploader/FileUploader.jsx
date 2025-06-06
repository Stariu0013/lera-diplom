import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {seedTransactionsFromCsv} from "../../utils/csvUtils.js";

const FileUploader = ({ onFileUpload, onSucceed, csvFile }) => {
    const { t } = useTranslation();

    const handleFileUpload = (event) => {
        if (event.target.files) {
            onFileUpload(event.target.files[0]);
        }
    };

    const handleImportCsv = () => {
        if (csvFile) {
            seedTransactionsFromCsv(csvFile, onSucceed);
            toast.success(t('toastImportSuccess'));
        } else {
            toast.error(t('toastImportError'));
        }
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
            <Typography variant="h6">{t('uploadCsv')}</Typography>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ marginBottom: '10px', marginTop: '10px', display: 'block' }}
            />
            <Button
                variant="contained"
                sx={{ backgroundColor: 'primary.main', color: 'white', mt: 1 }}
                disabled={!csvFile}
                onClick={handleImportCsv}
            >
                {t('importCsvButton')}
            </Button>
        </Box>
    );
};

export default FileUploader;