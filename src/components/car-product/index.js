import { Card, Box, Stack, Link, Typography, Button, SvgIcon, useMediaQuery } from '@mui/material'
import Label from 'src/components/Label/index';
import * as S from './styles'
import { themeCores } from '../../theme/colors'
import { useCartModal } from 'src/components/cart-modal';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ShopProductCard({ product }) {

  const cartModal = useCartModal();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Card
      sx={{
        maxWidth: lgUp ? '100%' : '87%'
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product?.precoPromocao && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Promoção
          </Label>
        )}
        <S.StyledProductImg alt='produto' src={`data:image/jpeg;base64,${product?.foto}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {product?.descricao}
          </Typography>
        </Link>
        {product?.tamanho &&
          <Typography variant="subtitle2" noWrap>
            {`Tamanho : ${product?.tamanho}`}
          </Typography>
        }
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {product?.cor &&
            <Typography variant="subtitle2" noWrap>
              {`Cor : ${product?.cor}`}
            </Typography>
          }
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {product?.precoPromocao && `R$ ${product?.precoPromocao.toString().replace(".", ",")}`}
            </Typography>
            &nbsp;
            {`R$ ${product?.preco.toString().replace(".", ",")}`}
          </Typography>
        </Stack>
        <Button
          onClick={() => cartModal.show(product)}
          startIcon={(
            <SvgIcon fontSize="small">
              <AddShoppingCartIcon />
            </SvgIcon>
          )}
          sx={{
            color: themeCores.rosa,
            border: `solid 1px ${themeCores.rosa}`,
            display: 'flex',
            gap: '10px'
          }}
        >
          Adicionar
        </Button>
      </Stack>
    </Card>
  );
}