/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import ButtonLoading from '@/components/btnLoading.modal';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const DisplayDonor = () => {
  const [donor, setDonor] = useState<IDonor | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [donationHistory, setDonationHistory] = useState<IDonationHistory[] | null>(null);
  const [apiCalled, setApiCalled] = useState(false);
  
  const fetchUserProfile = async (accessToken: any) => {
    try {
      const profileResponse = await fetch('http://localhost:8000/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUserData(profileData);

        const donorId = profileData.donor.id;

        const [donorDetails, donationHistory] = await Promise.all([
          fetchDonorDetails(donorId),
          fetchDonationHistory(donorId),
        ]);

        setDonor(donorDetails);
        setDonationHistory(donationHistory);
        setApiCalled(true);
      } else {
        console.error('Error retrieving user profile');
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error);
    }
  };

  const fetchDonorDetails = async (donorId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/donors/${donorId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error fetching donor details');
      }
    } catch (error) {
      console.error('Error fetching donor details', error);
    }
  };

  const fetchDonationHistory = async (donorId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/donation-history/by-donor/${donorId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error fetching donation history');
      }
    } catch (error) {
      console.error('Error fetching donation history', error);
    }
  };

  const fetchProfileImage = async (userId: number) => {
    try {
      const imageResponse = await fetch(`http://localhost:8000/users/${userId}/profile-image`);
      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfileImage(imageUrl);
      } else {
        console.error('Error fetching profile image');
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImageUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(`http://localhost:8000/users/${userData?.id}/profile-image`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
          toast.success('Image uploaded successfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          fetchProfileImage(donor?.id || 0);
          window.location.href = '../donor/displayDonor';
        } else {
          console.error('Image upload failed');
          toast.error('Image upload failed', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken && !userData) {
      fetchUserProfile(accessToken);
    }
  }, [fetchUserProfile, apiCalled]); // Chỉ gọi khi userData thay đổi

  if (!donor) {
    return <ButtonLoading />;
  }

  return (
    <div>
      <Row>
        <Col xs={4}>
          <h2>Donor Details</h2>
          <Card>
            <Card.Body>
              {/* <Card.Title>{donor?.id}</Card.Title> */}
              <Card.Title>{donor?.fullName}</Card.Title>
                <Card.Text>
                    <strong>Birth Date:</strong> {donor?.birthDate ? new Date(donor?.birthDate).toDateString() : 'N/A'}<br />
                    <strong>Gender:</strong> {donor?.gender}<br />
                    <strong>Address:</strong> {donor?.address}<br />
                    <strong>Phone Number:</strong> {donor?.phoneNumber}<br />
                    <strong>Blood Type:</strong> {donor?.bloodType}<br />
                    <strong>Rh Factor:</strong> {donor.rhFactor}<br />
                    <strong>Email:</strong> {userData?.email}<br />
                </Card.Text> 
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <h2>Donation History</h2>
          <Card>
            <ListGroup variant="flush">
              {donationHistory && donationHistory.map((historyItem) => (
                <ListGroup.Item key={historyItem.id}>
                  <strong>Donation Date:</strong> {historyItem.donationDate
                    ? format(new Date(historyItem.donationDate), 'dd/MM/yyyy')
                    : 'N/A'}
                  <br />
                  <strong>Donated Amount:</strong> {historyItem.donatedAmount} <strong>ml</strong><br />
                  <strong>Health Check Result:</strong> {historyItem.healthCheckResult}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col xs={2}>
          <h2>Avatar</h2>
          <Card>
            <Card.Body>
            <div style={{ textAlign: 'center'}}>
              <img
                src={`http://localhost:8000/users/${userData?.id}/profile-image`}
                alt={`Profile of ai`}
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
              <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Choose a new image</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleImageUpload}>
                  Upload Image
                </Button>
            </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DisplayDonor;