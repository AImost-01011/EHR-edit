import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { format } from "date-fns";

type yourTalkProps = {
  content: string;
  update: number;
  isRead: boolean;
};

const YourTalk: React.FC<yourTalkProps> = ({ content, update, isRead }) => {
  return (
    <Box paddingY="4px">
      <Paper elevation={4}>
        <Box
          width="100%"
          paddingX="20px"
          paddingY="12px"
          bgcolor="grey.300"
          borderRadius="4px"
        >
          <Typography
            variant="body1"
            color="initial"
            style={{ whiteSpace: "pre" }}
          >
            {content}
          </Typography>
        </Box>
      </Paper>
      <Typography variant="body2" color="textSecondary">
        {format(new Date(update), "yyyy年MM月dd日")}{" "}
      </Typography>
    </Box>
  );
};

export default YourTalk;
