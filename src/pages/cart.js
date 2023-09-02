import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Typography, Paper, useMediaQuery, Divider, Button } from '@mui/material'
import { Text } from 'src/components/Text';
import { useEffect, useState } from 'react';
import { useContext } from 'src/hooks/use-context';
import { useApi } from 'src/hooks/use-api';
import { themeCores } from 'src/theme/colors';

const Page = () => {

    const context = useContext();
    const api = useApi();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const [carrinho, setCarrinho] = useState({});
    const [endereco, setEndereco] = useState({});

    const init = async () => {
        const carrinhoStore = context.getCart();
        const result = await api.post("get-carrinho", carrinhoStore);
        const enderecoApi = await api.get("retorna-endereco");
        console.log(result)
        setEndereco(enderecoApi)
        setCarrinho(result)
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                margin: 1
            }}
        >
            <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection={lgUp ? "row" : "column"}
                gap={2}
            >
                <Box
                    component={Paper}
                    width={lgUp ? "70%" : "100%"}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                        margin={2}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: themeCores.rosa,
                            }}
                        >
                            Seu endereço
                        </Typography>
                        <Text
                            text={`CEP : ${endereco?.cep}`}
                        />
                        <Text
                            text={`Estado : ${endereco?.estado}`}
                        />
                        <Text
                            text={`Cidade : ${endereco?.cidade}`}
                        />
                        <Text
                            text={`Bairro : ${endereco?.bairro}`}
                        />
                        <Text
                            text={`Rua : ${endereco?.logradouro}`}
                        />
                        {endereco?.complemento &&
                            <Text
                                text={`Complemento : ${endereco?.complemento}`}
                            />
                        }
                        <Divider />
                        <Button
                            sx={{ color: themeCores.rosa }}
                        >
                            Novo endereço
                        </Button>
                    </Box>
                </Box>
                <Box
                    component={Paper}
                    width={lgUp ? "30%" : "100%"}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                        margin={2}
                        marginTop={0}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: themeCores.rosa,
                            }}
                        >
                            Resumo
                        </Typography>
                        <Text
                            text={`Total : ${carrinho?.total}`}
                        />
                    </Box>
                </Box>
            </Box>
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