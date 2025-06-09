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
    { title: 'Пасивний дохід', icon: <AccountBalanceIcon /> },
    { title: 'Заробітня плата', icon: <AttachMoneyIcon /> },
    { title: 'Накопичення', icon: <SavingsIcon /> },
];

const outcomeCategories = [
    { title: 'Податки', icon: <HomeIcon /> },
    { title: 'Автомобіль', icon: <DirectionsCarIcon /> },
    { title: 'Одяг', icon: <ShoppingCartIcon /> },
    { title: `Зв'язок`, icon: <SmartphoneIcon /> },
    { title: 'Кафе/ресторани', icon: <FastfoodIcon /> },
    { title: 'Розваги', icon: <MovieIcon /> },
    { title: 'Їжа', icon: <FastfoodIcon /> },
    { title: 'Подарунки', icon: <CardGiftcardIcon /> },
    { title: `Здоров'я`, icon: <HealthAndSafetyIcon /> },
    { title: 'Проживання', icon: <HomeIcon /> },
    { title: 'Хатні улюбленці', icon: <PetsIcon /> },
    { title: 'Спорт', icon: <FitnessCenterIcon /> },
    { title: 'Транспорт', icon: <CommuteIcon /> },
    { title: 'Побутові витрати', icon: <SpaIcon /> },
];

export { incomeCategories, outcomeCategories };
