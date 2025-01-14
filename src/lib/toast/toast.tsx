import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function Toast({open,setOpen,content,type,vertical,horizontal,duration=6000}:any) {
 
  const handleClose = (event: React.SyntheticEvent | null, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
  
       
        <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={duration} >
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