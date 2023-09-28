import React from "react";
import { faker } from "@faker-js/faker";
import { styled } from "@mui/material/styles";
import { Stack, Box, Avatar, Badge, Typography, IconButton, Divider, TextField, InputAdornment, Link, Fab, Tooltip, Menu, MenuItem } from "@mui/material";
import { MagnifyingGlass, Phone, VideoCamera, CaretDown, LinkSimple, Smiley, PaperPlaneTilt, Image, DownloadSimple, Sticker, Camera, File, DotsThreeVertical } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { Chat_History, Message_options } from "../../data";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";
import Message from "./Message";
const MessageOptions = () =>{
    const [anchorEl, setAnchorEl]=React.useState(null);
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
           aria-expanded={open ? 'true': undefined}
           onClick={handleClick}
           size={20}/>
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
const Actions=[
     {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
     },
     {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
     },
     {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
     },
     {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
     },
     {
        color: "#013f7f",
        icon: <File size={24} />,
        y: 382,
        title: "Contact",
     },
];
const ChatInput = ({setOpenPicker}) => {
    const [openActions, setopenActions]= React.useState(false);
    return (
      <StyledInput
        fullWidth
        placeholder="Type a message"
        variant="filled"
        InputProps={{
            disableUnderline: true,
            startAdornment:
            <Stack sx={{ width: "max-content"}}>
                <Stack sx={{ position: "relative", display: openActions ? "inline-block" : "none"}}>
                  {Actions.map((el)=> (
                    <Tooltip placement="right" title={el.title}>
                    <Fab sx={{position:"absolute", top: -el.y, backgroundColor: el.color}}>{el.icon}</Fab>
                    </Tooltip>
                  ))}
                </Stack>
               <InputAdornment>
               <IconButton onClick={()=>{
                   setopenActions((prev)=>!prev)
               }}>
                <LinkSimple/>
               </IconButton>
               </InputAdornment>
            </Stack>,
            endAdornment:
            <InputAdornment>
            <IconButton 
                onClick={() => {
                setOpenPicker((prev)=>!prev);
                }}
            >
             <Smiley/>
            </IconButton>
            </InputAdornment>,
        }}/>
    )
}
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
const LinkMsg = ({el}) => {
    const theme= useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{backgroundColor: el.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5,
            width: "max-content", }}>
              <Stack spacing={2}>
                <Stack p={2} spacing={3} alignItems="start" sx={{backgroundColor: theme.palette.background.paper, borderRadius: 1}}>
                    <img src={el.preview} alt={el.message} style={{maxHeight: 210, borderRadius: "10px"}}/>
                    <Stack spacing={2}>
                        <Typography variant="subtitle2">I Love Chat App</Typography>
                        <Typography variant="subtitle2" sx={{color: theme.palette.primary.main}} component={Link}
                        to="//https://www.youtube.com">www.youtube.com</Typography>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text: "#fff"}>
                        {el.message}
                    </Typography>
                </Stack>
              </Stack>
            </Box>
            <MessageOptions />
        </Stack>
    )
}
const ReplyMsg=({el}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{backgroundColor: el.incoming ? theme.palette.background.default : theme.palette.primary.main, borderRadius: 1.5,
            width: "max-content", }}>
                <Stack spacing={2}>
              <Stack p={2} direction="colomn" spacing={3} alignItems="center" sx={{backgroundColor: theme.palette.background.paper, borderRadius: 1}}>
                <Typography variant="body2" color={theme.palette.text}>{el.message}</Typography>
                </Stack>
                <Typography
                  variant="body2"
                  color={el.incoming ? theme.palette.text : "#fff"}
                >
                    {el.reply}
                </Typography>
              </Stack>
            </Box>
            <MessageOptions />
        </Stack>
    )
}
const MediaMsg = ({el}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{backgroundColor: el.incoming ? theme.palette.background.paper : theme.palette.primary.main, borderRadius: 1.5,
            width: "max-content", }}>
                <Stack spacing={1}>
                    <img src={el.img} alt={el.message} style={{maxHeight:210, borderRadius: "10px"}}/>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            <MessageOptions />
        </Stack>
    )
}
const TextMsg = ({el}) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{backgroundColor: el.incoming ? theme.palette.background.paper : theme.palette.primary.main, borderRadius: 1.5,
            width: "max-content", }}>
             <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                {el.message}
             </Typography>
            </Box>
           <MessageOptions />
        </Stack>
    )
}
const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}));
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
const Conversation = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [openPicker, setOpenPicker] = useState();
    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
            {/* Chat Header */}
            <Box
                p={2}
                sx={{
                    height: 100,
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack alignItems={"center"} direction="row" justifyContent={"space-between"} sx={{ width: "100%", height: "100%" }}>
                    <Stack onClick={() =>{
                        dispatch(ToggleSidebar());
                    }}
                        direction={"row"} spacing={2}>
                        <Box>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                variant="dot"
                            >
                                <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
                            </StyledBadge>

                        </Box>
                        <Stack spacing={0.2}>
                            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
                            <Typography variant="caption">Online</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems={"center"} spacing={3}>
                        <IconButton>
                            <VideoCamera />
                        </IconButton>
                        <IconButton>
                            <Phone />
                        </IconButton>
                        <IconButton>
                            <MagnifyingGlass />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton>
                            <CaretDown />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
            {/* Msg */}
            <Box width={"100%"} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%"}}>
               <Message menu={true}/>
            </Box>
            {/* Chat Footer*/}
            <Box p={2} sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", }}>
                <Stack direction="row" alignItems={"center"} spacing={3}>
                    {/*ChatInput*/}
                    <Stack sx={{width: "100%"}}>
                        <Box sx={{display: openPicker ? "inline" : "none" , zIndex: 10, position: "fixed", bottom: 81, right:100}}>
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                        </Box>
                        <ChatInput setOpenPicker={setOpenPicker}/>
                        
                    </Stack>
                    
                    <Box sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                        <Stack sx={{ height: "100%", width: "100%" }} alignItems="center" justifyContent="center">
                            <IconButton>
                                <PaperPlaneTilt color="#fff" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
};
export default Conversation;