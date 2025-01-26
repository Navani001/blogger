import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
interface ToastProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  content: React.ReactNode;
  type: AlertProps["severity"];
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  duration?: number;
}
export function Toast({ open, setOpen, content, type, vertical, horizontal, duration = 6000 }: ToastProps) {

  const handleClose = (event: React.SyntheticEvent | null, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>


      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={duration} >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {content}
        </Alert>
      </Snackbar>
    </div>
  );
}