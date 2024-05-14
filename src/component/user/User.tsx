import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Dropdown, Image } from "react-bootstrap";
import Loader from '../../utils/loader/Loader';
import Button from '../../utils/button/Button';
import AddUser from '../../utils/modal/AddUser';
import option from '../../assets/option.png';
import DeleteModal from '../../utils/modal/DeleteModal';
import EditUser from '../../utils/modal/EditUser';

// type define
interface UserData {
    id: number;
    address: {
        city: string;
    };
    name: string;
    username: string;
    email: string;
    city: string;
    phone: string;
}

const User: React.FC = () => {
    const [data, setData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showUserModal, setShowUserModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false); // State for showing edit modal
    const [editUserInfo, setEditUserInfo] = useState<UserData | null>(null); // State for holding user data to edit
    const [deleteInfo, setDeleteInfo] = useState<{ id: number | null, name: string | null }>({ id: null, name: null });

    // Fetch a user data
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const userData: UserData[] = await response.json();
                setData(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    //open Delete modal and passing a user name and id number
    const handleShowModal = (id: number, name: string) => {
        setDeleteInfo({ id, name });
    };

      // Open Edit modal
      const handleShowEditModal = (user: UserData) => {
        setEditUserInfo(user);
        setShowEditModal(true);
    };
    
    // close a delete modal
    const handleCloseModal = () => {
        setDeleteInfo({ id: null, name: null });
    };


    return (
        <Container>
            <Row className='mb-4 py-4'>
                <Col>
                    <h3><b>User</b></h3>
                </Col>
                <Col>
                    <Button
                        type="button"
                        className="btn btn-primary float-end"
                        onClick={() => setShowUserModal(true)}
                    >
                        Add User
                    </Button>
                </Col>
            </Row>

            {loading ? (
                <Loader />
            ) : (
                <div className='table_div'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Phone No</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address.city}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <Dropdown className='action_toggle'>
                                            <Dropdown.Toggle className="action_toggle">
                                                <Image src={option} alt="line" className='image' />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleShowEditModal(item)}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleShowModal(item.id, item.name)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* add and edit modal */}
            <AddUser
                show={showUserModal}
                onHide={() => setShowUserModal(false)}
            />

                 {/* Edit User modal */}
                 {editUserInfo && (
                <EditUser
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    userData={editUserInfo}
                />
            )}

            {/* Delete modal */}
            {deleteInfo.id !== null && (
                <DeleteModal show={true} onHide={handleCloseModal} id={deleteInfo.id} name={deleteInfo.name} />
            )}
        </Container>
    );
};

export default User;
