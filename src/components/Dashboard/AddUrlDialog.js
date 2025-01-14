import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function AddUrlDialog({ fetchUrls, open, setOpen, userId }) {
  const [newUrl, setNewUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddUrl = async () => {
    try {
      await axios.post("http://localhost:8001/url/add", {
        url: newUrl,
        description: newDescription,
        user_id: userId,
      });
      fetchUrls();
      handleClose();
    } catch (error) {
      console.error("Error adding URL:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewUrl("");
    setNewDescription("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New URL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the URL and a brief description.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          fullWidth
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddUrl} color="primary">
          Add URL
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUrlDialog;
