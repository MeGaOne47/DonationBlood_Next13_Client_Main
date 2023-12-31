'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
    showModalJoinRoom: boolean;
    setShowModalJoinRoom: (value: boolean) => void;
    joinRoom: IJoonRoom | null;
    setJoinRoom: (value: IJoonRoom | null) => void;
}

function JoinRoomModal(props: IProps) {
    const { showModalJoinRoom, setShowModalJoinRoom, joinRoom, setJoinRoom } = props;

    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [maxParticipants, setMaxParticipants] = useState<number>(0);
    const [purpose, setPurpose] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [donationInstructions, setDonationInstructions] = useState<string>("");

    useEffect(() => {
        if (joinRoom && joinRoom.id) {
            setId(joinRoom.id);
            setName(joinRoom.name);
            setMaxParticipants(joinRoom.maxParticipants);
            setPurpose(joinRoom.purpose);
            setLocation(joinRoom.location);
            setDonationInstructions(joinRoom.donationInstructions);
        }
    }, [joinRoom])

    const handleSubmit = () => {
        if (!name) {
            toast.error("Please enter the room name!");
            return;
        }
        if (!maxParticipants || maxParticipants <= 0) {
            toast.error("Please enter a valid maximum number of participants!");
            return;
        }

        // Add additional validations as needed

        const updatedRoom = {
            id,
            name,
            maxParticipants,
            purpose,
            location,
            donationInstructions
        };

        // Perform the PUT request to update the room
        fetch(`http://localhost:8000/rooms/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRoom)
        })
        .then(res => res.json())
        .then(res => {
            if (res) {
                toast.success("Room updated successfully!");
                handleCloseModal();
                mutate("http://localhost:8000/rooms");
            } else {
                toast.error("Failed to update room. Please try again.");
            }
        });
    }

    const handleCloseModal = () => {
        setName("");
        setMaxParticipants(0);
        setPurpose("");
        setLocation("");
        setDonationInstructions("");
        setJoinRoom(null);
        setShowModalJoinRoom(false);
    }

    return (
        <>
            <Modal
                show={showModalJoinRoom}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Join a Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Room Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter room name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Maximum Participants</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter maximum participants..."
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Purpose</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the purpose of the room..."
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the location of the room..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Donation Instructions</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter donation instructions..."
                                value={donationInstructions}
                                onChange={(e) => setDonationInstructions(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default JoinRoomModal;
