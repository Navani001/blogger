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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
} from "react-share";
import ShareBody from "./sharebody";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Share() {
    const [shareUrl, setShareUrl] = React.useState(
        window.location.href
      );
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  


  

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ backgroundColor: "blue" }}
        onClick={handleClickOpen}
      >
        Share
      </Button>

     <ShareBody open={open} setOpen={setOpen} shareUrl={shareUrl}></ShareBody>
    </React.Fragment>
  );
}
