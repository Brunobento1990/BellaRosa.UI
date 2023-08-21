import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import {
    Card,
    CardHeader,
    Stack,
    Divider
} from '@mui/material';
import { themeCores } from '../../theme/colors'

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
    },[])

    return(
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
                <Stack
                alignItems="center"
                direction="row"
                spacing={1}
                >
                
                </Stack>
            </Stack>
        </Card>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;