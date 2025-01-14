import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { Container, Typography, Box, Button } from "@mui/material";

import ListOfUrls from "./ListOfUrls";
import DeleteUrlDialog from "./DeleteURLDialog";
import AddUrlDialog from "./AddUrlDialog";

function Dashboard({ userId, username }) {
  const [urls, setUrls] = useState([]);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState({});
  const [urlToDelete, setUrlToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const fetchUrls = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/url?user_id=${userId}`
      );
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  }, [userId]);

  const fetchComments = useCallback(async (urlId) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/comment/${urlId}`
      );
      setComments((prev) => ({ ...prev, [urlId]: response.data }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  useEffect(() => {
    if (urls.length > 0) {
      urls.forEach((url) => {
        if (!comments[url._id]) {
          fetchComments(url._id);
        }
      });
    }
  }, [urls, comments, fetchComments]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("storage"));
  };

  const handleOpenConfirmDialog = useCallback((urlId) => {
    setUrlToDelete(urlId);
    setOpenConfirmDialog(true);
  }, []);

  const handleCloseConfirmDialog = () => {
    setUrlToDelete(null);
    setOpenConfirmDialog(false);
  };

  const handleConfirmDeleteUrl = async () => {
    if (urlToDelete) {
      try {
        await axios.delete(`http://localhost:8001/url/${urlToDelete}`, {
          data: { user_id: userId },
        });
        fetchUrls();
        handleCloseConfirmDialog();
      } catch (error) {
        console.error("Error deleting URL:", error);
      }
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Welcome, {username}!
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New URL
      </Button>
      <ListOfUrls
        urls={urls}
        userId={userId}
        fetchUrls={fetchUrls}
        fetchComments={fetchComments}
        comments={comments}
        handleOpenConfirmDialog={handleOpenConfirmDialog}
      />
      <AddUrlDialog
        fetchUrls={fetchUrls}
        open={open}
        setOpen={setOpen}
        userId={userId}
      />
      <DeleteUrlDialog
        openConfirmDialog={openConfirmDialog}
        handleCloseConfirmDialog={handleCloseConfirmDialog}
        handleConfirmDeleteUrl={handleConfirmDeleteUrl}
      />
    </Container>
  );
}

export default Dashboard;
