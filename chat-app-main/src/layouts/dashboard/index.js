import React, { useState } from "react";
import { Box, Stack, IconButton, Divider, Avatar, Switch, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Gear } from "phosphor-react";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/bird.ico";
import { faker } from '@faker-js/faker';
import { Nav_Buttons, Profile_Menu } from "../../data";
import useSettings from "../../hooks/useSettings"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/slices/auth";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { showSnackbar } from "../../redux/slices/app";
const isAuthenticated = false;
const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";
    default:
      break;
  }
}
const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      return "/auth/login";

    default:
      break;
  }
}
const DashboardLayout = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  console.timeLog(theme);
  const { onToggleMode } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);


  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { isLoggedIn } = useSelector((state) => state.auth);

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {

    if(isLoggedIn){
      window.onload = function() {
        if(!window.location.hash){
           window.location = window.location + '#loaded';
           window.location.reload();
        }
      }

      window.onload();
      if(!socket){
        connectSocket(user_id);
      }
      
      socket.on("new_friend_request",(data) => {
        dispatch(showSnackbar({severity:"success", message: data.message}));
      });
      
      socket.on("request_accepted",(data) => {
        dispatch(showSnackbar({severity:"success", message: data.message}));
      });
      
      socket.on("request_sent",(data) => {
        dispatch(showSnackbar({severity:"success", message: data.message}));
      });
    }

    return () =>{
      socket.off("new_riend_request");
      socket.off("request_accepted");
      socket.off("request_sent");
    }

  },[isLoggedIn,socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Stack direction="row">
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.default,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          width: "100",
        }}
      >
        <Stack direction="column" alignItems={"center"} justifyContent="space-between" sx={{ height: "100%" }} spacing={3}>
          <Stack alignItems={"center"} spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 35,
                width: 35,
                borderRadius: 2,
              }}
            >
              <img src={Logo} alt={"Chat App Logo"} />
            </Box>
            <Stack sx={{ width: "32px" }} direction="column" alignItems="center" spacing={3}>
              {Nav_Buttons.map((el, index) => (
                el.index === selected ?
                  <Box
                    p={1}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 2,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={el.index}
                    >
                      {el.icon}
                    </IconButton>
                  </Box>
                  : <IconButton
                    onClick={() => {
                      setSelected(el.index);
                      navigate(getPath(el.index));
                    }}
                    sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>

              ))}
              <Divider sx={{ width: "100%" }} />
              {selected === 3 ?
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 2,
                  }}
                >
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
                    <Gear />
                  </IconButton>
                </Box>

                : <IconButton onClick={() => {
                  setSelected(3);
                  navigate(getPath(3));
                }}
                  sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}
                >
                  <Gear />
                </IconButton>
              }
            </Stack>

          </Stack>
          <Stack alignItems="center" spacing={4}>
            <Switch onChange={() => {
              onToggleMode();
            }} defaultChecked />
            <Avatar id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick} src={faker.image.avatar()} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((el, idx) => (
                  <MenuItem onClick={() => {
                    handleClick(); //navigate(getMenuPath(idx));   
                  }}>
                    <Stack onClick={() => {
                      if (idx === 2) {
                        dispatch(LogoutUser());
                      }
                      else {
                        navigate(getMenuPath(idx));
                      }
                    }}
                      sx={{ width: 100 }} direction="row" alignItems={"center"} justifyContent="space-between">
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>{" "}

                  </MenuItem>
                ))}
              </Stack>
            </Menu>
          </Stack>

        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
