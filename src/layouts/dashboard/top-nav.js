import PropTypes from 'prop-types';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Typography,
  Paper,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { themeCores } from 'src/theme/colors';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export let updateCart = (quantidade) => { }

export const TopNav = (props) => {

  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const [quantidadeCart, setQuantidadeCart] = useState(0);
  const route = useRouter();

  updateCart = (quantidade) => {
    if (quantidade && quantidade > 0) {
      setQuantidadeCart(quantidade)
    }
  }

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
              <IconButton 
                onClick={onNavOpen}
                component={Paper}
              >
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <Typography
              variant="h5"
              sx={{
                color: themeCores.rosa,
              }}
            >
              Bella Rosa
            </Typography>
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
