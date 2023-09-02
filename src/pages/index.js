import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useApi } from 'src/hooks/use-api';
import SliderPromocao from 'src/sections/home/slider-promocao';
import { useEffect, useState } from 'react';
import { ProdutosDestaque } from 'src/sections/home/produtos-destaque';

const Page = () => {

  const api = useApi();

  const [banner, setBanner] = useState([]);
  const [produtosDestaque, setProdutosDestaque] = useState([]);

  const init = async () => {
    const response = await api.get("lista-banner");
    setBanner(response)
  }

  const produtoGet = async () => {
    const response = await api.get("lista-produto-destaque");
    setProdutosDestaque(response)
  }

  useEffect(() => {
    produtoGet();
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
      <Container maxWidth='xl'> 
        <ProdutosDestaque 
          productsParam={produtosDestaque}
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
