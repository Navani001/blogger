import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Input } from "@nextui-org/react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Publish({
  handleSumbit,
  title,
  settitle,
}: {
  handleSumbit: any;
  title: any;
  settitle: any;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
 
    setOpen(true);
  };
  const handleClose = async () => {
    handleSumbit(); // Ensure this is spelled correctly if it's "handleSubmit"
    console.log("Start");
    
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("After 2 seconds");
        resolve();
      }, 2000);
    });
    
    console.log("End");
    setOpen(false); // Assuming this updates a state or toggles a modal.
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{ backgroundColor: "blue", color: "black" }}
        onClick={handleClickOpen}
      >
        Publish
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Publish the document
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: "500px", height: "300px" }}>
          <Typography>Enter the type of your web page</Typography>
          <Typography gutterBottom sx={{}}>
            <input
              placeholder="Enter the title with _ as space"
              className="w-full border-2 border-grey focus:outline-none  "
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
            ></input>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose()}>
            comfirm Publish
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
