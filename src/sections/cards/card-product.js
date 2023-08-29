import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ShopProductCard from 'src/components/car-product/index';

export const CardProduct = ({ productsParam }) => {

    console.log(productsParam)
    const products = productsParam;

    return (
        <Grid container spacing={3}>
            {products?.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={3}>
                    <ShopProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}

CardProduct.propTypes = {
    product: PropTypes.object.isRequired
};