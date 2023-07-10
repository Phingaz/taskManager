import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'
import styled from "./Modal.module.css"

export default function BasicModal({ settings }) {

    const navigate = useNavigate()
    
    const [open, setOpen] = React.useState(settings.state)
    
    const handleHome = () => {
        setOpen(false)
        navigate("/")
    }

    const handleLogin = () => {
        setOpen(false)
        navigate("/login")
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={styled.modal}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box className={styled.info}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {settings.message.message}
                    </Typography>
                </Box>
            </Modal>
            <div className={styled.btns}>
                <button onClick={handleHome}>Home</button>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}