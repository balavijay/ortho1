import { useCallback, useState, useEffect } from "react";

import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Scrollbar } from "src/components/scrollbar";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export const FileUpload = (props) => {
  const { orders = [], sx } = props;
  console.log("props", props.from);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e) {
    //e.preventDefault();
    e.preventDefault();
    console.log("e", e.target);

    // //if (typeof acceptedFiles[0] === "undefined") return;

    let url = "";
    if (props.from == "dataop") {
      url = "http://54.161.201.248:8080/api/ortho/UploadScans";
    } else {
      url = "http://54.161.201.248:8080/api/ortho/UploadCases";
    }

    const formData = new FormData();
    console.log(e.target.files);
    //const file = e.target.files[0];

    formData.append("Media", selectedImage);
    //formData.append("file", acceptedFiles[0]);
    setLoader(true);
    const results = await fetch(url, {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    console.log("results", results.OrthoMedia.message);
    setMessage(results.OrthoMedia.message);
    setOpen(true);
    setLoader(false);
    props.onCompleted();
  }

  const handleClose = ( ) => { 
    setLoader(false);
  };

  const handleOpen = ( ) => { 
    setLoader(true);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        
      </IconButton>
    </>
  );


  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" spacing={3}>
          {props.from == "dataop" && (
            <Typography color="text.secondary" variant="overline">
              Upload Test Data
            </Typography>
          )}

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
          />

          <form
            className="max-w-md border border-gray-200 rounded p-6 mx-auto"
            direction="col"
            spacing={3}
            justifyContent="space-between"
            onSubmit={handleOnSubmit}
          >
            {props.from != "dataop" && (
              <>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-name">Name</InputLabel>
                  <Input id="component-name" />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-email">Email</InputLabel>
                  <Input id="component-email" />
                </FormControl>
              </>
            )}

            <FormControl variant="standard">
              <InputLabel htmlFor="Media">X-ray</InputLabel>

              <Input
                accept="image/*"
                type="file"
                id="Media"
                name="Media"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </FormControl>

            <Button type="submit">Submit</Button>
          </form>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

        </Stack>
      </CardContent>
    </Card>
  );
};

FileUpload.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
