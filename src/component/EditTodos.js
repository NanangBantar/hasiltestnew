import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { updTodo } from '../redux/todos/todosSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const EditTodos = ({ backFromEdit, ModalData, handleClose }) => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        const data = new FormData(e.currentTarget);
        const form = e.currentTarget;
        e.preventDefault();
        handleClose();

        const formData = {
            id: ModalData.id,
            title: data.get("title"),
            description: data.get("description"),
            status: parseInt(data.get("status")),
            createdAt: moment().format('YYYY-MM-DD h:mm'),
        }

        dispatch(updTodo(formData));
    }

    return (
        <Box onSubmit={(e) => handleSubmit(e)} component="form">
            <TextField
                id="outlined-uncontrolled"
                label="Title"
                name="title"
                sx={{ margin: "10px" }}
                defaultValue={ModalData.title}
                required
            />
            <TextField
                id="outlined-uncontrolled"
                label="Description"
                name="description"
                sx={{ margin: "10px" }}
                defaultValue={ModalData.description}
                required
            />
            <FormControl sx={{ margin: "10px 20px" }} component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                    row
                    aria-label="status"
                    name="status"
                    defaultValue={ModalData.status}
                >
                    <FormControlLabel value={0} control={<Radio />} label="On Progress" />
                    <FormControlLabel value={1} control={<Radio />} label="Completed" />
                </RadioGroup>
            </FormControl>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button onClick={() => backFromEdit()} sx={{ margin: 1 }} variant="outlined" color="primary">Cancel</Button>
                <Button sx={{ margin: 1 }} type="submit" variant="contained">Submit</Button>
            </Typography>
        </Box>
    )
}

export default EditTodos;