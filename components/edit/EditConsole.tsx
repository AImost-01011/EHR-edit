import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";
import PatientConsole from "./editConsole/PatientConsole";
import PatientTab from "./editConsole/PatientTab";

const EditConsole: React.FC = () => {
  return (
    <Grid xs={7} item>
      <Box position="relative">
        <PatientTab />
        <PatientConsole />
      </Box>
    </Grid>
  );
};

export default EditConsole;
