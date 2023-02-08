import React from 'react';
import { CircularProgress } from "@mui/joy";
import { Backdrop } from "@mui/material";

const BackdropLoader = ({open}: { open: boolean }) => {
  return (
    <Backdrop sx={{position: "sticky", height: "100%", backdropFilter: "blur(5px)"}} open={open}>
      <CircularProgress size={"lg"} color={"warning"} variant={"soft"}/>
    </Backdrop>
  );
};

export default BackdropLoader;