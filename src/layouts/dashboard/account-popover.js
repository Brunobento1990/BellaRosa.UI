import { useCallback, useEffect , useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuthApp } from '../../guards/auth-app'
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const authApp = useAuthApp();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(authApp.getSessionInfo())
  },[])

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      authApp.clearLocalStorage();
      router.push('/auth/login');
    },
    [onClose, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Conta
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.nome}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sair
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
