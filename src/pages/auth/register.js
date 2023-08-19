import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useApi } from 'src/hooks/use-api';
import { themeCores } from '../../theme/colors'

const Page = () => {
  const router = useRouter();
  const api = useApi();
  const formik = useFormik({
    initialValues: {
      email: '',
      nome: '',
      password: '',
      rePassword:'',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('E-mail inválido')
        .max(255)
        .required('E-mail é obrigatório'),
      nome: Yup
        .string()
        .max(255)
        .required('Nome é obrigatório'),
      password: Yup
        .string()
        .max(20)
        .required('Senha é obrigatório'),
      rePassword: Yup
        .string()
        .max(20)
        .required('Confirme sua senha')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await api.createUser(values)
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
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
                  color:themeCores.rosa
                }}
              >
                Cadastrar
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Já tem uma conta?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                  sx={{
                    color:themeCores.rosa
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.nome && formik.errors.nome)}
                  fullWidth
                  helperText={formik.touched.nome && formik.errors.nome}
                  label="Nome"
                  name="nome"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="E-mail"
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
                <TextField
                  error={!!(formik.touched.rePassword && formik.errors.rePassword)}
                  fullWidth
                  helperText={formik.touched.rePassword && formik.errors.rePassword}
                  label="Confirmar senha"
                  name="rePassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.rePassword}
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
                style={{ backgroundColor: 'rgb(241, 99, 210)' }}
              >
                Continue
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
