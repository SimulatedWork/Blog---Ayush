/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Alert, IconButton } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ padding: "5vh" }}>
      <Alert severity="error">Are you sure you want to delete this Blog?</Alert>
      <DialogActions>
        <IconButton sx={{ width: "auto" }} onClick={onClose}>
          <CancelIcon sx={{ color: "lightgreen" }} />
        </IconButton>
        <IconButton sx={{ width: "auto" }} onClick={onConfirm}>
          <DeleteForever sx={{ color: "red" }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
