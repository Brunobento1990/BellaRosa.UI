import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
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
import { useFormik } from 'formik';
import { useApi } from 'src/hooks/use-api';
import * as Yup from 'yup';
import { themeCores } from '../theme/colors'
import { useEffect, useState } from 'react';
import { MasKCep } from 'src/utils/maskCep';
import { useRouter } from 'next/router';

const maxCaracter = 'Número máximo de caracteres';

const validation = Yup.object({
    cep: Yup
        .string()
        .max(10, maxCaracter)
        .required('CEP é obrigatório'),
    logradouro: Yup
        .string()
        .max(255, maxCaracter)
        .required('Informe a rua'),
    complemento: Yup
        .string()
        .max(255, maxCaracter),
    bairro: Yup
        .string()
        .max(50, maxCaracter)
        .required('Informe o bairro'),
    cidade: Yup
        .string()
        .max(50, maxCaracter)
        .required('Informe a cidade'),
    estado: Yup
        .string()
        .max(50, maxCaracter)
        .required('Informe o estado'),
})

export const Page = () => {

    const api = useApi();
    const route = useRouter();

    const formik = useFormik({
        initialValues: {
            id: '',
            cep: '',
            logradouro: '',
            complemento: undefined,
            bairro: '',
            cidade: '',
            estado: '',
        },
        validationSchema: validation,
        onSubmit: async (values, helpers) => {
            try {
                api.put("editar-endereco", values)
                route.push("/")
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const init = async () => {
            const response = await api.get('retorna-endereco');
            formik.setValues({
                ...response,
            })
        };
        init();
    }, [])

    useEffect(() => {
        const handleCep = async () => {

            if (formik?.values?.cep && formik?.values?.cep.length === 9) {
                const response = await api.getCep(formik?.values?.cep.replace('-', ''));
                formik.setValues({
                    cidade: response.cidade,
                    bairro: response.bairro,
                    estado: response.uf,
                    id: formik?.values?.id,
                    cep: formik?.values?.cep,
                    logradouro: response.logradouro,
                    complemento: response.complemento,
                })
            }
        }
        handleCep();

    }, [formik?.values?.cep])

    return (
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
                            Endereço
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
                                lg={12}
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
                                                        lg={2}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="CEP"
                                                            name="cep"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            required
                                                            type='text'
                                                            value={MasKCep(formik.values?.cep)}
                                                            inputProps={{
                                                                maxLength: 9
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={4}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Estado"
                                                            name="estado"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            type="text"
                                                            required
                                                            value={formik.values?.estado}
                                                            inputProps={{
                                                                maxLength: 50
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={6}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Cidade"
                                                            name="cidade"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            type="text"
                                                            required
                                                            value={formik.values?.cidade}
                                                            inputProps={{
                                                                maxLength: 50
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={6}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Bairro"
                                                            name="bairro"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            type="text"
                                                            required
                                                            value={formik.values?.bairro}
                                                            inputProps={{
                                                                maxLength: 50
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={6}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Logradouro"
                                                            name="logradouro"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            required
                                                            type='text'
                                                            value={formik.values?.logradouro}
                                                            inputProps={{
                                                                maxLength: 255
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        xs={12}
                                                        md={6}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Complemento"
                                                            name="complemento"
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            type="text"
                                                            value={formik.values?.complemento}
                                                            inputProps={{
                                                                maxLength: 255
                                                            }}
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
    );
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;