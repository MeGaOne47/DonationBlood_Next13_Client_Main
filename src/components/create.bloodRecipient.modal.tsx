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
  
  function CreateBloodRecipientModal(props: IProps) {
    const { showModalCreate, setShowModalCreate } = props;
  
    const [fullName, setFullName] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [bloodType, setBloodType] = useState<string>("");
    const [rhFactor, setRhFactor] = useState<string>("");
    const [requiredAmount, setRequiredAmount] = useState<number>(0);
  
    const handleSubmit = () => {
      // Kiểm tra điều kiện và gửi request tạo recipient
      if (!fullName || !birthDate || !gender || !address || !phoneNumber || !bloodType || !rhFactor || !requiredAmount) {
        toast.error("Vui lòng điền đầy đủ thông tin!");
        return;
      }
  
      fetch('http://localhost:8000/blood-recipients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          birthDate,
          gender,
          address,
          phoneNumber,
          bloodType,
          rhFactor,
          requiredAmount
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res) {
          toast.success("Thêm mới recipient thành công!");
          handleCloseModal();
          // Gọi hàm mutate để refresh dữ liệu
          mutate("http://localhost:8000/blood-recipients");
        }
      });
    }
  
    const handleCloseModal = () => {
      // Reset state khi đóng modal
      setFullName("");
      setBirthDate("");
      setGender("");
      setAddress("");
      setPhoneNumber("");
      setBloodType("");
      setRhFactor("");
      setRequiredAmount(0);
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
            <Modal.Title>Thêm Mới Người Nhận Máu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="..."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ngày Sinh</Form.Label>
                <Form.Control
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giới Tính</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="..."
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nhóm Máu</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="..."
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Yếu Tố Rh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="..."
                  value={rhFactor}
                  onChange={(e) => setRhFactor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số Lượng Máu Cần</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="..."
                  value={requiredAmount}
                  onChange={(e) => setRequiredAmount(Number(e.target.value))}
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
  
  export default CreateBloodRecipientModal;
  