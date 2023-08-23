import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenu } from './styles-menu'
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';

export function OrderBy(){

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Dashboard
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
    
    //const { propsOrder } = props;

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // return (
    //     <div>
    //       <Button
    //         id="demo-customized-button"
    //         aria-controls={open ? 'demo-customized-menu' : undefined}
    //         aria-haspopup="true"
    //         aria-expanded={open ? 'true' : undefined}
    //         variant="contained"
    //         disableElevation
    //         onClick={handleClick}
    //         endIcon={<KeyboardArrowDownIcon />}
    //       >
    //         Ordernar produtos
    //       </Button>
    //       <StyledMenu
    //         id="demo-customized-menu"
    //         MenuListProps={{
    //           'aria-labelledby': 'demo-customized-button',
    //         }}
    //         anchorEl={anchorEl}
    //         open={open}
    //         onClose={handleClose}
    //         onClick={(value) => console.log(value.target.value)}
    //       >
    //         <MenuItem 
    //             onClick={handleClose} 
    //             disableRipple
    //             value={0}
    //         >
    //           <EditIcon />
    //           Edit
    //         </MenuItem>
    //         <MenuItem 
    //             onClick={handleClose} disableRipple
    //             value={1}
    //         >
    //           <FileCopyIcon />
    //           Duplicate
    //         </MenuItem>
    //         <MenuItem 
    //             onClick={handleClose} 
    //             disableRipple
    //             value={2}
    //         >
    //           <ArchiveIcon />
    //           Archive
    //         </MenuItem>
    //         <MenuItem onClick={handleClose} disableRipple>
    //           <MoreHorizIcon />
    //           More
    //         </MenuItem>
    //       </StyledMenu>
    //     </div>
    //   );
}