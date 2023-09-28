import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Chat_History } from "../../data";
import {useTheme} from "@mui/material/styles";
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg } from "./MsgType";
const Message = ({menu}) => {
    const theme = useTheme();
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el) => {
                   switch (el.type) {
                    case "divider":
                        //Timeline
                        return <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Divider width="46%" />
                              <Typography variant="caption" sx={{color: theme.palette.text}}>{el.text}</Typography>
                            <Divider width="46%" />
                        </Stack>;
                    case "msg":
                        switch (el.subtype) {
                            case "img":
                                return <MediaMsg el={el} menu={menu} />
                              
                            case "doc":
                                return <DocMsg el={el}  menu={menu}/>
                            case "link":
                                return <LinkMsg el={el}  menu={menu}/>
                            case "reply":
                                return <ReplyMsg el={el}  menu={menu}/>
                            default:
                                return <TextMsg el={el}  menu={menu}/>
                            
                        }
                        default:
                            return <></>;
                    }
                })}

            </Stack>
        </Box>
    );
};
export default Message;