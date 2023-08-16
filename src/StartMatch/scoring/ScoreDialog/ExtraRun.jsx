import React,{useState,useEffect} from 'react';
import {Button,TextField,
    Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,FormControlLabel,Checkbox} from '@mui/material'
// import { bye,leg_bye,no_ball,wide } from "../../../../../../../Assets/images/out_modals"


function ExtraRun({handleCloseModal,openModal,extraType,handleAddRun}) {
    const [state,setState] = useState(0)
    const [extraRunType,setExtraRunType] = useState(extraType)

    let checkBoxStyle= { '& .MuiSvgIcon-root': { fontSize: 18 } ,  color: "#2B344A",
                        '&.Mui-checked': {
                              color: "#2B344A",
                            }, }

    const obj = {
         WD : "Wide Ball" ,
         NB : "No Ball"  ,
         BYE : "Bye Runs"  ,
         LB : "Leg Bye Runs" ,
         OVERTHROW : "Overthrow Runs" ,
        //  PENALTY : "Penalty Runs" ,
         "BYE&NB" : "Bye And No Ball Runs" ,
         "LB&NB" : "Leg Bye And No Ball Runs" ,
    }
    

    const handleClose = () => {
      handleCloseModal("extra");
    };

    const handleSubmit = () => {
      if(extraRunType === 'NB' || extraRunType === 'NBLB' || extraRunType === 'NBBYE'){
        handleAddRun(Number(state),{type:extraRunType,run:0})
      }else{
        handleAddRun(0,{type:extraRunType,run:Number(state)})
      }
      setState(0)
      handleCloseModal("extra");
    }


    
    return (
            <Dialog open={openModal.extra} onClose={handleClose} maxWidth='xs' fullWidth>
                <DialogTitle className="border border-bottom text-center fw-bold">
                  {extraRunType && obj[extraRunType]}
                    </DialogTitle>
                <DialogContent>
                     <div className='p-4 ps-3 d-flex justify-content-center align-items-center'>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Run"
                        // value={state}
                        type="number"
                        variant="outlined"
                        onChange={(e) => setState(e.target.value)}
                        // error={error}
                        // helperText={error && "Please Add Penalty Runs"}
                    />
                     </div>
                     {extraRunType === "NB" &&
                     <div className='d-flex align-items-center justify-content-center p-4 pt-1'>
                      <FormControlLabel
                          onChange={(e) => e.target.checked ? setExtraRunType("BYE&NB") : setExtraRunType("NB")}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Bye"
                          checked={extraRunType === "BYE&NB"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                        onChange={(e) => e.target.checked ? setExtraRunType("LB&NB") : setExtraRunType("NB")}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Leg Bye"
                          checked={extraRunType === "LB&NB"}
                          labelPlacement="end"
                        />
                     </div>
                     }
                </DialogContent>
                <DialogActions className="m-0 p-0">
                    <div className="w-100 d-flex">
                        <Button
                        size="large"
                        onClick={() => handleClose()}
                        className="w-100 rounded-0 text-dark fw-bold"
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
                        className="w-100 rounded-0 text-white fw-bold"
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

export default ExtraRun