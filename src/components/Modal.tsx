import { Add } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { FormDemo } from "./Form";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box textAlign="center" px="1rem">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<Add />}
        onClick={handleOpen}
      >
        Add New Location
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box overflow="auto" height="100vh" mt={12}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <FormDemo closeModal={handleClose} />
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
