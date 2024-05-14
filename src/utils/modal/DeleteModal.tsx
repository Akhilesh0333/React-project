/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Image } from "react-bootstrap";
import close from "../../assets/close.png";
import alert from "../../assets/deleteIcon.png";
import Button from "../button/Button";
import { toast } from "react-toastify";

interface DeleteModalProps {
    show: boolean;
    onHide: () => void;
    name: any;
    id: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onHide, name, id }) => {
    const handleClose = () => {
        onHide();
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success("User successfully deleted")
                onHide();
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error: any) {
            toast.error("Error deleting user:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="modal-delete" centered>
            <div className="close-icon">
                <Image
                    src={close}
                    onClick={handleClose}
                    className="img-close"
                    alt="img"
                />
            </div>

            <Modal.Header className="border-bottom-0 justify-content-center">
                <Image src={alert} alt="img-add" />
            </Modal.Header>
            <Modal.Body className="text-center justify-content-center">
                <div className="mb-4">
                    <h2 className="text-center mb-2 text__modal">Are you Sure?</h2>
                </div>
                <div>
                    <p className="text-center mb-0 text_modal_para">You want to delete this <b>{name}</b> property?</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="border-top-0 justify-content-center">
                <Button
                    className="btn btn-danger"
                    type="button"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
