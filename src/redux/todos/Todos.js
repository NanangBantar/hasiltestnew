import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, selectTodos } from './todosSlice';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CachedIcon from '@mui/icons-material/Cached';

import ListItemComp from '../../component/ListItem';
import AddTodos from "../../component/AddTodos";

const Todos = () => {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch();
  const isCompleted = todos?.list.filter(val => val.status === 1).sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt) });
  const inOnprogres = todos?.list.filter(val => val.status === 0).sort(function (a, b) { return new Date(a.createdAt) - new Date(b.createdAt) });

  console.log(todos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <Box>
      <Card sx={{ maxWidth: "80%", margin: "50px auto" }}>
        <CardHeader
          sx={{ padding: "10px 20px" }}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="React Todo List With Redux"
          subheader="Hasil Test Majoo"
        />
        <AddTodos />
        <CardContent>
          <Divider />
          <Stack sx={{ marginTop: "10px" }} direction="row">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ mb: 1.5, textAlign: "center", fontWeight: "bold", display: "flex", justifyContent: "center" }}>
                  <CachedIcon sx={{ margin: "0 5px", color: "blue" }} /> On Progress
                </Typography>
                {ListItemComp(inOnprogres)}
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ mb: 1.5, textAlign: "center", fontWeight: "bold", display: "flex", justifyContent: "center" }}>
                  <CheckCircleOutlineIcon sx={{ margin: "0 5px", color: "green" }} /> Completed
                </Typography>
                {ListItemComp(isCompleted)}
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Todos;