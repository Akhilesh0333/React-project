import React from "react";
import { Modal, Form, Image } from "react-bootstrap";
import Button from "../button/Button";
import close from "../../assets/close.png";
import * as yup from 'yup';
import { Formik } from "formik";
import { phoneRegExp } from "../regix/Regex";

interface EditUserProps {
    show: boolean;
    onHide: () => void;
    userData: {
        id: number;
        name: string;
        username: string;
        email: string;
        address: {
            city: string;
        };
        phone: string;
    } | null;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    email: yup.string().email("Email must be a valid email").required('Email is a required field'),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required('Phone number is a required field'),
    username: yup.string().required('Username is a required field'),
    city: yup.string().required('City is a required field'),
});

const EditUser: React.FC<EditUserProps> = ({
    show,
    onHide,
    userData,
}) => {
    const handleClose = () => {
        onHide();
    };
    const handleSubmit = () => {
        console.log("submit data")
    }

    return (
        <Modal show={show} onHide={handleClose} className="modal-boots" centered>
            <div className="close-icon">
                <Image
                    src={close}
                    onClick={handleClose}
                    className="img-close"
                    alt="img"
                />
            </div>
            <Modal.Header className="border-bottom-0">
                <Modal.Title className="mx-auto">
                    <span className="header-modal">Edit User</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="agent_modal_body">
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        name: userData ? userData.name : '',
                        email: userData ? userData.email : '',
                        phone: userData ? userData.phone : '',
                        username: userData ? userData.username : '',
                        city: userData && userData.address ? userData.address.city : '', // Access city if address exists
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <Form.Group className="col-md-12 mb-3" controlId="title">
                                    <Form.Label className="label-modal">
                                        Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="name"
                                        className="form-input-modal font-weight-bold"
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="col-md-12 mb-3" controlId="title">
                                    <Form.Label className="label-modal">
                                        Username <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Username"
                                        className="form-input-modal font-weight-bold"
                                        isInvalid={!!errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="col-md-12 mb-3" controlId="title">
                                    <Form.Label className="label-modal">
                                        Email <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="form-input-modal font-weight-bold"
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="col-md-12 mb-3" controlId="title">
                                    <Form.Label className="label-modal">
                                        City <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="form-input-modal font-weight-bold"
                                        isInvalid={!!errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="col-md-12 mb-3" controlId="title">
                                    <Form.Label className="label-modal">
                                        Phone No<span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        placeholder="Phone number"
                                        className="form-input-modal font-weight-bold"
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div >
                                <Button
                                    className="btn btn-success"
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default EditUser;