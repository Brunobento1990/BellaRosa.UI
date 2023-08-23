import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import Head from 'next/head';
import {
    CardHeader,
    Stack,
    Button,
    Box,
    Container,
    Grid,
} from '@mui/material';
import { themeCores } from '../../theme/colors'
import { CardProduct } from 'src/sections/cards/card-product';
import { OrderBy } from 'src/components/order-by';

export const Page = () => {

    const route = useRouter();
    const api = useApi();
    const id = route.query.categoryId;
    const [category, setCategory] = useState({});
    const [orderBy, setOrderBy] = useState("");

    useEffect(() => {
        const init = async () => {
            const response = await api.get(`retorna-categoria?id=${id}&orderBy=${orderBy}`)
            setCategory(response)
        }
        init();
    }, [])

    return (
        <>
            <Head>
                <title>
                    Bella rosa
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap={10}
                            >
                                <CardHeader title={category?.descricao ?? ""} sx={{
                                    color: themeCores.rosa,
                                    textAlign:'center',
                                }} />
                                <Button
                                    onClick={() => route.push("/category")}
                                    sx={{
                                        height:'50px'
                                    }}
                                >
                                    Voltar
                                </Button>
                            </Box>
                        </Grid>
                        <OrderBy/>
                        {category?.produtos?.map((product, index) => (
                            <CardProduct
                                key={index}
                                product={product}
                            />
                        ))}

                    </Stack>
                </Container>
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;