import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import NavMenu from "./editNav/NavMenu";
import NavAdds from "./editNav/NavAdds";
import { RootState } from "../../redux/store";

const EditNav: React.FC = () => {
  const staffSelector = useSelector((state: RootState) => state.oneStaff);

  return (
    <Grid xs={2} item>
      <Box
        height="calc(100vh - 48px - 2rem)"
        borderRight={1}
        borderColor="grey.500"
      >
        <Box
          height="44px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="12px"
        >
          <Link href="/edit/settings">
            <Button variant="contained" color="primary" size="small">
              設定
            </Button>
          </Link>
          <Typography variant="h6">{staffSelector.staffName.name}</Typography>
        </Box>

        <Divider />

        <NavMenu />

        <NavAdds />
      </Box>
    </Grid>
  );
};

export default EditNav;
