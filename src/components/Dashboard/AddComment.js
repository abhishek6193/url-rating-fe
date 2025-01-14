import React, { useState } from "react";
import axios from "axios";

import { Box, Button, TextField, IconButton, Collapse } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

function AddComment({ userId, fetchComments, url }) {
  const [expanded, setExpanded] = useState({});
  const [newComment, setNewComment] = useState("");
  const handleExpandClick = (urlId) => {
    setExpanded((prev) => ({ ...prev, [urlId]: !prev[urlId] }));
  };

  const handleAddComment = async (urlId) => {
    try {
      await axios.post(`http://localhost:8001/comment/add`, {
        url_id: urlId,
        user_id: userId,
        comment: newComment,
      });
      fetchComments(urlId);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <>
      <IconButton
        onClick={() => handleExpandClick(url._id)}
        aria-expanded={expanded[url._id]}
        aria-label="show more"
        style={{top: "10px"}}
      >
        <CommentIcon />
      </IconButton>
      <Collapse in={expanded[url._id]} timeout="auto" unmountOnExit>
        <Box mt={2}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddComment(url._id)}
          >
            Add Comment
          </Button>
        </Box>
      </Collapse>
    </>
  );
}

export default AddComment;
