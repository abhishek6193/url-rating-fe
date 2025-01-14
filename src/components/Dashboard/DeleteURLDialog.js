import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DeleteUrlDialog({
  openConfirmDialog,
  handleCloseConfirmDialog,
  handleConfirmDeleteUrl,
}) {
  return (
    <Dialog
      open={openConfirmDialog}
      onClose={handleCloseConfirmDialog}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          Are you sure you want to delete this URL? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirmDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDeleteUrl} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUrlDialog;
