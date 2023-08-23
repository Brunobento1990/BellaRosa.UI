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
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                    }}
                >
                    <Avatar
                        src={`data:image/jpeg;base64,${product?.foto}`}
                        variant="square"
                        sx={{
                            width:'200px',
                            height:'200px',
                            borderRadius:'10px'
                        }}
                    />
                </Box>
                <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                >
                    {product?.descricao}
                </Typography>
                <Typography
                    align="center"
                    variant="body1"
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
                    align="center"
                    variant="body1"
                >
                    {product?.cor && <>{`Cor : ${product.cor}`}</>}
                </Typography>
                <Typography
                    align="center"
                    variant="body1"
                >
                    {product?.tamanho && <>{`Tamanho : ${product.tamanho}`}</>}
                </Typography>
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
                    onClick={() => cartModal.show()}
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