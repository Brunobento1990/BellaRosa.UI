import PropTypes from 'prop-types';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useAuthApp } from 'src/guards/auth-app';
import { useEffect, useState } from 'react';
import { useContext } from 'src/hooks/use-context';
import { useRouter } from 'next/router';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export let updateCart = (quantidade) => {}

export const TopNav = (props) => {

  const authApp = useAuthApp();
  const [user, setUser] = useState({});
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const [imagemModel, setImagemModel] = useState(undefined);
  const [quantidadeCart, setQuantidadeCart] = useState(0);
  const context = useContext();
  const route = useRouter();

  updateCart = (quantidade) => {
    if(quantidade && quantidade > 0){
      setQuantidadeCart(quantidade)
    }
  }

  useEffect(() => {
    var userSession = authApp.getSessionInfo(); 
    if (userSession?.tipoImagem && userSession?.avatar) {
      setImagemModel(`data:image/${userSession.tipoImagem};base64,${userSession.avatar}`)
    }

    setQuantidadeCart(context.getLengthCart())

    setUser()
  },[])

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Carrinho">
              <IconButton
                onClick={() => route.push("/cart")}
              >
                <Badge
                  badgeContent={quantidadeCart}
                  color="secondary"
                >
                  <SvgIcon 
                    fontSize="small"
                  >
                    <ShoppingCartIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src={imagemModel}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
