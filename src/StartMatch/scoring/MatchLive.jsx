import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Slide,
} from "@mui/material";
// import {  india } from "Assets";
// import { useDispatch, useSelector } from "react-redux";
// import { runs, overs, innings } from "../../../../../redux/reducers/scoreSlice";
// import { striker,non_striker,bowler } from "../../../../../redux/reducers/matchSlice";
// import { updateMatch, wicket, updateRun, addNextBatsman, addNextBowler,undoData  } from "services/admin/scoring";
import ExtraRun from "./ScoreDialog/ExtraRun";
// import NewbatsMan from "./ScoreDialog/NewBatsMan";
import NewBowler from "./ScoreDialog/NewBowler";
import Out from "./ScoreDialog/Out";
import EndMatch from "./ScoreDialog/EndMatch";
import ChangeInning from "./ScoreDialog/ChangeInning";
// import io from "socket.io-client";
import { scoreFunctions } from "./scoreFunctions";

const wideNoBallRun = 1

const ENDPOINT = process.env.REACT_APP_SOCKET_URL;



const MatchLive = () => {
  const [loader,setLoader] = useState(false)
  const [extraType,setExtraType] = useState('')
  const [openModal,setOpenModal] = useState({extra:false,out:false,bowler:false,inning:false,end_match:false})

const handleCloseModal = (modalname) => {
  setOpenModal({...openModal,[modalname]:false})
  setExtraType("")
}
const handleOpenModal = (modalname,extratype) => {
  setOpenModal({...openModal,[modalname]:true})
  setExtraType(extratype)
}

  return (
    <Grid container spacing={3}>
      <Grid item lg={5} md={6} sm={12} xs={12}>
        <div className="my-card p-3">
          <div className="d-flex justify-content-between">
            <div>
              {/* <img
                src={imagePath && (imagePath+battingTeamLogo) || india}
                className="me-2 rounded-circle"
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "cover",
                }}
              /> */}
              India 1st Inning
            </div>
            CRR
          </div>
          <div
            className="d-flex justify-content-between fs-5 mt-2"
            // style={fontStyle}
          >
            <div >0 - 0 (0 Ov)</div>
            <div >0</div>
          </div>
        </div>
      </Grid>

      {/* over box  */}
      <Grid item lg={7} md={6} sm={12} xs={12} >
        <div className="my-card p-3 pb-2 overflow-auto">
          <div className="d-flex align-items-center">
            <span className="me-2">This Over</span>
            <div className="text-center ms-2 h-100">
            <div 
            // style={{ ...fontStyle1 }}
              className="rounded-circle p-1 d-flex justify-content-center align-items-center opacity-0"
            >0
            </div>
            <div className="opacity-0">0
            </div>
          </div>
          </div>
        </div>
      </Grid>

      {/* batsman table */}
      <Grid item lg={12} md={6} sm={12} xs={12}>
        <Table className="mui-table my-card" width="100%" overflow="auto">
          <TableHead
            className="table-head"
            sx={{ borderBottom: "2px solid #DADADA" }}
          >
            <TableRow>
              <TableCell className="text-primary fw-bold w-50 ps-3">
                Batsman
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                Run
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                Ball
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                4s
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                6s
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                SR
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell className="ps-3 fw-bold">Rohit Sharma</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
            </TableRow>
            <TableRow >
            <TableCell className="ps-3 fw-bold">Shubhman Gill</TableCell>
            <TableCell className="ps-3 fw-bold">0</TableCell>
            <TableCell className="ps-3 fw-bold">0</TableCell>
            <TableCell className="ps-3 fw-bold">0</TableCell>
            <TableCell className="ps-3 fw-bold">0</TableCell>
            <TableCell className="ps-3 fw-bold">0</TableCell>
            </TableRow>
          
          </TableBody>
        </Table>
      </Grid>

        {/* bowler table  */}
      <Grid item lg={12} md={6} sm={12} xs={12}>
        <Table className="mui-table my-card" width="100%" overflow="auto">
          <TableHead
            className="table-head"
            sx={{ borderBottom: "2px solid #DADADA" }}
          >
            <TableRow>
              <TableCell className="text-primary fw-bold w-50 ps-3">
                <div className="d-flex align-items-center">Bowler
                <span style={{ backgroundColor: "#D9D9D978",color: "rgba(52, 49, 76, 1)",padding:"2px 10px"}} 
                className="ms-4 cursor-pointer rounded" 
                >Change</span></div>
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                Over
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                Maiden
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                Run
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                Wicket
              </TableCell>
              <TableCell align="center" className="text-primary fw-bold">
                Economy
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="ps-3 fw-bold">Mitchel Starc</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
              <TableCell className="ps-3 fw-bold">0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>


      {/* <Grid item lg={12} md={6} sm={12} xs={12} >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            cursor:'pointer'
          }}
          style={{opacity:`${loader ? "0.5" : "1"}`}}
        >
          {buttonArrayObj.map((item) => {
            return (
            <Box sx={{flexGrow: 1}}
            bgcolor={item.bgcolor}
            className={`tableButtonHover border ${item.class}`}
             // style: {opacity:`${undoEnable && checkUndoPossible() ? "1" : "0.5"}`}
            style={item?.style || {minWidth:'110px',maxWidth:'150px'}}
            onClick={() => item.click}
            >
              <div style={{width:'105px'}}>
              {item.name} <br /> {item.name1}
              </div>
            </Box>
            )})}

        </Box>
      </Grid> */}


      <Grid item lg={12} md={6} sm={12} xs={12}>
        <Table className="mui-table" width="100%" overflow="auto" style={{opacity:`${loader ? "0.5" : "1"}`}} >
          <TableBody style={{ cursor: "pointer" }}>
            <TableRow style={{ backgroundColor: "#D9D9D978" }}>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold"
                onClick={() => {!loader && handleOpenModal('extra','WD')}}
              >
                WD
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold"
                onClick={() => {!loader && handleOpenModal('extra','NB')}}
              >
                NB
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold"
                onClick={() => {!loader && handleOpenModal('extra','BYE')}}
              >
                BYE
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold"
                onClick={() => {!loader && handleOpenModal('extra','LB')}}
              >
                LB
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold text-danger"
                // onClick={() => {checkIsInningCompleted(runningMatchData,true) || handleOutOpen()}}
              >
                OUT
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold text-success"
                // style={{opacity:`${undoEnable && checkUndoPossible() ? "1" : "0.5"}`}}
                // onClick={() => {!loader && undoEnable && checkUndoPossible() && undo()}}
              >
                UNDO
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold"
                // onClick={() => {!loader && swapBatsman()}}
              >
                SWAP <br /> BATSMAN
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold"
                // style={{opacity:`${scoreFunctions.checkInningsNumber(runningMatchData,batting) ? "0.5" : "1"}`}}
                // onClick={() => {
                  // checkIsInningCompleted(runningMatchData,true)  
                //   if(!scoreFunctions.checkInningsNumber(runningMatchData,batting)){setOpenChangeInningDialog(true)}
                // }}
              >
                CHANGE <br /> INNING
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                align="center"
                className="tableButtonHover p-4 fs-5 border fw-bold"
                // onClick={() => !loader && handleAddRun(0)}
              >
                0
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 fs-5 border fw-bold"
                // onClick={() => !loader && handleAddRun(1)}
              >
                1
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 fs-5 border fw-bold"
                // onClick={() => !loader && handleAddRun(2)}
              >
                2
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 fs-5 border fw-bold"
                // onClick={() => !loader && handleAddRun(3)}
              >
                3
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 fs-5 border fw-bold"
                // onClick={() => !loader && handleAddRun(4)}
              >
                4
              </TableCell>
                 <TableCell
                align="center"
                className="tableButtonHover p-4 fs-5 border fw-bold"
                // onClick={() => !loader && handleClickOpen('OVERTHROW')}
              >
                5,7
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 fs-5 border fw-bold"
                // onClick={() => !loader && handleAddRun(6)}
              >
                6
              </TableCell>
              <TableCell
                align="center"
                className="tableButtonHover p-4 border fw-bold"
                // style={{opacity:`${scoreFunctions.checkInningsNumber(runningMatchData,batting) ? "1" : "0.5"}`,backgroundColor:"#D9D9D978"}}
                // onClick={() => {
                  // checkIsInningCompleted(runningMatchData,true)
                //   if(scoreFunctions.checkInningsNumber(runningMatchData,batting)){setOpenEndMatchDialog(true)}
                // }}
              >
                END <br /> MATCH
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* all modals  */}
        <ExtraRun
        openModal={openModal}
        handleCloseModal={handleCloseModal}
							/>
        <EndMatch
        
							/>

        <ChangeInning
							/>
					<Out
          />        
					<NewBowler
					/>
          {/* all modals  */}
      </Grid>

    </Grid>
  );
};

export default MatchLive;
