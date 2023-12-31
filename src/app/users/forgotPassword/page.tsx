"use client"
// Trong component ForgotPassword
import { SetStateAction, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // Gửi yêu cầu đặt lại mật khẩu đến server
    fetch('http://localhost:8000/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.status === 201) {
          // Xử lý khi yêu cầu đặt lại mật khẩu thành công
          toast.success('Password reset request sent successfully');
          window.location.href = '../users/resetPasswordConfirmation';  
        } else {
          toast.error('Password reset request failed');
        }
      })
      .catch((error) => {
        toast.error('Error sending password reset request');
        console.error('Error sending password reset request:', error);
      });
  };
  

  return (
    <div>
      <h3>Forgot Password</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
