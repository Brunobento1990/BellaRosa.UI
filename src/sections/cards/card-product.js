import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { CardProductDesktop } from 'src/components/card-product-desktop';
import { CardProductMobile } from 'src/components/card-product-mobile';
import { Grid } from '@mui/material';

export const CardProduct = ({ productsParam }) => {

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const products = productsParam;

    return (
        <>
            {lgUp && products ?

                <Grid
                    container
                    spacing={1}
                >
                    {products?.map((product, index) => (
                        <Grid
                            xs={12}
                            lg={6}
                            key={index}
                            marginBottom={5}
                        >
                            <CardProductDesktop
                                key={index}
                                product={product}
                            />
                        </Grid>
                    ))

                    }
                </Grid>
                :
                products?.map((product, index) => (
                    <CardProductMobile
                        key={index}
                        product={product}
                    />
                ))
            }
        </>
    )
}

CardProduct.propTypes = {
    product: PropTypes.object.isRequired
};