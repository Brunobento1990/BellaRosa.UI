import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { SvgIcon } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const items = [
  {
    title: 'Home',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Categorias',
    path: '/category',
    icon: (
      <SvgIcon fontSize="small">
        <CategoryIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Produtos',
    path: '/products',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Perfil',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Seu endereço',
    path: '/address',
    icon: (
      <SvgIcon fontSize="small">
        <AddLocationIcon />
      </SvgIcon>
    )
  }
  ,
  {
    title: 'Seus pedidos',
    path: '/requests',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBasketIcon />
      </SvgIcon>
    )
  }
  ,
  {
    title: 'Carrinho',
    path: '/cart',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartIcon />
      </SvgIcon>
    )
  }
];
