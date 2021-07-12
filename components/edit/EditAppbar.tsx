import React from "react";
import Link from "next/link";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const EditAppbar: React.FC = () => {
  return (
    <Box bgcolor="primary.main" width="100%" py="8px" px="16px">
      <Link href="/edit">
        <Typography variant="h5" style={{ color: "white" }}>
          EHR Edit
        </Typography>
      </Link>
    </Box>
  );
};

export default EditAppbar;
