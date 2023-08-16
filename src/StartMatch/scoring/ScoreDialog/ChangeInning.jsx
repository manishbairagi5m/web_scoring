import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getBallFromOver } from "../../../ApiFunctions/scoring";

function ChangeInning({openModal,handleCloseModal,currentInning, runningMatchData,handleChangeInning}) {

    const handleClose = () => {
        handleCloseModal("inning");
    };

    const handleSubmit = () => {
        handleChangeInning()
        handleClose()
    }
   
    return (
        <Dialog open={openModal.inning} maxWidth='xs' fullWidth>
                <DialogTitle className="border border-bottom text-center fw-bold">Change Inning</DialogTitle>
                <DialogContent>
                     <div className='p-4 d-flex justify-content-center align-items-center'>
                       <div className='w-100 d-flex flex-column align-items-center '>
                        <div className='p-2'>
                            Are You Sure You Want to Change Inning ?
                        </div>     
                       <div className='p-2 text-success'>
                        {runningMatchData.innings[1].team} need {currentInning.run_scored+1} in {runningMatchData.info.overs} over
                       </div>
                       <div>
                          {`Required Run Rate: ${((Number(currentInning.run_scored)+1)/Number(getBallFromOver(runningMatchData.info.overs)))*6}}`}
                       </div>
                       </div>
                     </div>
                </DialogContent>
                <DialogActions className="m-0 p-0">
                    <div className="w-100 d-flex">
                        <Button
                        onClick={() => handleClose()}
                        size="large"    
                        className="w-100 rounded-0 text-dark bglightgrey fw-bold"
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
                        style={{backgroundColor: "#222b42"}}
                        sx={{":hover": {
                            bgcolor: "#222B42",
                            color: "white",
                            },
                        }}
                        onClick={() => handleSubmit()}
                        >
                        Confirm
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>


        
    );
}

export default ChangeInning