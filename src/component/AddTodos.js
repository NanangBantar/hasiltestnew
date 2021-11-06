import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import { add } from '../redux/todos/todosSlice';
import TextField from '@mui/material/TextField';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from '../redux/todos/todosSlice';
import moment from 'moment';

const AddTodos = () => {
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch();
    const [sendAlert, setSendAlert] = useState(false);

    const AddTodoRedux = (statement) => {
        dispatch(
            add(statement)
        );
        setSendAlert(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const form = e.currentTarget;

        const formData = {
            id: Math.max.apply(Math, todos.list.map(val => val.id)) + 1,
            title: data.get("title"),
            description: data.get("description"),
            status: parseInt(data.get("status")),
            createdAt: moment().format('YYYY-MM-DD h:mm'),
        }

        form.reportValidity() ?
            AddTodoRedux(formData)
            :
            setSendAlert(true);
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}><ControlPointIcon sx={{ margin: "0px 5px", color: "blue" }} /> Add Todo</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Alert sx={{ display: sendAlert ? "flex" : "none" }} severity="error">Missing Some Input</Alert>
                <Box onSubmit={(e) => handleSubmit(e)} noValidate sx={{ display: "flex", flexDirection: "column" }} component="form">
                    <TextField
                        id="outlined-uncontrolled"
                        label="Title"
                        name="title"
                        sx={{ margin: "10px" }}
                        required
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Description"
                        name="description"
                        sx={{ margin: "10px" }}
                        required
                    />
                    <FormControl sx={{ margin: "10px 20px" }} component="fieldset">
                        <FormLabel component="legend">Status</FormLabel>
                        <RadioGroup
                            row
                            aria-label="status"
                            name="status"
                            defaultValue={0}
                        >
                            <FormControlLabel value={0} control={<Radio />} label="On Progress" />
                            <FormControlLabel value={1} control={<Radio />} label="Completed" />
                        </RadioGroup>
                    </FormControl>
                    <Button sx={{ marginBottom: "10px" }} type="submit" variant="contained">Contained</Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default AddTodos;