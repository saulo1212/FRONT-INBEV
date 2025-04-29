import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

export default function Modal({
  open,
  handleClose,
  save,
  children,
  title,
  loading,
  showSaveButton = true,
}) {
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title"> {title || 'Novo Cadastro'} </DialogTitle>
      <DialogContent sx={{ paddingTop: '5px !important' }}>{children}</DialogContent>
      <DialogActions>
        {showSaveButton && (
          <Button onClick={save} variant="contained" disabled={loading || false} color="primary">
            {' '}
            {loading ? <CircularProgress color="secondary" /> : 'Salvar'}
          </Button>
        )}
        <Button variant="contained" onClick={handleClose} color="secondary">
          X
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  save: PropTypes.func,
  title: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
  handleClose: PropTypes.func,
  showSaveButton: PropTypes.bool,
};
