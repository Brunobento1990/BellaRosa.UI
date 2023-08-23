import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let loaderHandler = (isOpen) => { };

function CartModal() {

  const [open, setOpen] = useState(false);

  loaderHandler = (isOpen) => {
    console.log(isOpen)
    setOpen(isOpen);
  };
  console.log("teste : ", open)
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
        <DialogTitle>Adicione a quantidade de produtos</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
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
      show: () => loaderHandler(true)
    };
  }