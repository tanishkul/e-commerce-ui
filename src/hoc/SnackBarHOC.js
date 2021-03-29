/* eslint-disable quotes */
import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

export const withSnackbar = WrappedComponent => (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('I\'m a custom snackbar');
  const [duration, setDuration] = useState(2000);
  const [severity, setSeverity] = useState(
    'success'
  ); /** error | warning | info */

  const showMessage = (msg, svr = 'success', drt = 2000) => {
    setMessage(msg);
    setSeverity(svr);
    setDuration(drt);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <WrappedComponent {...props} snackbarShowMessage={showMessage} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        autoHideDuration={duration}
        onClose={handleClose}
        open={open}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
