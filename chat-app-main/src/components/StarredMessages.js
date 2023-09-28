import { Box, Grid, IconButton, Menu, MenuItem, Stack, Tab, Tabs, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";
import { CaretLeft, DotsThreeVertical, DownloadSimple, Image, X } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { Message_options, SHARED_DOCS, SHARED_LINKS } from "../data";
import Message from "./Conversation/Message";
const DocMsg =({el}) => {
    const theme= useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{backgroundColor: el.incoming ? theme.palette.background.paper : theme.palette.primary.main, borderRadius: 1.5,
            width: "max-content", }}>
              <Stack spacing={2}>
                   <Stack p={2} direction="row" spacing={3} alignItems="center" sx={{backgroundColor: theme.palette.background.default,
                borderRadius: 1,}}>
                    <Image size={48}/>
                    <Typography variant="caption">Abstract.png</Typography>
                    <IconButton>
                        <DownloadSimple/>
                    </IconButton>
                    </Stack>
                        <Typography variant="body2" sx={{color: el.incoming ? theme.palette.primary.text : "#fff"}}>{el.message}</Typography>
        
                   
              </Stack>
            </Box>
            <MessageOptions />
            </Stack>
    )
}
const MessageOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <DotsThreeVertical id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size={20} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((el) => (
                        <MenuItem onClick={handleClick}>{el.title}</MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    )
}
const LinkMsg = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5,
                width: "max-content",
            }}>
                <Stack spacing={2}>
                    <Stack p={2} spacing={3} alignItems="start" sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <img src={el.preview} alt={el.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">I Love Chat App</Typography>
                            <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }} component={Link}
                                to="//https://www.youtube.com">www.youtube.com</Typography>
                        </Stack>
                        <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                            {el.message}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            <MessageOptions />
        </Stack>
    )
}
const StarredMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: 320, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                }}>
                    <Stack sx={{ height: "100%", p: 2 }} direction="row" alignItems={"center"} spacing={3}>
                        <IconButton onClick={() => {
                            dispatch(UpdateSidebarType("CONTACT"));
                        }}>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant="subtitle2">Starred Messages</Typography>

                    </Stack>
                </Box>
                {/* Body */}
                <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll", }} p={3} 
                spacing={3}>
                   <Message />
                </Stack>

            </Stack>

        </Box>
    )
}
export default StarredMessages;

