import React from "react";
import { Modal, Box, Grid, Button } from "@mui/material";

const CustomModal = ({ open, onClose, children }) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const paperStyle = {
    position: "absolute",
    width: "80%",
    height: "600px",
    backgroundColor: "white",
    borderRadius: "12px",
    p: 2,
    overflow: "auto",
  };

  return (
    <Modal open={open} onClose={onClose} style={modalStyle}>
      <Box sx={paperStyle}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
