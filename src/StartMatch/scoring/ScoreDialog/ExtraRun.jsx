import React,{useState,useEffect} from 'react';
import {Button,TextField,
    Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,FormControlLabel,Checkbox} from '@mui/material'
// import { bye,leg_bye,no_ball,wide } from "../../../../../../../Assets/images/out_modals"


function ExtraRun() {
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
        // onClose(false);
    };


    
    return (
            <Dialog open={false} onClose={handleClose} maxWidth='xs' fullWidth>
                <DialogTitle className="border border-bottom text-center fw-bold">
                    {/* {extraType !== 'OVERTHROW' && obj[extraType] || 'Runs'} */}
                    </DialogTitle>
                <DialogContent>
                     <div className='p-4 ps-3 d-flex justify-content-center align-items-center'>
                     {/* {extraType !== 'OVERTHROW' && <img src={imgobj[extraType]} alt='img' style={{width:'50px'}} className='me-4'/>} */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Run"
                        // value={state}
                        type="number"
                        variant="outlined"
                        // onChange={(e) => handleChange(e)}
                        // error={error}
                        // helperText={error && "Please Add Penalty Runs"}
                    />
                     </div>
                     {/* {extraRunType === "NB" && */}
                     <div className='d-flex align-items-center justify-content-center p-4 pt-1'>
                      <FormControlLabel
                        //   onChange={(e) => e.target.checked ? setExtraType("BYE&NB") : setExtraType("NB")}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Bye"
                        //   checked={extraType === "BYE&NB"}
                          labelPlacement="end"
                        />
                      <FormControlLabel
                        // onChange={(e) => e.target.checked ? setExtraType("LB&NB") : setExtraType("NB")}
                          control={<Checkbox size='small' sx={checkBoxStyle}/>}
                          label="Leg Bye"
                        //   checked={extraType === "LB&NB"}
                          labelPlacement="end"
                        />
                     </div>
                     {/* } */}
                </DialogContent>
                <DialogActions className="m-0 p-0">
                    <div className="w-100 d-flex">
                        <Button
                        size="large"
                        // onClick={() => handleClose()}
                        className="w-100 rounded-0 text-dark bglightgrey fw-bold"
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
                        // onClick={() => handleSubmit()}
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