import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ShopProductCard from 'src/components/car-product/index';

export function TodosProdutos({ productsParam }) {
    const products = productsParam;

    return (
        <>
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

TodosProdutos.propTypes = {
    product: PropTypes.object.isRequired
};