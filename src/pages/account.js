import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  CardContent,
  Divider,
  CardActions,
  Button,
  TextField
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useApi } from 'src/hooks/use-api';
import * as Yup from 'yup';
import { themeCores } from '../theme/colors'
import { useRouter } from 'next/router';
import { MaskTel } from 'src/utils/maskTel';

const maxCaracter = 'Número máximo de caracteres';
const validation = {
  email: Yup
    .string()
    .email('E-mail inválido')
    .max(255, maxCaracter)
    .required('E-mail é obrigatório'),
  ddd: Yup
    .string()
    .max(3, maxCaracter),
  telefone: Yup
    .string()
    .max(20, maxCaracter),
  observacao: Yup
    .string()
    .max(255, maxCaracter),
};


const Page = () => {

  const api = useApi();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      telefone: '' ,
      observacao: '' ,
      dataDeNascimento: '' ,
      submit: null
    },
    validationSchema: Yup.object(validation),
    onSubmit: async (values, helpers) => {
      try {
        await api.put("edit-cliente", values);
        router.push("/")
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    const init = async () => {
      const user = await api.get("retorna-cliente");
      if (user?.nome) {
        let { nome, telefone, observacao, email, enderecoId, dataDeNascimento } = user;
        if(dataDeNascimento){
          dataDeNascimento = dataDeNascimento.slice(0,10)
        }
        formik.setValues({ nome, telefone, observacao, email, enderecoId, dataDeNascimento });
      }
    }

    init();
  }, [])

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography
                variant="h4"
                color={themeCores.rosa}
              >
                Perfil
              </Typography>
            </div>
            <form
              onSubmit={formik.handleSubmit}
            >
              <Grid
                container
                spacing={3}
              >
                
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <div
                  >
                    <Card>
                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                          <Grid
                            container
                            spacing={3}
                          >
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField
                                fullWidth
                                label="E-mail"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values?.email}
                                inputProps={{
                                  maxLength:255
                                }}
                              />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField
                                fullWidth
                                label="Telefone"
                                name="telefone"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={MaskTel(formik.values?.telefone)}
                              />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField
                                fullWidth
                                label="Data de nascimento"
                                name="dataDeNascimento"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="date"
                                value={formik.values?.dataDeNascimento}
                              />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField
                                fullWidth
                                label="Sobre mim"
                                name="observacao"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values?.observacao}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ justifyContent: 'flex-end' }} >
                        <Button
                          variant="contained"
                          style={{ backgroundColor: themeCores.rosa }}
                          type="submit"
                          onClick={() => formik.onSubmit}
                        >
                          Editar
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
