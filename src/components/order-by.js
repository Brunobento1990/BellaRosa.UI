import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { themeCores } from 'src/theme/colors';

export function OrderBy({title, options, handleClickParam}){

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [titleState, setTitleState] = React.useState(title)

  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (value) => {
    setTitleState(options.filter(x => x.index == value)[0].title)
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
        sx={{
          color:themeCores.rosa,
          border:`solid 1px ${themeCores.rosa}`,
          minWidth:'200px',
          display:'flex',
          justifyContent:'space-between'
        }}
      >
        {titleState}
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
        {options &&
          options.map((opt, index) => (
            <MenuItem 
              onClick={(value) => {
                handleClose(value.target.value)
                if(handleClickParam){
                  handleClickParam(value.target.value)
                }
              }}
              key={index}
              value={opt.index}
              sx={{
                  display:'flex',
                  gap:'10px'
                }}
            >
              {opt.icon}
              {opt.title}
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}