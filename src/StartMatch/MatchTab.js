import React, { useState, useEffect } from "react";
import TodayMatch from "./TodayMatch";
import MatchDetail from "./MatchDetail";
import PlayingXI from "./PlayingXI";
import MatchToss from "./MatchToss";
import MatchOpener from "./MatchOpener";
import MatchScoring from "./MatchScoring";
import { getTeamList } from "services/admin/Tournamet";
import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import * as scoreHelpler from "./scoring/scoreHelper";
import {
  createMatch,
  getMatchData,
  changeInnings,
} from "services/admin/scoring";
import {
  match_id,
  toss,
  match_settings,
  striker,
  non_striker,
  bowler,
} from "../../../../redux/reducers/matchSlice";
import {
  runs,
  overs,
  innings,
  resetScore,
} from "../../../../redux/reducers/scoreSlice";

const MatchTab = ({ state }) => {
  const [matchValue, setMatchValue] = useState("today_match");

  return (
    <>
     
        <MatchScoring
          setMatchValue={setMatchValue}
        />
   
    </>
  );
};

export default MatchTab;
