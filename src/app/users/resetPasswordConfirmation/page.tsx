"use client"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// ResetPasswordConfirmation.js
import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ResetPasswordConfirmation() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '', // Thêm trường xác nhận mật khẩu mới
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPasswordConfirmation = () => {
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và Mật khẩu xác nhận không trùng khớp");
      return;
    }
    // Gửi yêu cầu xác nhận mật khẩu mới đến server
    fetch('http://localhost:8000/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
          // Xử lý khi xác nhận mật khẩu mới thành công
          console.log('Password reset successful');
          toast.success('Password reset successful');
          window.location.href = '../users/login';
          // Redirect hoặc hiển thị thông báo thành công
        } else {
          console.error('Password reset failed');
          toast.error('Password reset failed');
          // Hiển thị thông báo lỗi
        }
      })
      .catch((error) => {
        console.error('Error resetting password:', error);
      });
  };

  return (
    <div>
      <h3>Reset Password Confirmation</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicOTP">
          <Form.Label>OTP</Form.Label>
          <Form.Control
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicNewPassword">
          <Form.Label>New Password</Form.Label>
          <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
              <InputGroup.Text>
                <Button variant="light" onClick={handleTogglePassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </Button>
              </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />
        </Form.Group>

        <Button variant="primary" onClick={handleResetPasswordConfirmation}>
          Confirm Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default ResetPasswordConfirmation;
