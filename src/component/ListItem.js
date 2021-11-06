import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModalComp from "./Modal";
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';

const ListItemComp = (statement) => {
    const [sendModalData, setSendModalData] = useState();
    const [open, setOpen] = useState(false);
    const [Filter, setFilter] = useState("");
    const handleOpen = (e) => {
        setOpen(true)
        setSendModalData(e);
    };

    const handleClose = () => setOpen(false);

    const handleOnchange = (e) => {
        setFilter(e);
    }


    return (
        <Box>
            <TextField
                id="outlined-name"
                label="Search Data"
                sx={{ width: "100%" }}
                onChange={(e) => handleOnchange(e.target.value)}
            />
            <List>
                {statement.filter(val => val.title.toUpperCase().includes(Filter.toUpperCase())).map((_, index) =>
                    <Box key={index}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ArrowForwardIosIcon sx={{ color: "green" }} />
                                </ListItemIcon>
                                <CardHeader
                                    sx={{ padding: "10px 20px" }}
                                    title={_.title}
                                    subheader={
                                        <Box>
                                            Description {_.description} <br />
                                            Created At {_.createdAt}
                                        </Box>}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ModalComp open={open} handleOpen={() => handleOpen(_)} handleClose={handleClose} ModalData={sendModalData} />
                    </Box>
                )}
            </List>
        </Box>
    );
}

export default ListItemComp;