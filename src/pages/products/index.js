import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { TodosProdutos } from 'src/sections/products/todos-produtos';
import { Box, Typography, TextField } from '@mui/material';
import { themeCores } from 'src/theme/colors';

export const Page = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [initial, setInitial] = useState(true);
    const api = useApi();

    const init = async () => {
        const response = await api.get(`lista-produto?search=`);
        setProducts(response)
        setInitial(false)
    }

    const searchProdutos = async () => {
        if (!initial) {
            if (search.length > 2) {
                const response = await api.get(`lista-produto?search=${search}`);
                setProducts(response)
            } else if (search.length === 0) {
                const response = await api.get(`lista-produto?search=`);
                setProducts(response)
            }
        }
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        searchProdutos();
    }, [search])

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                margin: 2
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    color: themeCores.rosa,
                }}
            >
                Produtos
            </Typography>
            <TextField
                sx={{
                    marginTop: 2,
                    maxWidth: '600px'
                }}
                fullWidth
                label="Pesquisar"
                name="pesquisar"
                onChange={(value) => setSearch(value.target.value)}
                type="text"
                value={search}
            />
            <TodosProdutos
                productsParam={products}
            />
        </Box>
    );
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;