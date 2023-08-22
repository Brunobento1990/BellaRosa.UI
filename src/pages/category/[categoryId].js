import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import Head from 'next/head';
import {
    CardHeader,
    Stack,
    Divider,
    Button,
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import { themeCores } from '../../theme/colors'
import { CardProduct } from 'src/sections/cards/card-product';

export const Page = () => {

    const route = useRouter();
    const api = useApi();
    const id = route.query.categoryId;
    const [category, setCategory] = useState({});

    useEffect(() => {
        const init = async () => {
            const response = await api.get(`retorna-categoria?id=${id}`)
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
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Card
                                    sx={{
                                        width: '90%',
                                        margin: '20px'
                                    }}
                                >
                                    <CardHeader title={`Categoria : ${category?.descricao ?? ""}`} sx={{
                                        color: themeCores.rosa
                                    }} />

                                    <Divider />
                                    <Stack
                                        alignItems="center"
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={2}
                                        sx={{ p: 2 }}
                                    >

                                        <Button
                                            fullWidth
                                            onClick={() => route.push("/category")}
                                        >
                                            Voltar
                                        </Button>
                                    </Stack>
                                </Card>
                            </Grid>
                        </Grid>
                        {category?.produtos?.map((product, index) => (
                            <CardProduct
                                key={index}
                                product={product}
                            />
                        ))

                        }

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