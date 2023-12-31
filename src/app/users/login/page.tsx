/* eslint-disable react/jsx-no-undef */
"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Đảo ngược giá trị hiện tại của showPassword
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      // Validation failed, display an error toast
      toast.error('Please fill in all the fields', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.error('Login failed');
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        // Store the access token in local storage
        // localStorage.setItem('accessToken', data.access_token);
        // console.log(">> Access_token:", data);
        Cookies.set('accessToken', data.access_token);
        Cookies.set('refreshToken', data.refresh_token);
        console.log(">> Cookie data:", data);
        Cookies.set('isLoggedIn', 'true');
        Cookies.set('user', JSON.stringify(data));
        // Show a success toast
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 3000, // Auto close the notification after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Call a function to retrieve the user profile data
        fetchUserProfile(data.access_token);
      })
      .catch((error) => {
        // Show an error toast
        toast.error('Login failed. Please check your credentials.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Handle token expiration by refreshing the token
        if (error.message === 'Login failed' && error.status === 401) {
          handleRefreshToken();
        }

        console.error('Error:', error);
      });
  };

  const fetchUserProfile = (accessToken: any) => {
    fetch('http://localhost:8000/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((profileResponse) => {
        if (profileResponse.status === 200) {
          return profileResponse.json();
        } else {
          console.error('Error retrieving user profile');
          throw new Error('Error retrieving user profile');
        }
      })
      .then((profileData) => {
        console.log("User Profile Data:", profileData);
        
        if (profileData.donor) {
          // Nếu có hồ sơ, điều hướng đến trang chính của hồ sơ
          window.location.href = '../donor/displayDonor';
        } else {
          // Nếu chưa có hồ sơ, điều hướng đến trang tạo hồ sơ
          window.location.href = '../donor';
        }
      })
      .catch((error) => {
        console.error('Error retrieving user profile:', error);
      });
  };
  

  const handleRefreshToken = () => {
    const refreshToken = Cookies.get('refreshToken');
  
    fetch('http://localhost:8000/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.error('Refresh token failed');
          throw new Error('Refresh token failed');
        }
      })
      .then((data) => {
        // Cập nhật access token mới
        Cookies.set('accessToken', data.access_token);
        console.log(">> Refreshed Access_token:", data.access_token);
  
        // Gọi lại hàm để lấy thông tin người dùng
        fetchUserProfile(data.access_token);
      })
      .catch((error) => {
        // Show an error toast
        toast.error('Refresh token failed. Please log in again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        console.error('Error refreshing token:', error);
      });
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <div className="col-md-6" style={{ border: '2px solid #000', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Login</h3>
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
                autoComplete="current-email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                />
                <InputGroup.Text>
                  <Button variant="light" onClick={handleTogglePassword}>
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <ButtonGroup style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0'}}>
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>

              <Button variant="danger">
                <Link href="register" style={{ textDecoration: 'none', color: 'white' }}>
                  Back to Register
                </Link>
              </Button>

              {/* <Button variant="info" onClick={handleRefreshToken}>
                Refresh Token
              </Button> */}

              <Button variant="success">
                <Link href="forgotPassword" style={{ textDecoration: 'none', color: 'white' }}>
                  Forgot Password?
                </Link>
              </Button>

            </ButtonGroup>

          </Form>
          <ToastContainer />
        </div>
    </div>
  );
}

export default Login;


