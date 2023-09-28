import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search/Index";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { CallList, MembersList } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../redux/slices/app";
import {faker} from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
 
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"Start New Conversation"}</DialogTitle>
      <Stack p={1} sx={{ width: "100%" }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> 
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {MembersList.map((el) => {
              return <CallElement {...el} handleClose={handleClose} />;
            })}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;