import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

export const Page = () => {
    return(
        <p>Pedidos</p>
    );
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;