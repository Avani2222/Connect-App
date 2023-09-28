import React from "react";
import {
  Box,
  Badge,
  Stack,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  ArrowDownLeft,
  ArrowUpRight,
  VideoCamera,
  Phone,
} from "phosphor-react";
import { useDispatch } from "react-redux";

import { faker } from "@faker-js/faker";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const CallLogElement = ({ img, name, incoming, missed, online, id }) => {
  const theme = useTheme();

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.default,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}  />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}  />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
            <Stack spacing={1} alignItems="center" direction={"row"}>
              {incoming ? (
                <ArrowDownLeft color={missed ? "red" : "green"} />
              ) : (
                <ArrowUpRight color={missed ? "red" : "green"} />
              )}
              <Typography variant="caption">Yesterday 21:24</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Phone />

          <VideoCamera />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const CallElement = ({ img, name, id, handleClose }) => {

  const theme = useTheme();

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
          <Stack spacing={0.3} alignItems="center" direction={"row"}>
            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={() => {
            
              handleClose();
            }}
          >
            <Phone style={{ color: theme.palette.primary.main }} />
          </IconButton>

          <IconButton
            onClick={() => {
              
              handleClose();
            }}
          >
            <VideoCamera style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { CallLogElement, CallElement };