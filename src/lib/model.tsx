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
import { useCurrentEditor } from "@tiptap/react";
import create_database from "./blogcreate";
import ShareBody from "./sharebody";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Publish({

  title,
  settitle,
}: {
 
  title: any;
  settitle: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState(
    window.location.origin
  );
  const [opensharepage,setopensharepage] = React.useState(false)
 const { editor } = useCurrentEditor();
 const [desc,setdesc]=React.useState("")
const [url,seturl] =React.useState("")
 const handleSubmitblog = async () => {
    console.log("title",title)
    console.log(editor)
    if (editor) {
     const content = editor.getHTML(); // Get content as HTML
     const jsonContent = editor.getJSON(); // Optionally, get content as JSON
    //  await create_database(content,title,url,desc);
     console.log("content",content)
   
   }
   
   };
  const handleClickOpen = () => {
 
    setOpen(true);
  };
  const handleClose = async () => {
    handleSubmitblog(); // Ensure this is spelled correctly if it's "handleSubmit"
    console.log("Start");
    setShareUrl(shareUrl+"/"+url);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("After 2 seconds");
        resolve();
      }, 2000);
    });
    
    console.log("End");
    setopensharepage(true)
    // setOpen(false); // Assuming this updates a state or toggles a modal.
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
      {
        (!opensharepage) ?
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
          <Typography>Enter the title of your web page</Typography>
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
          <Typography>Enter the  url your web page</Typography>
          <Typography gutterBottom sx={{}}>
            <input
              placeholder="Enter the title with _ as space"
              className="w-full border-2 border-grey focus:outline-none  "
              value={url}
              onChange={(e) => {
                seturl(e.target.value);
              }}
            ></input>
          </Typography>
          <Typography>Enter the description of your web page</Typography>
          <Typography gutterBottom sx={{}}>
            <input
              placeholder="Enter the title with _ as space"
              className="w-full border-2 border-grey focus:outline-none  "
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
            ></input>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose()}>
            comfirm Publish
          </Button>
        </DialogActions>
      </BootstrapDialog>: <ShareBody open={open} setOpen={setOpen} shareUrl={shareUrl}></ShareBody>}
    </React.Fragment>
  );
}
