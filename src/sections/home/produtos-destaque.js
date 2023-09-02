import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import ShopProductCard from 'src/components/car-product/index';
import { themeCores } from 'src/theme/colors';

export function ProdutosDestaque({ productsParam }) {
    const products = productsParam;

    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    color: themeCores.rosa,
                }}
            >
                Produtos em destaque
            </Typography>
            <Grid container spacing={3} sx={{marginTop: '10px'}}>
                {products?.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={3}>
                        <ShopProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

ProdutosDestaque.propTypes = {
    product: PropTypes.object.isRequired
};