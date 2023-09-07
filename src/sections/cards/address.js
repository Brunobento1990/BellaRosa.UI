import { Text } from 'src/components/Text';
import { Box, Typography, Paper, useMediaQuery, Divider, Button } from '@mui/material'
import { themeCores } from 'src/theme/colors';

export function AddressCart({ address }){

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    
    return(
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
                            text={`CEP : ${address?.cep ?? ""}`}
                        />
                        <Text
                            text={`Estado : ${address?.estado ?? ""}`}
                        />
                        <Text
                            text={`Cidade : ${address?.cidade ?? ""}`}
                        />
                        <Text
                            text={`Bairro : ${address?.bairro ?? ""}`}
                        />
                        <Text
                            text={`Rua : ${address?.logradouro ?? ""}`}
                        />
                        {address?.complemento &&
                            <Text
                                text={`Complemento : ${address?.complemento ?? ""}`}
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
    )
}