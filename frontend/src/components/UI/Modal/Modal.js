import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const Modal = (props) => {
    return (
        <div >
            <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
                <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
                <DialogContent >
                    {props.children}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Modal;