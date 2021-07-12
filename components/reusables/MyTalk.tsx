import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";

type myTalkProps = {
  content: string;
  update: number;
  isRead: boolean;
};

const MyTalk: React.FC<myTalkProps> = ({ content, update, isRead }) => {
  return (
    <Box paddingY="4px">
      <Paper elevation={4}>
        <Box
          width="100%"
          paddingX="20px"
          paddingY="12px"
          bgcolor="primary.light"
          borderRadius="4px"
        >
          <Typography
            variant="body1"
            style={{ color: "white", whiteSpace: "pre" }}
          >
            {content}
          </Typography>
        </Box>
      </Paper>
      <Typography variant="body2" color="textSecondary">
        {format(new Date(update), "yyyy年MM月dd日")}
      </Typography>
    </Box>
  );
};

export default MyTalk;
