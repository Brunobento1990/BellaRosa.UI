import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

export const Page = () => {

    const [products, setProducts] = useState([]);
    const api = useApi();

    useEffect(() => {
        const init = async () => {
            const response = await api.get("lista-produto"); 
            console.log(response)
        }
        init();
    },[])

    return(
        <p>produtos</p>
    );
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;