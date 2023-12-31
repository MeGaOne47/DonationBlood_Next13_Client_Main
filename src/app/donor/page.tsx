"use client"
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

const CreateDonorProfile = () => {
  const [donor, setDonor] = useState({
    fullName: '',
    birthDate: '',
    gender: '',
    address: '',
    phoneNumber: '',
    bloodType: '',
    rhFactor: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setDonor((prevDonor) => ({
      ...prevDonor,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
        const accessToken = Cookies.get('accessToken');
        console.log("accessToken: " ,accessToken)
      // Gọi API để tạo hồ sơ người dùng
      const response = await fetch('http://localhost:8000/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(donor),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        // Xử lý sau khi tạo thành công
        window.location.href = '../donor/displayDonor';
      } else {
        // Xử lý lỗi
        console.error('Error creating donor profile');
      }
    } catch (error) {
      console.error('Error creating donor profile', error);
    }
  };

  return (
    <div>
      <h2>Create Donor Profile</h2>
      <Form>
        <FormGroup>
          <Form.Label>Full Name</Form.Label>
          <FormControl
            type="text"
            name="fullName"
            value={donor.fullName}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Birth Date</Form.Label>
          <FormControl
            type="date"
            name="birthDate"
            value={donor.birthDate}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Gender</Form.Label>
          <FormControl
            as="select"
            name="gender"
            value={donor.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <Form.Label>Address</Form.Label>
          <FormControl
            type="text"
            name="address"
            value={donor.address}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Phone Number</Form.Label>
          <FormControl
            type="text"
            name="phoneNumber"
            value={donor.phoneNumber}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Blood Type</Form.Label>
          <FormControl
            as="select"
            name="bloodType"
            value={donor.bloodType}
            onChange={handleChange}
          >
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>

          </FormControl>
        </FormGroup>

        <FormGroup>
          <Form.Label>Rh Factor</Form.Label>
          <FormControl
            as="select"
            name="rhFactor"
            value={donor.rhFactor}
            onChange={handleChange}
          >
            <option value="Male">+</option>
            <option value="Female">-</option>
          </FormControl>
        </FormGroup>

        <Button variant="primary" onClick={handleSubmit}>
          Create Donor Profile
        </Button>
      </Form>
    </div>
  );
};

export default CreateDonorProfile;
