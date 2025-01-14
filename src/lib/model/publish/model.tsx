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
import { Input, Select } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";


import ShareIcon from "@mui/icons-material/Share";
import { ShareBody } from "../share";

import { MultipleAutoComplete } from "@/lib/autocomplete/multipleAutoComplete";
import { CreateBlog } from "@/lib/utilis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function Publish({ title, settitle }: { title: string; settitle: (arg0: string)=>void }) {
  const [value, setValue] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [autocompleteelement, setautocompleteelement] = React.useState([]);
  const [shareUrl, setShareUrl] = React.useState(window.location.origin);
  const [opensharepage, setopensharepage] = React.useState(false);
  const [estimateTime, setEstimateTime] = React.useState(5);
  const { editor } = useCurrentEditor();
  const [desc, setdesc] = React.useState("");
  const [url, seturl] = React.useState("");
  const handleSubmitblog = async () => {
    console.log("title", title);
    console.log(editor);
    if (editor) {
      const content = editor.getHTML(); // Get content as HTML
      const jsonContent = editor.getJSON(); // Optionally, get content as JSON
      const result = await CreateBlog(content, title, url, desc, value);
      console.log("content", content);
      try {
        const response = await fetch("/api/tags/set_tags", {
          method: "POST",
          body: JSON.stringify({
            blogid: result[0].id,
            tags: value,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    fetch("/api/tags/get_tags", {
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: "force-cache",
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setautocompleteelement(data.data));
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handledialogClose = () => {
    setOpen(false);
  };
  const handleConfirmPublish = async () => {
    console.log("closing");
    handleSubmitblog(); // Ensure this is spelled correctly if it's "handleSubmit"
    console.log("Start");
    setShareUrl(`${shareUrl}/blogs/${url}`);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("After 2 seconds");
        resolve();
      }, 2000);
    });

    console.log("End");
    setopensharepage(true);

    // setOpen(false); // Assuming this updates a state or toggles a modal.
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "skyblue",
          padding: "5px 10px",
          color: "black",
          borderRadius: "20px",
          border: "none",
          textTransform: "none",
          fontSize: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleClickOpen}
      >
        <ShareIcon
          sx={{
            fontSize: {
              xs: "10px",
              sm: "12px",
              md: "13px",
              lg: "14px",
            },
          }}
        />
        <div className="ml-2 xl:text-[12px] md:text-[11px] sm:text-[11px]">
          Publish
        </div>
      </Button>
      {!opensharepage ? (
        <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Publish the document
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handledialogClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            dividers
            sx={{
              width: {
                xs: "350px",
                sm: "500px",
              },
              height: "auto",
            }}
          >
            <Typography>Enter the title of your web page</Typography>
            <Typography gutterBottom sx={{}}>
              <input
                placeholder="Enter the title"
                className="p-2 w-full rounded-[5px] border-1 mb-3 mt-2 focus:outline-blue-500"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
            </Typography>
            <Typography>Enter the url your web page</Typography>
            <Typography>
              <input
                placeholder="Enter the url"
                className="p-2 w-full rounded-[5px] border-1 mb-3 mt-2 focus:outline-blue-500 !important"
                value={url}
                onChange={(e) => {
                  seturl(e.target.value);
                }}
              />
            </Typography>
            <Typography>Enter the tags of your web page</Typography>
            <Typography gutterBottom sx={{}}>
              <MultipleAutoComplete
                title={"Enter tags"}
                islabel={false}
                autocompleteelement={autocompleteelement}
                value={value}
                setValue={setValue}
              />
            </Typography>
            <Typography>Enter the description of your web page</Typography>
            <Typography gutterBottom sx={{}}>
              <input
                placeholder="Enter the description"
                className="p-2 w-full rounded-[5px] border-1 mt-2 focus:outline-blue-500"
                value={desc}
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: "blue",
                padding: "8px 12px",
                margin: "5px 0",
                color: "#ffffff",
                fontWeight: "500",
                border: "none",
                borderRadius: "12px",
              }}
              autoFocus
              onClick={handleConfirmPublish}
            >
              comfirm Publish
            </Button>
          </DialogActions>
        </BootstrapDialog>
      ) : (
        <ShareBody
          open={open}
          setOpen={setOpen}
          shareUrl={shareUrl}
          setopensharepage={setopensharepage}
        />
      )}
    </React.Fragment>
  );
}
