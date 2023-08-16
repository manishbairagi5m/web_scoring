import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getForceOutCome } from "../../../ApiFunctions/scoring";

function EndMatch({openModal,handleCloseModal,runningMatchData,handleMatchEnd}) {
 
  const handleClose = () => {
    handleCloseModal('end_match')
  };

  const handleSubmit = () => {
    handleMatchEnd()
  }

  return (
    <Dialog open={openModal.end_match} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle className="border border-bottom text-center fw-bold">
        End Match
      </DialogTitle>
      <DialogContent>
        <div className="p-4 d-flex justify-content-center align-items-center position-relative">
        
            <div className="w-100">
            <div className="p-2 text-center">Are You Sure You Want to End Match ?</div>
            <div className="p-2 text-success text-center">
              {getForceOutCome(runningMatchData)}
            </div>
            <div className="p-2 text-center">
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
            sx={{
              ":hover": {
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

export default EndMatch;
