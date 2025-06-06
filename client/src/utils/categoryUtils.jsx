import SavingsIcon from '@mui/icons-material/Savings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PetsIcon from '@mui/icons-material/Pets';
import CommuteIcon from '@mui/icons-material/Commute';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MovieIcon from '@mui/icons-material/Movie';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const incomeCategories = [
    { title: 'Deposit', icon: <AccountBalanceIcon /> },
    { title: 'Salary', icon: <AttachMoneyIcon /> },
    { title: 'Savings', icon: <SavingsIcon /> },
];

const outcomeCategories = [
    { title: 'Bills', icon: <HomeIcon /> },
    { title: 'Car', icon: <DirectionsCarIcon /> },
    { title: 'Clothes', icon: <ShoppingCartIcon /> },
    { title: 'Communication', icon: <SmartphoneIcon /> },
    { title: 'Eating Out', icon: <FastfoodIcon /> },
    { title: 'Entertainment', icon: <MovieIcon /> },
    { title: 'Food', icon: <FastfoodIcon /> },
    { title: 'Gifts', icon: <CardGiftcardIcon /> },
    { title: 'Health', icon: <HealthAndSafetyIcon /> },
    { title: 'House', icon: <HomeIcon /> },
    { title: 'Pets', icon: <PetsIcon /> },
    { title: 'Sports', icon: <FitnessCenterIcon /> },
    { title: 'Taxi', icon: <CommuteIcon /> },
    { title: 'Toiletry', icon: <SpaIcon /> },
    { title: 'Transport', icon: <CommuteIcon /> },
];

export { incomeCategories, outcomeCategories };
