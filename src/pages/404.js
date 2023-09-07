import Head from 'next/head';
import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { themeCores } from 'src/theme/colors';
import { useRouter } from 'next/navigation';
import { useAuthApp } from 'src/guards/auth-app';

const Page = () => {

  const router = useRouter();
  const authApp = useAuthApp()

  function handleLogout() {
    authApp.clearLocalStorage();
    router.push('/auth/login');
  }

  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            Sua sessão expirou, efetue o login novamente!
          </Typography>
          <Button
            component={NextLink}
            href="/auth/login"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            )}
            onClick={handleLogout}
            sx={{ mt: 3 }}
            variant="contained"
            style={{ backgroundColor: themeCores.rosa }}
          >
            Voltar para o login
          </Button>
        </Box>
      </Container>
    </Box>
  )
};

export default Page;
