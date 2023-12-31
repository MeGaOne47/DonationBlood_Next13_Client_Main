/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { format } from 'date-fns';
// pages/donorList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, InputGroup, Col, Row } from 'react-bootstrap';
import Fuse from 'fuse.js';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface Donor {
  id: number;
  fullName: string;
  birthDate: string;
  gender: string;
  address: string;
  phoneNumber: string;
  bloodType: string;
  rhFactor: string;
}

const DonorListPage: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [selectedDonorIds, setSelectedDonorIds] = useState<number[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<string>('2023-12-01');
  const [appointmentTime, setAppointmentTime] = useState<string>('15:00');
  const [status, setStatus] = useState<string>('Scheduled');
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [donatedAmount, setDonatedAmount] = useState<number>(0);
  const [healthCheckResult, setHealthCheckResult] = useState<string>('');
  const currentDateTime = new Date();
  const formattedCurrentDateTime = format(currentDateTime, 'yyyy-MM-dd HH:mm:ss');
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState<boolean>(false);
  // console.log("donors",donors)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        console.log('accessTokenDonor',accessToken);
        if (!accessToken) {
          // Xử lý khi không có token, có thể đưa người dùng đến trang đăng nhập
          console.error('Access token is missing');
          return;
        }

        const response = await fetch('http://localhost:8000/donors', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          // Xử lý khi token hết hạn hoặc không hợp lệ
          console.error('Access token is invalid or expired');
          // Đặt người dùng về trang đăng nhập hoặc làm các xử lý khác
          window.location.href = '../../users/login';  
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setDonors(data);
        } else {
          console.error('Error fetching donor data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching donor data:', error);
      } finally {
        setIsLoading(false); // Kết thúc loading dù có lỗi hay không
      }
    };

    if (!searchTerm) {
      fetchData();
    }
    handleSearch(); 
  }, [searchTerm]);

  const handleCheckboxChange = (donorId: number) => {
    if (selectAll) {
        setSelectAll(false);
      }

    setSelectedDonorIds((prevSelectedDonorIds) => {
      if (prevSelectedDonorIds.includes(donorId)) {
        return prevSelectedDonorIds.filter((id) => id !== donorId);
      } else {
        return [...prevSelectedDonorIds, donorId];
      }
    });
  };

  const convertTo12HourFormat = (time24: string): string => {
    const [hour, minute] = time24.split(':');
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12; // Chuyển đổi giờ 24 về giờ 12
    return `${hour12}:${minute} ${period}`;
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedDonorIds(selectAll ? [] : donors.map((donor) => donor.id));
  };

  const handleSendEmail = async () => {
    try {
      // setIsConfirmButtonDisabled(false); // Tắt nút xác nhận hiến máu
      for (const selectedDonorId of selectedDonorIds) {
        const response = await fetch('http://localhost:8000/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            donor: {
              id: selectedDonorId,
            },
            appointmentDate,
            appointmentTime,
            status,
          }),
        });

        if (response.ok) {
          console.log(`Email sent successfully for donor with ID ${selectedDonorId}`);
          // Thêm logic cho trường hợp gửi email thành công
        } else {
          console.error(`Failed to send email for donor with ID ${selectedDonorId}`);
          // Xử lý khi gửi email thất bại
        }
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleSearch = () => {
    const fuse = new Fuse(donors, { keys: ['fullName'] });
    const result = fuse.search(searchTerm);
    const filteredDonors = result.map((item) => item.item);
  
    setDonors(filteredDonors);
  };

  const handleConfirmDonation = async (donorId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/donors/${donorId}/record-donation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationDate: formattedCurrentDateTime,
          donatedAmount,
          healthCheckResult,
        }),
      });
  
      if (response.ok) {
        console.log(`Donation confirmed for donor with ID ${donorId}`);
        toast.success(`Donation confirmed for donor with ID ${donorId}`);
        // Cập nhật danh sách hiến máu hoặc thực hiện các thao tác cần thiết
      } else {
        console.error(`Failed to confirm donation for donor with ID ${donorId}`);
        toast.error(`Failed to confirm donation for donor with ID ${donorId}`);
        // Xử lý khi xác nhận hiến máu thất bại
      }
      // Xác nhận thành công, cập nhật trạng thái để bật nút xác nhận hiến máu
      // setIsConfirmButtonDisabled(true);
    } catch (error) {
      console.error('Error confirming donation:', error);
      toast.error('Error confirming donation');
    }
  };
  
  
  

  return (
    <div>
      <h1>Danh Sách Người Hiến Máu</h1>
      <Form>
        <Row>
          <Col>
        <Form.Group className="mb-3" controlId="formAppointmentDate">
          <Form.Label>Ngày hẹn</Form.Label>
          <Form.Control
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAppointmentTime">
          <Form.Label>Giờ hẹn</Form.Label>
          <Form.Control
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
          <Form.Text className="text-muted">
            Hiển thị: {convertTo12HourFormat(appointmentTime)}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Control
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Tìm kiếm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSendEmail}>Gửi Email</Button>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formDonationDate">
          <Form.Label>Ngày hiến máu</Form.Label>
          <Form.Control
            type="text"
            value={formattedCurrentDateTime}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDonatedAmount">
          <Form.Label>Số lượng hiến máu (ml)</Form.Label>
          <Form.Control
            as="select"
            value={donatedAmount}
            onChange={(e) => setDonatedAmount(parseInt(e.target.value, 10))}
          >
            <option value="">Chọn số lượng hiến máu</option>
            <option value="250">250</option>
            <option value="300">300</option>
            <option value="350">350</option>
            <option value="400">400</option>
          </Form.Control>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formHealthCheckResult">
          <Form.Label>Kết quả kiểm tra sức khỏe</Form.Label>
          <Form.Control
            as="select"
            value={healthCheckResult}
            onChange={(e) => setHealthCheckResult(e.target.value)}
          >
            <option value="">Chọn kết quả kiểm tra sức khỏe</option>
            <option value="Good">Good</option>
            {/* Thêm các tùy chọn khác nếu cần */}
          </Form.Control>
        </Form.Group>

          </Col>
        </Row>

      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và Tên</th>
            <th>Ngày Sinh</th>
            <th>Giới Tính</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Nhóm Máu</th>
            <th>Yếu Tố Rh</th>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAll}
              />Tất cả
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr key={donor.id}>
              <td>{donor.id}</td>
              <td>{donor.fullName}</td>
              <td>{format(new Date(donor.birthDate), 'dd/MM/yyyy')}</td>
              <td>{donor.gender}</td>
              <td>{donor.address}</td>
              <td>{donor.phoneNumber}</td>
              <td>{donor.bloodType}</td>
              <td>{donor.rhFactor}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(donor.id)}
                  checked={selectedDonorIds.includes(donor.id)}
                />
              </td>
              <td>
                <Button 
                  variant="success" 
                  onClick={() => handleConfirmDonation(donor.id)}
                  // disabled={isConfirmButtonDisabled}
                >
                  Xác nhận hiến máu
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DonorListPage;
