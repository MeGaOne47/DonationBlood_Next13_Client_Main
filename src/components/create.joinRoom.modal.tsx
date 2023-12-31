'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
}

function CreateJoinRoomModal(props: IProps) {
    const { showModalCreate, setShowModalCreate } = props;

    const [name, setName] = useState<string>("");
    const [maxParticipants, setMaxParticipants] = useState<number>(0);
    const [purpose, setPurpose] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [donationInstructions, setDonationInstructions] = useState<string>("");

    const handleSubmit = () => {
        // Kiểm tra điều kiện và gửi request tạo phòng tham gia
        if (!name || !maxParticipants || maxParticipants <= 0 || !purpose || !location || !donationInstructions) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        fetch('http://localhost:8000/rooms', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                maxParticipants,
                purpose,
                location,
                donationInstructions
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Tạo mới phòng tham gia thành công!");
                    handleCloseModal();
                    // Gọi hàm mutate để refresh dữ liệu
                    mutate("http://localhost:8000/rooms");
                }
            });
    }

    const handleCloseModal = () => {
        // Reset state khi đóng modal
        setName("");
        setMaxParticipants(0);
        setPurpose("");
        setLocation("");
        setDonationInstructions("");
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
                    <Modal.Title>Tạo Mới Phòng Tham Gia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Phòng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số Người Tối Đa</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="..."
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mục Đích</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa Chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hướng Dẫn Hiến Máu</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="..."
                                value={donationInstructions}
                                onChange={(e) => setDonationInstructions(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateJoinRoomModal;
