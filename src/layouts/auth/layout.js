import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { logo } from '../../../public/assets/logo'
import { useLoader } from '../../components/loading/index'

export const Layout = (props) => {
  const { children } = props;
  const Loader = useLoader();

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Loader.Component />
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              height:'105px',
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 100,
                width: 100
              }}
            >
              {logo}
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background:  'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);',
            color:'#6C737F',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1,
              }}
              variant="h1"
            >
              Bem vindo a{' '}
              <Box
                component="a"
                sx={{ color: 'rgb(241, 99, 210)' }}
                target="_blank"
              >
                Bella Rosa
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
              O melhor e-commerce de roupas intimas do sul do país.
            </Typography>
            {logo}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};