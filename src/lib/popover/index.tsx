"use client";

import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function BasicPopover({ title, body, icon,titlestyle={fontSize:"12px",   padding: "10px 15px",} }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
      
        sx={{
          borderRadius: "20px",
       
          minWidth: "0px",
   
          textTransform: "none",
          marginRight: "10px",
          "&.MuiButton-root": {
            backgroundColor: "black"
          },
          ...(titlestyle || {})
        }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {icon} {title}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {body}
        {/* <input type='text' value={input} placeholder='enter the prompt' onChange={handleInputChange} className='border-1 border-black'></input>  <button onClick={action}>Generate</button> */}
      </Popover>
    </div>
  );
}
