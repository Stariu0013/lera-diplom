import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const TransactionList = memo(({ transactions, deleteTransaction }) => {
    const { t: ttag } = useTranslation();

    const listStyles = {
        maxHeight: '300px',
        overflowY: 'auto',
    };

    return (
        <List sx={listStyles}>
            {transactions.map((t) => (
                <ListItem
                    key={t._id}
                    secondaryAction={
                        <IconButton edge="end" onClick={() => deleteTransaction(t._id)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    }
                >
                    <ListItemText
                        primary={`${t.description} - $${t.amount}`}
                        secondary={`${t.type ? ttag('Type', { context: t.type }) : ttag('Type')}`}
                    />
                </ListItem>
            ))}
        </List>
    );
});

export default TransactionList;