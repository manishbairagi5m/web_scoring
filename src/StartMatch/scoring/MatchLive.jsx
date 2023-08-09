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
import ExtraRun from "./ScoreDialog/ExtraRun";
import NewBowler from "./ScoreDialog/NewBowler";
import Out from "./ScoreDialog/Out";
import EndMatch from "./ScoreDialog/EndMatch";
import ChangeInning from "./ScoreDialog/ChangeInning";
import { getMatchDetailData } from "../../ApiFunctions/scoring";


const MatchLive = () => {
  const [loader,setLoader] = useState(false)
  const [extraType,setExtraType] = useState('')
  const [runningMatchData,setRunningMatchData] = useState(localStorage.getItem("matches_obj"))
  const [inningWiseData,setInningWiseData] = useState([])
  const [currentInning,setCurrentInning] = useState({})
  const [currentInningOvers,setCurrentInningOvers] = useState({})
  const [openModal,setOpenModal] = useState({extra:false,out:false,bowler:false,inning:false,end_match:false})
  

const handleCloseModal = (modalname) => {
  setOpenModal({...openModal,[modalname]:false})
  setExtraType("")
}
const handleOpenModal = (modalname,extratype) => {
  setOpenModal({...openModal,[modalname]:true})
  setExtraType(extratype)
}

const getCurrentInning = () => {
  if(inningWiseData && inningWiseData.length > 0){
    if(inningWiseData[1].overs.length > 0){
      setCurrentInning(inningWiseData[1])
    }else{
      setCurrentInning(inningWiseData[1])
    }
  }
  if(runningMatchData && runningMatchData.innings[1].overs.length > 0){
    setCurrentInningOvers(runningMatchData.innings[1])
  }else{
    setCurrentInningOvers(runningMatchData.innings[0])
  }
}
const getMatchDetailedData = () => {
  setInningWiseData(getMatchDetailData())
  getCurrentInning()
}

useEffect(()=>{
  getMatchDetailedData()
},[runningMatchData])

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
              {runningMatchData
              ? runningMatchData.innings[1].overs.length > 0
              ? `${runningMatchData.innings[1].team} 2nd Inning`
              : `${runningMatchData.innings[0].team} 1nd Inning`
              : "error"}
            </div>
            CRR
          </div>
          <div
            className="d-flex justify-content-between fs-5 mt-2"
            // style={fontStyle}
          >
            <div >{currentInning?.run_scored} - {currentInning?.wicket_lost} ({currentInning?.wicket_lost} Ov)</div>
            <div >{currentInning?.run_rate}</div>
          </div>
        </div>
      </Grid>

      {/* over box  */}
      <Grid item lg={7} md={6} sm={12} xs={12} >
        <div className="my-card p-3 pb-2 overflow-auto">
          {currentInningOvers && currentInningOvers.length > 0
          && currentInningOvers?.overs.map((item)=> {
            return (
              <div className="d-flex align-items-center">
              <span className="me-2">This Over</span>
              <div className="text-center ms-2 h-100">
              <div 
                className="rounded-circle p-1 d-flex justify-content-center align-items-center opacity-0"
              >
                {item?.wickets ? "W" : item?.extras?.run ? item.extras.run : item.runs}
              </div>
              <div className="opacity-1">{item?.extra?.type && item.extra.type || 0}
              </div>
            </div>
            </div>
            )
          })}
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
              <TableCell className="ps-3 fw-bold">{currentInningOvers?.striker && currentInningOvers.striker || "none"}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.striker]?.run_scored || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.striker]?.ball_faced || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.striker]?.fours || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.striker]?.sixes || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.striker]?.strike_rate || 0}</TableCell>
            </TableRow>
            <TableRow >
            <TableCell className="ps-3 fw-bold">{currentInningOvers?.non_striker && currentInningOvers.non_striker || "none"}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.non_striker]?.run_scored || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.non_striker]?.ball_faced || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.non_striker]?.fours || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.non_striker]?.sixes || 0}</TableCell>
              <TableCell className="ps-3 fw-bold">{currentInning?.batsman && currentInning?.batsman[currentInningOvers?.non_striker]?.strike_rate || 0}</TableCell>
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
              <TableCell className="ps-3 fw-bold">{currentInningOvers?.bowler && currentInningOvers.bowler || 'none'}</TableCell>
            <TableCell className="ps-3 fw-bold">{currentInning?.bowler && currentInning.bowler[currentInningOvers?.bowler]?.over_bowled || 0}</TableCell>
            <TableCell className="ps-3 fw-bold">{0}</TableCell>
            <TableCell className="ps-3 fw-bold">{currentInning?.bowler && currentInning.bowler[currentInningOvers?.bowler]?.run_conceeded || 0}</TableCell>
            <TableCell className="ps-3 fw-bold">{currentInning?.bowler && currentInning.bowler[currentInningOvers?.bowler]?.wicket || 0}</TableCell>
            <TableCell className="ps-3 fw-bold">{currentInning?.bowler && currentInning.bowler[currentInningOvers?.bowler]?.economy || 0}</TableCell>
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
