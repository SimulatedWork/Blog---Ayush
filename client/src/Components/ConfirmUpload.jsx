/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Alert, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CancelIcon from "@mui/icons-material/Cancel";

const ConfirmUpload = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ padding: "5vh" }}>
      <Alert severity="error">
        You are now going to upload a new blog to <strong>Bloggery</strong>.
      </Alert>
      <DialogActions>
        <IconButton sx={{ width: "auto" }} onClick={onClose}>
          <CancelIcon sx={{ color: "red" }} />
        </IconButton>
        <IconButton sx={{ width: "auto" }} onClick={onConfirm}>
          <UploadIcon sx={{ color: "blue" }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmUpload;
