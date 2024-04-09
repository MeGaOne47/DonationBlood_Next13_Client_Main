/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { CSSProperties, useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const defaultAvatarURL = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

const userButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const avatarStyle: CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '10px',
  objectFit: 'cover',
};

const userNameStyle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 'bold',
};

export default function UserButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true');
  const userJSON = Cookies.get('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const [isClient, setIsClient] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const handleLogout = async () => {
  
      const refreshToken = Cookies.get('refreshToken');
      console.log("refreshToken: " ,refreshToken)

      const accessToken = Cookies.get('accessToken');
      console.log("accessToken: " ,accessToken)

  
      fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })
      .then((response) => {
        if (response.status === 201) {
          // Xóa các cookies hoặc lưu trữ local storage khi logout thành công
          Cookies.remove('isLoggedIn');
          Cookies.remove('user');
          Cookies.remove('accessToken'); // Xóa accessToken
          Cookies.remove('refreshToken'); // Xóa refreshToken
          setIsLoggedIn(false);
          window.location.href = '/users/login';
          // window.location.reload(); // Có thể cần reload trang để cập nhật giao diện
        } else if (response.status === 401) {
          // Xử lý token hết hạn ở đây
          handleRefreshToken();
        } else {
          console.error('Logout failed');
        }
      })
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
        } else if (profileResponse.status === 401) {
          // Xử lý token hết hạn ở đây
          handleRefreshToken();
        } else {
          console.error('Error retrieving user profile');
          throw new Error('Error retrieving user profile');
        }
      })
      .then((profileData) => {
        setUserData(profileData);
        fetchProfileImage(profileData.id);
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

  useEffect(() => {
    setIsClient(true);
    if (isLoggedIn) {
      const accessToken = Cookies.get('accessToken');
      console.log("accessToken: " ,accessToken)
      fetchUserProfile(accessToken);
      // Lên lịch trình làm mới token sau 4 phút
      const refreshTokenTimer = setTimeout(() => {
        handleRefreshToken();
      }, 4 * 60 * 1000); // 4 phút expressed in milliseconds

      // Hủy lịch trình khi component unmount hoặc khi logout
      return () => clearTimeout(refreshTokenTimer);
    }
  }, [isLoggedIn]);

  const [userData, setUserData] = useState<{ email: string | undefined; username: string | undefined } | null>(
    null
  );

  const fetchProfileImage = (userId: number) => {
    fetch(`http://localhost:8000/users/${userId}/profile-image`)
      .then((imageResponse) => {
        if (imageResponse.ok) {
          return imageResponse.blob();
        } else {
          console.error('Error fetching profile image');
          throw new Error('Error fetching profile image');
        }
      })
      .then((imageBlob) => {
        // Chuyển đổi blob thành đường dẫn URL cho Image
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfileImage(imageUrl);
      })
      .catch((error) => {
        console.error('Error fetching profile image:', error);
      });
  };

  return (
    <> 
      {isClient ? (
        isLoggedIn ? (
        <Dropdown id="dropdown-menu">
          <Dropdown.Toggle variant="light" id="dropdown-basic" style={userButtonStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="user avatar"
                  roundedCircle
                  style={avatarStyle}
                />
              ) : (
                <Image
                  src={defaultAvatarURL}
                  alt="user avatar"
                  roundedCircle
                  style={avatarStyle}
                />
              )}
              <span style={userNameStyle}>{userData?.username || ''}</span>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="user avatar"
                  roundedCircle
                  style={avatarStyle}
                />
              ) : (
                <Image
                  src={defaultAvatarURL}
                  alt="user avatar"
                  roundedCircle
                  style={avatarStyle}
                />
              )}
      
              <div className="font-medium text-gray-200" style={userNameStyle}>
                {userData?.username || ''}
              </div>
            </div>
            <Dropdown.Item>
              <Link href="/users/dashboard" style={{ textDecoration: 'none' }}>
                <Button variant="light" size="sm">
                  <FontAwesomeIcon icon={faCog} />
                  <span style={{ marginLeft: '5px' }}>Manage Account</span>
                </Button>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/donor/displayDonor" style={{ textDecoration: 'none' }}>
                <Button variant="light" size="sm">
                  <FontAwesomeIcon icon={faArrowRight} />
                  <span style={{ marginLeft: '5px' }}>Donor</span>
                </Button>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button id='logout-button' onClick={handleLogout} variant="light" size="sm">
                <FontAwesomeIcon icon={faArrowRight} />
                <span style={{ marginLeft: '5px' }}>Sign Out</span>
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button variant="light" href="/users/login">
          Sign In
        </Button>
        )
      ) : (
        <Button variant="light" href="/users/login">
          Sign In
        </Button>
      )}
    </>
  );
}
