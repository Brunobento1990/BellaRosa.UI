import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useApi } from 'src/hooks/use-api';
import SliderPromocao from 'src/sections/home/slider-promocao';
import { useEffect, useState } from 'react';

const Page = () => {

  const api = useApi();

  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const init = async () => {
      const response = await api.get("lista-banner");
      setBanner(response)
      console.log(response)
    }

    init();
  },[])

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <SliderPromocao
          promocoes={banner}
        />
      </Container>
    </Box>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
