import React from "react";
import { Grid } from "@mui/material";

const MatchSquads = () => {

  return (
    <div>
      <div
        className="d-flex justify-content-between p-2"
        style={{ backgroundColor: "#222B42", color: "#FFFFFF" }}
      >
        <div className="d-flex justify-content-between ms-2">
          <div>
            {/* <img
              style={{ width: 25, height: 25, borderRadius: "50%" }}
              src={imagePath + team1Data[0].team_logo}
              alt=""
            /> */}
          </div>
          <div className="ps-2" style={{ fontSize: 16 }}>
          {/* {team1Data[0].team_name} */}
          </div>
        </div>
        <div className="d-flex justify-content-between me-2">
          <div className="pe-2" style={{ fontSize: 16 }}>
          {/* {team2Data[0].team_name} */}
          </div>
          <div>
            {/* <img
              style={{ width: 25, height: 25, borderRadius: "50%" }}
              src={imagePath + team2Data[0].team_logo}
              alt=""
            /> */}
          </div>
        </div>
      </div>


      <Grid container >
      <Grid item lg={12} md={6} sm={6} xs={6} className="ps-3">
      <div className="d-flex justify-content-center mt-3 mb-2">Playing 11</div>
      <hr className="border border-dark" />
      </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className="ps-3">
      {/* {runningMatchData.team1.players?.map((item, index) => {
        return ( <>
          <div key={index} className="d-flex align-items-center">
                <div>
                  <img
                    style={{ width: 42, height: 42, borderRadius: "50%" }}
                    src={getPLayerImage(item.players_id,"team1")}
                    alt=""
                  />
                </div>
                <div className="ms-2">
                  <div className="mt-1 fs-6">
                    {item?.players_name}
                  </div>
                  <div className="text-secondary fs-6">
                    Batter
                  </div>
                </div>
          </div>
            <hr className="border border-dark"/> </>
        );
      })} */}
    </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className="pe-3">
      {/* {runningMatchData.team2.players?.map((item, index) => {
        return ( <>
          <div key={index} className="d-flex align-items-center justify-content-end">
                <div className="me-2 text-end">
                  <div className="mt-1 fs-6">
                    {item?.players_name}
                  </div>
                  <div className="text-secondary fs-6">
                    Batter
                  </div>
                </div>
                <div>
                  <img
                    style={{ width: 42, height: 42, borderRadius: "50%" }}
                    src={getPLayerImage(item.players_id,"team1")}
                    alt=""
                  />
                </div>
          </div>
            <hr className="border border-dark" /> </>
        );
      })} */}
    </Grid>
    <Grid item lg={12} md={6} sm={6} xs={6} className="ps-3">
      <div className="d-flex justify-content-center mt-3 mb-2">Bench</div>
      <hr className="border border-dark" />
      </Grid>
      {/* {team1Rest.length === 0 && team2Rest.length === 0 && 
    <Grid item lg={12} md={6} sm={6} xs={6} className="ps-3">
      <div className="d-flex justify-content-center mt-3 mb-2">No On Bench</div>
      </Grid>
      } */}
        <Grid item lg={6} md={6} sm={6} xs={6} className="ps-3">
      {/* {team1Rest?.map((item, index) => {
        return ( <>
          <div key={index} className="d-flex align-items-center">
                <div>
                  <img
                    style={{ width: 42, height: 42, borderRadius: "50%" }}
                    src={item?.image && item.image || logo}
                    alt=""
                  />
                </div>
                <div className="ms-2">
                  <div className="mt-1 fs-6">
                    {item?.name}
                  </div>
                  <div className="text-secondary fs-6">
                    Batter
                  </div>
                </div>
          </div>
            <hr className="border border-dark"/> </>
        );
      })} */}
    </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className="pe-3">
      {/* {team2Rest?.map((item, index) => {
        return ( <>
          <div key={index} className="d-flex align-items-center justify-content-end">
                <div className="me-2 text-end">
                  <div className="mt-1 fs-6">
                    {item?.name}
                  </div>
                  <div className="text-secondary fs-6">
                    Batter
                  </div>
                </div>
                <div>
                  <img
                    style={{ width: 42, height: 42, borderRadius: "50%" }}
                    src={item?.image && item.image || logo}
                    alt=""
                  />
                </div>
          </div>
            <hr className="border border-dark" /> </>
        );
      })} */}
    </Grid>
    </Grid>


    </div>
  );
};

export default MatchSquads;
