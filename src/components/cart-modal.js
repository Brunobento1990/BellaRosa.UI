import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { themeCores } from 'src/theme/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Avatar, Box, Card, CardContent, Divider, Stack, Button, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let loaderHandler = (isOpen, productParam) => { };

function CartModal() {

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [quantidade, setQuantidade] = useState(0);

  loaderHandler = (isOpen, productParam) => {
    setProduct(productParam)
    setOpen(isOpen);
  };
  if (!open) return null;

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={() => loaderHandler(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{product?.descricao}</DialogTitle>
        <DialogContent>
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
                      maxWidth: '100px',
                      maxHeight: '100px',
                      width: '200px',
                      height: '200px',
                      borderRadius: '10px'
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
                          De {`R$ ${product?.preco.toString().replace(".", ",")}`} por {`R$ ${product?.precoPromocao.toString().replace(".", ",")}`}
                        </p>
                      </div> :
                      <>{`R$ ${product?.preco.toString().replace(".", ",")}`}</>
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
            >
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: themeCores.rosa }}
                sx={{
                  display: 'flex',
                  gap: '30px'
                }}
                onClick={() => {
                  if(quantidade > 0){
                    setQuantidade(quantidade - 1)
                  }
                }}
              >
                <RemoveIcon/>
              </Button>
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: themeCores.rosa }}
                sx={{
                  display: 'flex',
                  gap: '30px'
                }}
              >
                {quantidade}
              </Button>
              <Button
                size="large"
                variant="contained"
                style={{ backgroundColor: themeCores.rosa }}
                sx={{
                  display: 'flex',
                  gap: '30px'
                }}
                onClick={() => setQuantidade(quantidade + 1)}
              >
                <AddCircleIcon/>
              </Button>
            </Stack>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => loaderHandler(false)}>Disagree</Button>
          <Button >Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function useCartModal() {
  return {
    Component: CartModal,
    show: (product) => loaderHandler(true, product)
  };
}