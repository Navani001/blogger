import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
} from "react-share";
import { ShareBody } from "./sharebody";



export function Share() {
  const [shareUrl, setShareUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    // Update shareUrl after component mounts
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ backgroundColor: "blue" }}
        onClick={handleClickOpen}
      >
        Share
      </Button>

      <ShareBody open={open} setOpen={setOpen} shareUrl={shareUrl} />
    </React.Fragment>
  );
}
