import  React, {useState} from 'react';
import {
    Button, TextField, Dialog, DialogActions,Checkbox,
    DialogContent, DialogContentText, DialogTitle,
    Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Grid,
    InputLabel, Select, MenuItem,  Slide,FormHelperText
} from '@mui/material';



function Out({openModal,handleCloseModal,runningMatchData,currentInningOvers,currentInning,handleAddRun}) {
    const [outType, setOutType] = useState("BOLD")
    const [extra, setExtra] = useState({type:null,run:0})
    const [outHelping, setOutHelping] = useState(null)
    const [outBatsman, setOutBatsman] = useState(currentInningOvers?.striker || "")
    const [newbatsman, setNewbatsman] = useState(null)
    const [validate, setValidate] = useState({helper:false,new_batsman:false})
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
    {value: "STUMPED" ,  label: "Stumped", image: 'stumped' },
    {value: "RUN_OUT" ,   label: "Runout", image: 'runout' },
    {value: "LBW" ,       label: "LBW", image: 'lbw' },
    {value: "HIT_WICKET" ,label: "Hit Wicket", image: 'hit_wicket' },
    {value: "RETIRED_HURT" ,          label: "Retired Hurt", image: 'retired_hurt' },
    {value: "RUN_OUT(MANKADED)" ,          label: "Runout Mankand", image: 'runout_mankand' },
    {value: "OBSTR(THE_FILED)" ,    label: "Obstr. Field", image: 'obstr_field' },
  ];
    
    const handleCancel = () => {
        handleCloseModal("wicket");
        setNewbatsman(null)
        setOutHelping(null)
    }

    const handleSubmit = () => {
        let wicket = {
            player_out : outBatsman || currentInningOvers?.striker,
            fielder : outHelping,
            kind : outType,
        }
        if(["CAUGHT","CAUGHT_BEHIND","STUMPED","RUN_OUT"].includes(outType) && !outHelping){
            setValidate({...validate,helper:true})
            return false
        }
        if(!newbatsman){
            setValidate({...validate,new_batsman:true})
            return false
        }
        if(extra && extra.type === 'NB'){
            handleAddRun(extra.run,{type:extra.type,run:0},wicket,newbatsman)
        }else if(extra.type){
            handleAddRun(0,extra,wicket,newbatsman)
        }else{
            handleAddRun(0,null,wicket,newbatsman)
        }
        handleCancel()
    }

    return ( <>
{/* select wicket and type  */}
        <Dialog open={openModal.wicket} onClose={() => handleCancel()} maxWidth='xs' fullWidth>
        <DialogTitle className="border border-bottom text-center fw-bold">
            {"Wicket"}
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
                            {outArr.map(item => 
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
                        </Select>
                        </FormControl>
                        
                    </Grid>

                    {/* select out type  */}
                    {outType && ["CAUGHT","CAUGHT_BEHIND","STUMPED","RUN_OUT"].includes(outType) && 
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
                                </Select>
                             <FormHelperText>{validate.helper && "Helper Required" || ""}</FormHelperText>
                        </FormControl>   
                    </Grid>}


                    {/* for extra run  */}
                {outType === "STUMPED" ? 
                <Grid item xs={12} className='ms-1 mt-1'>
                <FormControlLabel
                    onChange={(e) => e.target.checked ? setExtra({run:0,["type"]:"WD"}) : setExtra({run:0,["type"]:""})}
                    control={<Checkbox sx={checkBoxStyle}/>}
                    label="Wide"
                    labelPlacement="end"
                    />
                    </Grid>
                :""} 
                    
                    {/* select out batsman  */}
                    {outType && ["RUN_OUT"].includes(outType) && <>
                    <Grid item xs={12}>
                        <FormControl fullWidth 
                        >
                            <InputLabel id="demo-simple-select-label" >Select Out Batsman</InputLabel>
                                 <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Out Batsman"
                                    value={outBatsman}
                                    onChange={(e) => setOutBatsman(e.target.value)}
                                >
                                    <MenuItem value={currentInningOvers.striker}>{currentInningOvers.striker}</MenuItem>
                                    <MenuItem value={currentInningOvers.non_striker}>{currentInningOvers.non_striker}</MenuItem>
                                </Select>
                        </FormControl>
                    </Grid>
                    
              {/* for runout and extra all type   */}
                    <Grid item xs={12} className='mt-2'>
                      <TextField
                          fullWidth
                          id="run"
                          label="Run"
                          name="run"
                          type="number"
                          variant="outlined"
                          onChange={(e) => setExtra({...extra,[e.target.name]:Number(e.target.value)})}
                      />
                    </Grid> 
                    <Grid item xs={12}>
                      <FormControlLabel
                          onChange={(e) => e.target.checked ? setExtra({...extra,["type"]:"WD"}) : setExtra({...extra,["type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Wide"
                          checked={extra.type === "WD"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                          onChange={(e) => e.target.checked ? setExtra({...extra,["type"]:"NB"}) : setExtra({...extra,["type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="No Ball"
                          checked={extra.type === "NB"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                          onChange={(e) => e.target.checked ? setExtra({...extra,["type"]:"BYE"}) : setExtra({...extra,["type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Bye"
                          checked={extra.type === "BYE"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                          onChange={(e) => e.target.checked ? setExtra({...extra,["type"]:"LB"}) : setExtra({...extra,["type"]:""})}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Leg Bye"
                          checked={extra.type === "LB"}
                          labelPlacement="end"
                        />
                    </Grid>
                    </> } 

                    <Grid item xs={12}>
                      <hr />
                    </Grid> 

                        {/* select new batsman  */}
                    <Grid item xs={12}>
                        <FormControl fullWidth error={validate.new_batsman}
                        >
                            <InputLabel id="demo-simple-select-label" >Select New Batsman</InputLabel>
                            <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select New Batsman"
                                    onChange={(e) => setNewbatsman(e.target.value)}
                                >
                                    {currentInningOvers?.team && runningMatchData.info.players[currentInningOvers.team].map(item => <MenuItem key={item}
                                    value={item} disabled={currentInning.batsman[item] ? true : false}>{item}</MenuItem>)
                                    }
                                </Select>
                              <FormHelperText>{validate.new_batsman && "New Batsman Required" || ""}</FormHelperText>
                        </FormControl>
                    </Grid>


                </Grid>
            </DialogContent>
                <DialogActions className="m-0 p-0">
                    <div className="w-100 d-flex">
                        <Button
                        size="large"
                        className="w-100 rounded-0 text-dark bglightgrey fw-bold"
                        onClick={() => handleCancel()}
                        sx={{
                            ":hover": {
                            bgcolor: "#DADADA",
                            color: "black",
                            },
                        }}
                        style={{backgroundColor: "#dadada"}}
                        >
                        Cancel
                        </Button>
                        <Button
                        size="large"
                        className="w-100 rounded-0 text-white mainbgadmin fw-bold"
                        onClick={() => handleSubmit()}
                        style={{backgroundColor: "#222b42"}}
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