import  React, {useState} from 'react';
import {
    Button, TextField, Dialog, DialogActions,Checkbox,
    DialogContent, DialogContentText, DialogTitle,
    Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Grid,
    InputLabel, Select, MenuItem,  Slide,FormHelperText
} from '@mui/material';



function Out({openModal,handleCloseModal}) {
    const [outModal, setOutModal] = useState(false)
    const [outType, setOutType] = useState("BOLD")
    const [outHelping, setOutHelping] = useState("")
    const [validate, setValidate] = useState({helper:false,new_batsman:false,out_batsman:false})
    const fontStyle = { fontFamily: "Poppins-Bold" };
    let checkBoxStyle= { '& .MuiSvgIcon-root': { fontSize: 18 } ,  color: "#2B344A",
                        '&.Mui-checked': {
                              color: "#2B344A",
                            }, }

    const outArr = [
    {value: "BOLD" ,      label: "Bowled", image: 'bowled' },
    {value: "CAUGHT" ,    label: "Caught", image: 'caught' },
    {value: "CAUGHT_BEHIND" ,    label: "Caught Behind", image: 'caught_behind' },
    {value: "CAUGHT&BOWLED" ,    label: "Caught & Bowled", image: 'caught_bowled' },
    {value: "STAMPING" ,  label: "Stumped", image: 'stumped' },
    {value: "RUN_OUT" ,   label: "Runout", image: 'runout' },
    {value: "LBW" ,       label: "LBW", image: 'lbw' },
    {value: "HIT_WICKET" ,label: "Hit Wicket", image: 'hit_wicket' },
    {value: "RETIRED_HURT" ,          label: "Retired Hurt", image: 'retired_hurt' },
    {value: "RETIRED_OUT" ,          label: "Retired Out", image: 'retired_out' },
    {value: "RUN_OUT(MANKADED)" ,          label: "Runout Mankand", image: 'runout_mankand' },
    {value: "OBSTR(THE_FILED)" ,    label: "Obstr. Field", image: 'obstr_field' },
  ];


    
    
    const handleCancel = () => {
        handleCloseModal("wicket");
    }


    return ( <>
{/* select wicket and type  */}
        <Dialog open={openModal.wicket} onClose={() => handleCancel()} maxWidth='xs' fullWidth>
        <DialogTitle className="border border-bottom text-center fw-bold">
            {outType}
            </DialogTitle>
            <DialogContent className='p-5 pt-3'>
                <Grid container spacing={1}>

                  
                  {/* select out type  */}
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <InputLabel >Out Type</InputLabel>
                         <Select
                                    label="Out Type"
                                    value={outType}
                                    onChange={(e) => setOutType(e.target.value)}
                                >
                                    {
                                        outArr.map(item => 
                                        <MenuItem key={item.value} value={item.label}>{item.label}</MenuItem>)
                                    }
                                </Select>
                        </FormControl>
                        
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <InputLabel >Who Helped</InputLabel>
                         <Select
                                    label="Who Helped"
                                    value={outHelping}
                                    onChange={(e) => setOutHelping(e.target.value)}
                                >
                                    {
                                        currentInningOvers?.team && runningMatchData.info &&
                                        runningMatchData.info.players[(currentInningOvers.team === runningMatchData.info.teams[0]) 
                                        ? runningMatchData.info.teams[1]
                                        : runningMatchData.info.teams[0]].map(item => 
                                        <MenuItem key={item} value={item}>{item}</MenuItem>)
                                    }
                                    <MenuItem value="">Helped</MenuItem>
                                </Select>
                            {/* } */}
                             {/* <FormHelperText>{validate.helper && "Helper Required" || ""}</FormHelperText> */}
                        </FormControl>
                        
                    </Grid>

                    
                    {/* select out batsman  */}
                    <Grid item xs={12}>
                      {/* {[matchState.striker,matchState.non_striker].length > 0 &&  */}
                        <FormControl fullWidth 
                        // error={validate.out_batsman}
                        >
                            <InputLabel id="demo-simple-select-label" >Select Out Batsman</InputLabel>
                                 <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Out Batsman"
                                    // onChange={(e) => setOutBatsman(e.target.value)}
                                >
                                    {/* {
                                        [matchState.striker,matchState.non_striker].map(item => <MenuItem key={item._id} value={item}>{item.players_name}</MenuItem>)
                                    } */}
                                    <MenuItem value="">Out Batsman</MenuItem>
                                </Select>
                            {/* } */}
                              {/* <FormHelperText>{validate.out_batsman && "Out Batsman Required" || ""}</FormHelperText> */}
                        </FormControl>
                    </Grid>

        {/* for extra run  */}
              {/* {outLabel === "Stumped" ?  */}
              <Grid item xs={12} className='ms-1 mt-1'>
              <FormControlLabel
                  // onChange={(e) => e.target.checked ? setExtra({run:0,["run_type"]:"WD"}) : setExtra({run:0,["run_type"]:""})}
                  control={<Checkbox sx={checkBoxStyle}/>}
                  label="Wide"
                  labelPlacement="end"
                />
                </Grid>
              {/* :""} */}


              {/* for runout and extra all type   */}
              {/* {outLabel === "Runout" ?  <> */}
                    <Grid item xs={12} className='mt-2'>
                      <TextField
                          fullWidth
                          id="run"
                          label="Run"
                          name="run"
                          type="number"
                          variant="outlined"
                          // onChange={(e) => setExtra({...extra,[e.target.name]:Number(e.target.value)})}
                      />
                    </Grid> 
                    <Grid item xs={12}>
                      <FormControlLabel
                          // onChange={(e) => e.target.checked ? setExtra({...extra,["run_type"]:"WD"}) : setExtra({...extra,["run_type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Wide"
                          // checked={extra.run_type === "WD"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                          // onChange={(e) => e.target.checked ? setExtra({...extra,["run_type"]:"NB"}) : setExtra({...extra,["run_type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="No Ball"
                          // checked={extra.run_type === "NB"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                          // onChange={(e) => e.target.checked ? setExtra({...extra,["run_type"]:"BYE"}) : setExtra({...extra,["run_type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Bye"
                          // checked={extra.run_type === "BYE"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                          // onChange={(e) => e.target.checked ? setExtra({...extra,["run_type"]:"LB"}) : setExtra({...extra,["run_type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Leg Bye"
                          // checked={extra.run_type === "LB"}
                          labelPlacement="end"
                        />
                    </Grid>
                    {/* </>  */}
                    {/* :""} */}

                    <Grid item xs={12}>
                      <hr />
                      </Grid> 
                        {/* select new batsman  */}
                    <Grid item xs={12}>
                        <FormControl fullWidth 
                        // error={validate.new_batsman}
                        >
                            <InputLabel id="demo-simple-select-label" >Select New Batsman</InputLabel>
                            <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select New Batsman"
                                    // onChange={(e) => setNewbatsman(e.target.value)}
                                >
                                    {/* {
                                        batting.players.map(item => <MenuItem key={item._id} value={item} disabled={alreadyPLayedPLayers(item.players_id)}>
                                          {item.players_name}</MenuItem>)
                                    } */}
                                    <MenuItem value="">new Batsman</MenuItem>
                                </Select>
                            {/* } */}
                              {/* <FormHelperText>{validate.new_batsman && "New Batsman Required" || ""}</FormHelperText> */}
                        </FormControl>
                      {/* } */}
                    </Grid>
                </Grid>
            </DialogContent>
                <DialogActions className="m-0 p-0">
                    <div className="w-100 d-flex">
                        <Button
                        size="large"
                        className="w-100 rounded-0 text-dark bglightgrey fw-bold"
                        // onClick={() => handleCancel()}
                        sx={{
                            ":hover": {
                            bgcolor: "#DADADA",
                            color: "black",
                            },
                        }}
                        >
                        Cancel
                        </Button>
                        <Button
                        size="large"
                        className="w-100 rounded-0 text-white mainbgadmin fw-bold"
                        // onClick={() => handleSave()}
                        sx={{
                            ":hover": {
                            bgcolor: "#222B42",
                            color: "white",
                            },
                        }}
                        >
                        Confirm
                        </Button>
                    </div>
                </DialogActions>
        </Dialog>
        </>
    );
}

export default Out