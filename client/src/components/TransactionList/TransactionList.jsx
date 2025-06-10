import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { memo } from 'react';

const TransactionList = memo(({ transactions, deleteTransaction }) => {
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
                        primary={`${t.description} - ₴${t.amount}`}
                        secondary={`Тип: ${t.type === 'outcome'? 'Витрати': 'Доходи'}`}
                    />
                </ListItem>
            ))}
        </List>
    );
});

export default TransactionList;