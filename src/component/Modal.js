import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { del, updStatus } from '../redux/todos/todosSlice';
import { useDispatch } from 'react-redux';

import EditTodos from "./EditTodos";


const ModalComp = ({ open, handleClose, handleOpen, ModalData }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleDelete = (e) => {
        dispatch(del(e));
        handleClose();
    }

    const handleUpdate = (e) => {
        dispatch(updStatus(e));
        handleClose();
    }

    const backFromEdit = () => {
        setEdit(false);
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleOpen}>Open</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {edit ?
                        <EditTodos backFromEdit={backFromEdit} ModalData={ModalData} handleClose={handleClose} />
                        :
                        (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {ModalData?.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {ModalData?.description}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {ModalData?.createdAt}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <Button onClick={() => setEdit(true)} sx={{ margin: 1 }} variant="outlined" color="primary">Edit</Button>
                                    <Button onClick={() => handleUpdate(ModalData?.id)} variant="outlined" color="success" disabled={ModalData?.status == "1" ? true : false}>Move To Completed</Button>
                                    <Button onClick={() => handleDelete(ModalData?.id)} sx={{ margin: 1 }} variant="outlined" color="warning" disabled={ModalData?.status == "1" ? true : false}>Delete</Button>
                                </Typography>
                            </>
                        )
                    }
                </Box>
            </Modal>
        </Box>
    )
}

export default ModalComp;