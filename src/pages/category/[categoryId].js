import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import Head from 'next/head';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import {
    CardHeader,
    Stack,
    Button,
    Box,
    Container,
    Grid,
    SvgIcon
} from '@mui/material';
import { themeCores } from '../../theme/colors'
import { CardProduct } from 'src/sections/cards/card-product';
import { OrderBy } from 'src/components/order-by';
import { Options } from 'src/sections/configs/optionsOrderByCategoria';

export const Page = () => {

    const route = useRouter();
    const api = useApi();
    const id = route.query.categoryId;
    const [category, setCategory] = useState({});
    const [orderBy, setOrderBy] = useState("");

    const init = async () => {
        const response = await api.get(`retorna-categoria?id=${id}&orderBy=${orderBy}`)
        setCategory(response)
    }
    console.log(orderBy)
    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        init();
    }, [orderBy])

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
                            sm={12}
                            sx={6}

                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap={10}

                            >
                                <CardHeader title={category?.descricao ?? ""} sx={{
                                    color: themeCores.rosa,
                                    textAlign: 'center',
                                }} />
                            </Box>
                            <OrderBy
                                title="Ordenar por"
                                options={Options}
                                handleClickParam={(value) => setOrderBy(Options.filter(x => x.index == value)[0].value)}
                            />
                        </Grid>
                        {category?.produtos?.map((product, index) => (
                            <CardProduct
                                key={index}
                                product={product}
                            />
                        ))}

                        <Button
                            onClick={() => route.push("/category")}
                            startIcon={(
                                <SvgIcon fontSize="small">
                                  <ArrowLeftIcon />
                                </SvgIcon>
                              )}
                            sx={{
                                height: '50px',
                                color: themeCores.rosa,
                                border: `solid 1px ${themeCores.rosa}`,
                                display:'flex',
                                gap:'10px'
                            }}
                        >
                            Voltar
                        </Button>

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