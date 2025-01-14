import React from "react";
import axios from "axios";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

import { Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const CommentContainer = styled(({ isUserComment, ...otherProps }) => (
  <Box {...otherProps} />
))(({ isUserComment }) => ({
  position: "relative",
  padding: "10px",
  paddingRight: "40px",
  ...(isUserComment && {
    "&:hover": {
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
      "& .delete-icon": { display: "block" },
    },
  }),
}));

const DeleteIconButton = styled(IconButton)({
  position: "absolute",
  right: "10px",
  top: "0",
  display: "none",
  "&:hover": { backgroundColor: "transparent" },
});

function ListOfComments({ comments, userId, url, fetchComments }) {
  const formatDateTime = (timestamp) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedTime = toZonedTime(new Date(timestamp), timeZone);
    return formatInTimeZone(zonedTime, timeZone, "MMM d, yyyy h:mm a");
  };

  const handleDeleteComment = async (commentId, urlId) => {
    try {
      await axios.delete(`http://localhost:8001/comment/${commentId}`, {
        data: { user_id: userId },
      });
      fetchComments(urlId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <Box mt={2}>
      {comments[url._id]?.length > 0 && (
        <Typography variant="body2" color="textSecondary">
          <span style={{ fontWeight: "bold" }}>Comments: </span>
        </Typography>
      )}
      <Box style={{ maxHeight: "100px", overflowY: "auto" }}>
        {comments[url._id] &&
          comments[url._id].map((comment) => {
            const isUserComment = comment.user_id._id === userId;
            return (
              <CommentContainer key={comment._id} isUserComment={isUserComment}>
                <Typography variant="body2" color="textSecondary">
                  {comment.comment} -
                  <span style={{ fontWeight: "bold" }}>
                    {` by ${comment.user_id.username} on
                          ${formatDateTime(comment.timestamp)}`}
                  </span>
                </Typography>

                {isUserComment && (
                  <DeleteIconButton
                    className="delete-icon"
                    onClick={() => handleDeleteComment(comment._id, url._id)}
                  >
                    <CloseIcon />
                  </DeleteIconButton>
                )}
              </CommentContainer>
            );
          })}
      </Box>
    </Box>
  );
}

export default ListOfComments;
