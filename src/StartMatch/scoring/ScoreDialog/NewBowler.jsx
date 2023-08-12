import React, {useState} from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle,
     FormControl, Grid,
    InputLabel, Select, MenuItem,FormHelperText
} from '@mui/material';

function NewBowler({ openModal,handleCloseModal,runningMatchData,currentInningOvers,setCurrentInning,setCurrentInningOvers,currentInning}) {
    const [newBowler, setNewBowler] = useState(null)
    const [validate, setValidate] = React.useState(false)
    
    const handleClose = () => {
        handleCloseModal("bowler");
      };

      const handleSubmit = () => {
        if(newBowler){
            // if(!currentInning.bowler[newBowler]){
            //     setCurrentInning({...currentInning,['bowler']:{...currentInning.bowler,[newBowler]:}})
            // }
            setCurrentInningOvers({...currentInningOvers,['bowler']:newBowler})
            setValidate(true)
            handleClose();
        }else{
            setValidate(true)
            return false
        }
      }
    
      const checkBowlers = () => {
        return runningMatchData.info.players[currentInningOvers.team].includes(currentInningOvers.bowler) || false
      }
   
    return (
        <Dialog open={openModal.bowler} maxWidth='xs' fullWidth>
            <DialogTitle className="border border-bottom text-center fw-bold">Next Bowler</DialogTitle>
            <DialogContent className='p-5'>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <FormControl fullWidth 
                        error={validate}
                        >
                            <InputLabel id="demo-simple-select-label" >Next Bowler</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="Next Bowler"
                                onChange={(e) => setNewBowler(e.target.value)}
                                >
                                    {currentInningOvers?.team && runningMatchData.info &&
                                        runningMatchData.info.players[(currentInningOvers.team === runningMatchData.info.teams[0]) 
                                        ? runningMatchData.info.teams[1]
                                        : runningMatchData.info.teams[0]].map((item) => 
                                        {return <MenuItem key={item} 
                                        disabled={checkBowlers(item)} 
                                        value={item}>
                                            {item}</MenuItem>})
                                    }
                                </Select>
                               <FormHelperText>{validate && "Helper Required" || ""}</FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions className='m-0 p-0'>
                <div className="w-100 d-flex">
                        <Button
                        size="large"
                        className="w-100 rounded-0 text-dark bglightgrey fw-bold"
                        onClick={() => handleClose()}
                        style={{backgroundColor: "#dadada"}}
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

    );
}

export default NewBowler