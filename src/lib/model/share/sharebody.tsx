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
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
} from "react-share";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function ShareBody({
  open,
  setOpen,
  shareUrl,
  setopensharepage,
}: any) {
  const [showCopyAlert, setShowCopyAlert] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setopensharepage(false);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopyAlert(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareToSocialMedia = (
    platform: "whatsapp" | "linkedin" | "instagram"
  ) => {
    const encodedUrl = encodeURIComponent(window.location.href);

    const encodedDesc = encodeURIComponent(
      "i have created a blogs yeah check it out "
    );

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodedDesc}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedDesc}`,
      instagram: `https://instagram.com/share?url=${encodedUrl}`,
    };

    window.open(shareUrls[platform], "_blank");
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Share the document blog
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers sx={{ width: "500px" }}>
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="subtitle1" gutterBottom>
              Enter the URL to share
            </Typography>
            <div style={{ display: "flex", gap: "10px" }}>
              <Input
                placeholder="Enter the URL"
                fullWidth
                value={shareUrl}
                disabled
              />
              <IconButton onClick={handleCopyUrl} color="primary">
                <ContentCopyIcon />
              </IconButton>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={() => shareToSocialMedia("whatsapp")}
              sx={{ backgroundColor: "#25D366" }}
            >
              WhatsApp
            </Button>

            <TwitterShareButton url={shareUrl} title={"share this page"}>
              <div className="flex gap-2 p-3 bg-[#1DA1F2] rounded-md">
                <TwitterIcon size={25}/>
                Twitter</div>
            </TwitterShareButton>
            <LinkedinShareButton  url={shareUrl} title={"share this page"}>
              <div className="bg-[#0A66C2] p-3 rounded-md flex gap-2">
                <LinkedInIcon />
                Linkedin
              </div>
            </LinkedinShareButton>
            {/* <Button
              variant="contained"
              startIcon={<LinkedInIcon />}
              onClick={() => shareToSocialMedia('linkedin')}
              sx={{ backgroundColor: '#0A66C2' }}
            >
              LinkedIn
            </Button> */}
          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Snackbar
        open={showCopyAlert}
        autoHideDuration={2000}
        onClose={() => setShowCopyAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          URL copied to clipboard!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
