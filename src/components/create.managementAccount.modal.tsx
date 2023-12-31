'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from "swr";

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function CreateManagementAccountModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!username) {
      toast.error("Please provide a username!");
      return;
    }
    if (!email) {
      toast.error("Please provide an email!");
      return;
    }

    fetch('http://localhost:8000/management-accounts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, roles, isLocked })
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success("Create new management account succeed!");
          handleCloseModal();
          mutate("http://localhost:8000/management-accounts");
        }
      });
  }

  const handleCloseModal = () => {
    setUsername("");
    setEmail("");
    setRoles("");
    setIsLocked(false);
    setShowModalCreate(false);
  }

  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Management Account</Modal.Title>
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
              <Form.Control type="text" placeholder="..."
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Locked"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()} >Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateManagementAccountModal;
