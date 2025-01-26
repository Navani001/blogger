"use client";

import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";

interface PopOverProps {
  title: string;
  body: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  titlestyle?: string;
}


export function PopOver({ title, body, icon, isLoading = false, titlestyle = "" }: PopOverProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    console.log("hi",event.target)
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
       <Button
  isLoading={isLoading}
         aria-describedby={id}
       onPress={handleClick}
      
      className={" bg-black min-w-0 h-auto text-white rounded-[20px] text-xs gap-[2px] px-[0.5rem] py-[0.4rem] mr-3 "+ titlestyle}>  {!isLoading && icon} {title}</Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {body}
        {/* <input type='text' value={input} placeholder='enter the prompt' onChange={handleInputChange} className='border-1 border-black'></input>  <button onClick={action}>Generate</button> */}
      </Popover>
    </div>
  );
}
