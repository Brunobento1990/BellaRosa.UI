import { useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { themeCores } from '../../theme/colors'
import * as Yup from 'yup';
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useApi } from 'src/hooks/use-api';

const Page = () => {

  const api = useApi();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('E-mail inválido')
        .max(255)
        .required('E-mail é obrigatório'),
      password: Yup
        .string()
        .max(255)
        .required('Senha é obrigatório')
    }),
    onSubmit: async (values, helpers) => {
      try {
        api.login(values)

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleSkip = useCallback(
    () => {
      router.push('/esqueceu-senha');
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>
          Bella rosa
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: themeCores.rosa
                }}
              >
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Não tem uma conta?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                  sx={{
                    color: themeCores.rosa
                  }}
                >
                  Cadastre - se
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Senha"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                style={{ backgroundColor: themeCores.rosa }}
              >
                Continue
              </Button>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                onClick={handleSkip}
              >
                Esqueceu sua senha?
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
