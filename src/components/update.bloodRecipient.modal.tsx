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
    recipient: IRecipient | null;
    setRecipient: (value: IRecipient | null) => void;
  }
  
  function UpdateBloodRecipientModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, recipient, setRecipient } = props;
  
    const [id, setId] = useState<number>(0);
    const [fullName, setFullName] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [bloodType, setBloodType] = useState<string>("");
    const [rhFactor, setRhFactor] = useState<string>("");
    const [requiredAmount, setRequiredAmount] = useState<number>(0);
  
    const formatDateToString = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      

    useEffect(() => {
      if (recipient && recipient.id) {
        setId(recipient.id);
        setFullName(recipient.fullName);
        setBirthDate(formatDateToString(new Date(recipient.birthDate)));
        setGender(recipient.gender);
        setAddress(recipient.address);
        setPhoneNumber(recipient.phoneNumber);
        setBloodType(recipient.bloodType);
        setRhFactor(recipient.rhFactor);
        setRequiredAmount(recipient.requiredAmount);
      }
    }, [recipient]);
  
    const handleSubmit = () => {
      // Kiểm tra điều kiện và gửi request cập nhật recipient
      if (!fullName || !birthDate || !gender || !address || !phoneNumber || !bloodType || !rhFactor || !requiredAmount) {
        toast.error("Vui lòng điền đầy đủ thông tin!");
        return;
      }
  
      fetch(`http://localhost:8000/blood-recipients/${id}`, {
        method: 'PUT',
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
          toast.success("Cập nhật thông tin recipient thành công!");
          handleCloseModal();
          // Gọi hàm setRecipient để cập nhật lại dữ liệu trong component cha
          setRecipient(null);
          // Gọi hàm mutate để refresh dữ liệu
          mutate("http://localhost:8000/blood-recipients");
        }
      });
    }
  
    const handleCloseModal = () => {
      // Reset state khi đóng modal
      setId(0);
      setFullName("");
      setBirthDate("");
      setGender("");
      setAddress("");
      setPhoneNumber("");
      setBloodType("");
      setRhFactor("");
      setRequiredAmount(0);
      setRecipient(null);
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
            <Modal.Title>Cập Nhật Thông Tin Người Nhận Máu</Modal.Title>
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
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nhóm Máu</Form.Label>
                <Form.Control
                  type="text"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Yếu Tố Rh</Form.Label>
                <Form.Control
                  type="text"
                  value={rhFactor}
                  onChange={(e) => setRhFactor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số Lượng Máu Cần</Form.Label>
                <Form.Control
                  type="number"
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
            <Button variant="primary" onClick={() => handleSubmit()}>Cập Nhật</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default UpdateBloodRecipientModal;
  