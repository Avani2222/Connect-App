import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider,
  Badge,
  Avatar,
} from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../../data";
import {styled} from "@mui/material/styles";


import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search/Index.js";
import { faker } from "@faker-js/faker";
import CreateGroup from "../../Sections/main/CreateGroup";
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const ChatElement = ({id, name, img, msg, time, unread, online}) => {
    const theme= useTheme();
    
    return (
        <Box sx={{
            width: "100%",
           
            borderRadius: 1,
            backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default,
        }}
            p={2}
        >
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2}>
                    {online ?
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                    >
                        <Avatar src={faker.image.avatar()} />
                    </StyledBadge>: <Avatar src={faker.image.avatar()} />}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">
                           {name}
                        </Typography>
                        <Typography variant="caption">
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack  spacing={2} alignItems="center">
                     <Typography sx={{fontWeight: 600}} variant="caption">
                        {time}
                     </Typography>
                     <Badge color="primary" badgeContent={unread} >
                     </Badge>
                     
                </Stack >
            </Stack>


        </Box>
    )
}

const Group = () => {
  
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
      setOpenDialog(false);
    }
    const handleOpenDialog = () => {
      setOpenDialog(true);
    }
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}

        <Box
          sx={{
           

            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
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
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={() => {
                setOpenDialog(true);
              }}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    Pinned
                  </Typography>
                  {/* Chat List */}
                  {ChatList.filter((el) => el.pinned).map((el) => {
                    return <ChatElement {...el} />;
                  })}
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    All Groups
                  </Typography>
                  {/* Chat List */}
                  {ChatList.filter((el) => !el.pinned).map((el) => {
                    return <ChatElement {...el} />;
                  })}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  );
};

export default Group;