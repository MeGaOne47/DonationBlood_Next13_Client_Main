'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    managementAccount: IManagementAccount | null;
    setManagementAccount: (value: IManagementAccount | null) => void;
}

function UpdateManagementAccountModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, managementAccount, setManagementAccount } = props;

    const [id, setId] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [roles, setRoles] = useState<string>("");
    const [isLocked, setIsLocked] = useState<boolean>(false); 

    useEffect(() => {
        if (managementAccount && managementAccount.id) {
            setId(managementAccount.id);
            setUsername(managementAccount.username);
            setEmail(managementAccount.email);
            setRoles(managementAccount.roles);
            setIsLocked(managementAccount.isLocked);
        }
    }, [managementAccount])

    const handleSubmit = () => {
        if (!username) {
            toast.error("Please provide a username!");
            return;
        }
        if (!email) {
            toast.error("Please provide an email!");
            return;
        }

        fetch(`http://localhost:8000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, roles, isLocked })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Edit management account succeed!");
                    handleCloseModal();
                    mutate("http://localhost:8000/users");
                } 
            });

    }

    const handleCloseModal = () => {
        setUsername("");
        setEmail("");
        setRoles("");
        setIsLocked(false); 
        setManagementAccount(null);
        setShowModalUpdate(false);
    }

    return (
        <>
            <Modal
                show={showModalUpdate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update A Management Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Roles</Form.Label>
                            <Form.Control
                                as="select"
                                value={roles}
                                onChange={(e) => setRoles(e.target.value)}
                                >
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                        `    <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Is Locked"
                                    checked={isLocked}
                                    onChange={() => setIsLocked(!isLocked)}
                                />`
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()} >Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateManagementAccountModal;
