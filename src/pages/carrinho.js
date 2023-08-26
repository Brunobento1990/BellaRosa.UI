import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box } from '@mui/material'

const Page = () => {
    return(
        <Box>
            <p>teste</p>
        </Box>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;