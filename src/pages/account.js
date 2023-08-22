import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  CardContent,
  Avatar,
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
import { string } from 'prop-types';
import { themeCores } from '../theme/colors'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useRouter } from 'next/router';

const Page = () => {

  const api = useApi();
  const router = useRouter();

  const [imagemModel, setImagemModel] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      ddd: string | null,
      telefone: '' | null,
      observacao: '' | null,
      avatar: '' | null,
      tipoImagem: '' | null,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('E-mail inválido')
        .max(255)
        .required('E-mail é obrigatório'),
        ddd:Yup
          .string()
          .max(3),
        telefone: Yup
          .string()
          .max(20),
        observacao: Yup
          .string()
          .max(255),
    }),
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
        const { nome, telefone, ddd, observacao, email, enderecoId, avatar, tipoImagem } = user;
        formik.setValues({ nome, telefone, ddd, observacao, email, enderecoId, avatar, tipoImagem });

        if (tipoImagem && avatar) {
          setImagemModel(`data:image/${tipoImagem};base64,${avatar}`)
        }
      }
    }

    init();
  }, [])

  const openFile = (event) => {

    event.preventDefault();

    if (event.target.files) {
      const input = event.target.files[0];
      if (input) {

        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result == 'string') {
            var index = reader.result.indexOf(',') + 1;
            var indexTipoFoto = reader.result.indexOf('/') + 1;
            var indexTipoFotoVirgula = reader.result.indexOf(';');
            var tipoFotoInicial = reader.result.slice(indexTipoFoto, indexTipoFotoVirgula);
            var base64 = reader.result.slice(index);
            formik.setValues({
              ...formik.values,
              avatar: base64,
              tipoImagem: tipoFotoInicial
            })

            setImagemModel(reader.result);

            const image = new Image();
            image.src = reader.result;
          }
        };
        reader.readAsDataURL(input);
      }
    }
  };

  return (
    <>
      <Head>
        <title>
          Bella rosa
        </title>
      </Head>
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
                  lg={4}
                >
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Avatar
                          src={imagemModel}
                          sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                          }}
                        />
                        <Typography
                          gutterBottom
                          variant="h5"
                        >
                          {formik.values?.nome}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <label
                        htmlFor="arquivo"
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          lineHeight: '1.57',
                          FontFace: '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
                          color: '#6C737F',
                        }}
                      >
                        <PhotoCameraIcon
                          sx={{ color: themeCores.rosa }}
                        />
                        Sua Foto
                      </label>
                      <input
                        style={{ display: 'none' }}
                        type="file"
                        className="imgInput"
                        accept="image/*"
                        id="arquivo"
                        onChange={(e) => openFile(e)}
                      />

                    </CardActions>
                  </Card>
                </Grid>
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
                              />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField
                                fullWidth
                                label="DDD"
                                name="ddd"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values?.ddd}
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
                                value={formik.values?.telefone}
                              />
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                            >
                              <TextField
                                fullWidth
                                label="Observação"
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
