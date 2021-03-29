import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function SimpleMenu({ menuItems, ids }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="simple-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        {
          menuItems && menuItems.length && menuItems.map(({ label, onClick }) => (
            <MenuItem
              onClick={() => {
                onClick(ids);
                handleClose();
              }}
            >
              {label}
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
}
SimpleMenu.propTypes = {
  ids: PropTypes.number.isRequired,
  menuItems: PropTypes.array.isRequired,
};
