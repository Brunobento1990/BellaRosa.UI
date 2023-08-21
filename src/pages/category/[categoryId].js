import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import {
    Card,
    CardHeader,
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
            <CardHeader title={`Categoria : ${category?.descricao}`} sx={{
                color: themeCores.rosa
            }} />
            
        </Card>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;