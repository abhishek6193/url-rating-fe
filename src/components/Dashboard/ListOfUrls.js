import React from "react";
import axios from "axios";

import {
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ListOfComments from "./ListOfComments";
import AddComment from "./AddComment";

function ListOfUrls({
  urls,
  userId,
  fetchUrls,
  fetchComments,
  handleOpenConfirmDialog,
  comments,
}) {
  const handleRatingChange = async (urlId, newRating) => {
    try {
      await axios.post(`http://localhost:8001/rating/add`, {
        url_id: urlId,
        user_id: userId,
        rating: newRating,
      });
      fetchUrls();
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  return (
    <Box mt={4}>
      {urls.map((url) => (
        <Card key={url._id} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="h2">
                {url.url}
              </Typography>
              {url.user_id === userId && (
                <IconButton onClick={() => handleOpenConfirmDialog(url._id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
            <Typography variant="body2" color="textSecondary">
              {url.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ fontWeight: "bold" }}>Added by: </span>
              {url.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ fontWeight: "bold" }}>Average Rating: </span>
              {url.averageRating}
            </Typography>
            <Rating
              name={`rating-${url._id}`}
              value={parseFloat(url.averageRating)}
              precision={0.5}
              onChange={(event, newValue) =>
                handleRatingChange(url._id, newValue)
              }
            />
            <Typography variant="body2" color="textSecondary">
              <span style={{ fontWeight: "bold" }}>Total Ratings: </span>{" "}
              {url.totalRatings}
            </Typography>
            {url.userRating > 0 && (
              <Typography variant="body2" color="textSecondary">
                <span style={{ fontWeight: "bold" }}>You rated: </span>{" "}
                {url.userRating}
              </Typography>
            )}
            <ListOfComments
              comments={comments}
              userId={userId}
              url={url}
              fetchComments={fetchComments}
            />
            <AddComment
              userId={userId}
              fetchComments={fetchComments}
              url={url}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ListOfUrls;
