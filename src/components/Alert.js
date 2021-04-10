import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';

import { clearSnackbar } from '../view/alert/actions';

const SuccessSnackbar = () => {
  const dispatch = useDispatch();

  const { successSnackbarMessage, successSnackbarOpen } = useSelector(
    state => state.ui
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Icon>close</Icon>
        </IconButton>
      ]}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      aria-describedby="client-snackbar"
      autoHideDuration={4000}
      message={(
        <span id="client-snackbar">
          <Icon>check_circle</Icon>
          {successSnackbarMessage}
        </span>
      )}
      onClose={handleClose}
      open={successSnackbarOpen}
    />
  );
}

export default SuccessSnackbar;
