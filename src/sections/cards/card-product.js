import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, Button, Typography } from '@mui/material';
import { themeCores } from 'src/theme/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCartModal } from 'src/components/cart-modal';

export const CardProduct = (props) => {

    const cartModal = useCartModal();
    const { product } = props;
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%'
            }}
        >
            <CardContent>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='row'
                    height='100px'
                    gap={5}
                >
                    <Box
                        width='40%'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar
                            src={`data:image/jpeg;base64,${product?.foto}`}
                            variant="square"
                            sx={{
                                maxWidth:'100px',
                                maxHeight:'100px',
                                width:'200px',
                                height:'200px',
                                borderRadius:'10px'
                            }}
                        />
                    </Box>
                    <Box
                        width='60%'
                        display='flex'
                        flexDirection='column'
                        justifyContent='start'
                    >
                        <Typography
                            align="start"
                            gutterBottom
                            variant="h5"
                            fontSize={20}
                        >
                            {product?.descricao}
                        </Typography>
                        <Typography
                            align="start"
                            variant="body1"
                            fontSize={14}
                        >
                            {product.precoPromocao ?
                                <div>
                                    <p>
                                        De {`R$ ${product?.preco.toString().replace(".",",")}`} por {`R$ ${product?.precoPromocao.toString().replace(".",",")}`}
                                    </p>
                                </div> :
                                <>{`R$ ${product?.preco.toString().replace(".",",")}`}</>
                            }
                        </Typography>
                        <Typography
                            align="start"
                            variant="body1"
                            fontSize={14}
                        >
                            {product?.cor && <>{`Cor : ${product.cor}`}</>}
                        </Typography>
                        <Typography
                            align="start"
                            variant="body1"
                            fontSize={14}
                        >
                            {product?.tamanho && <>{`Tamanho : ${product.tamanho}`}</>}
                        </Typography>

                    </Box>
                </Box>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ p: 2 }}
            >
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    style={{ backgroundColor: themeCores.rosa }}
                    sx={{
                        display:'flex',
                        gap:'30px'
                    }}
                    onClick={() => cartModal.show(product)}
                >
                    Adicionar ao carrinho
                    <AddShoppingCartIcon/>
                </Button>
            </Stack>
        </Card>
    )
}

CardProduct.propTypes = {
    product: PropTypes.object.isRequired
};