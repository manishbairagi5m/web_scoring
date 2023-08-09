import React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { scoringObj } from "../ApiFunctions/scoringObj";

const MatchesList = () => {
  const navigate = useNavigate()

  const handleNewMatch = () => {
    localStorage.setItem("matches_obj",scoringObj)
    navigate('/live')
  }
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} md={6} sm={12} xs={12}>
        No Matches Exist
      </Grid>
      <Grid item lg={12} md={6} sm={12} xs={12}>
        <Button variant="contained" onClick={() => handleNewMatch()}>Add New Match</Button>
      </Grid>
    </Grid>
  );
};

export default MatchesList;
