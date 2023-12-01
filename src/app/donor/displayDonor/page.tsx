"use client"
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

interface IProps {
  donors: IDonor[];
}

const DisplayDonor = (props: IProps) => {
  const { donors } = props;
  const { id } = useParams();
  const [donor, setDonor] = useState<IDonor | null>(null);
  const [userData, setUserData] = useState(null);

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
        setUserData(profileData);

        // Lấy donorId từ userProfileData
        const donorId = profileData.donor;
        console.log("donorId",donorId);
        // Gọi API để lấy thông tin chi tiết của donor theo donorId
        const fetchDonorDetails = async () => {
          try {
            const response = await fetch(`http://localhost:8000/donors/${donorId}`);

            if (response.ok) {
              const result = await response.json();
              setDonor(result);
            } else {
              console.error('Error fetching donor details');
            }
          } catch (error) {
            console.error('Error fetching donor details', error);
          }
        };

        // Gọi hàm để lấy thông tin chi tiết của donor
        fetchDonorDetails();
      })
      .catch((error) => {
        console.error('Error retrieving user profile:', error);
      });
  };

  useEffect(() => {
    // Đảm bảo rằng bạn đã có accessToken từ quá trình đăng nhập
    const accessToken = Cookies.get('accessToken'); // Thay thế bằng cách lấy accessToken từ nơi bạn lưu trữ nó

    if (accessToken) {
      fetchUserProfile(accessToken);
    }
  }, []); // Gọi chỉ một lần khi component được tạo

  // if (!donors) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h2>Donor Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>{donor?.fullName}</Card.Title>
          <Card.Text>
            <strong>Birth Date:</strong> {donor?.birthDate ? new Date(donor?.birthDate).toDateString() : 'N/A'}<br />
            <strong>Gender:</strong> {donor?.gender}<br />
            <strong>Address:</strong> {donor?.address}<br />
            <strong>Phone Number:</strong> {donor?.phoneNumber}<br />
            <strong>Blood Type:</strong> {donor?.bloodType}<br />
            <strong>Rh Factor:</strong> {donor?.rhFactor}
          </Card.Text> 
        </Card.Body>
      </Card>
    </div>
  );
};

export default DisplayDonor;
