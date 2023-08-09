import React from "react";
import { Grid } from "@mui/material";

const MatchesList = () => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={6} sm={12} xs={12}>
        No Matches Exist
      </Grid>
      <Grid item lg={12} md={6} sm={12} xs={12}>
        <Button>Add New Match</Button>
      </Grid>
    </Grid>
  );
};

export default MatchesList;
