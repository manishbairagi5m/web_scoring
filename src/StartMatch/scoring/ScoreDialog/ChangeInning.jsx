import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function ChangeInning() {
    const handleClose = () => {
        // onClose(false);
    };

   
    return (
        <Dialog open={false} maxWidth='xs' fullWidth>
                <DialogTitle className="border border-bottom text-center fw-bold">Change Inning</DialogTitle>
                <DialogContent>
                     <div className='p-4 d-flex justify-content-center align-items-center'>
                       <div className='w-100 d-flex flex-column align-items-center '>
                        <div className='p-2'>
                            Are You Sure You Want to Change Inning ?
                        </div>     
                       <div className='p-2 text-success'>
                        India need 0 in 0 over
                       </div>
                       <div>
                          {`Required Run Rate: 0`}
                       </div>
                       </div>
                     </div>
                </DialogContent>
                <DialogActions className="m-0 p-0">
                    <div className="w-100 d-flex">
                        <Button
                        // onClick={() => handleClose()}
                        size="large"    
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
                        sx={{
                            ":hover": {
                            bgcolor: "#222B42",
                            color: "white",
                            },
                        }}
                        // onClick={() => handleChangeInning()}
                        >
                        Confirm
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>


        
    );
}

export default ChangeInning