/* eslint-disable react/jsx-no-undef */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import UserButton from './userButton.modal';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// import NotificationComponent from './app.notification.modal';


function AppHeader() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
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
            // Người dùng đã đăng xuất, cập nhật state và dừng xử lý tiếp
            setIsLoggedOut(true);
            throw new Error('User logged out');
          } else {
            console.error('Error retrieving user profile');
            throw new Error('Error retrieving user profile');
          }
        })
        .then((profileData) => {
          const userRoles = profileData.roles;
          // Kiểm tra nếu userRoles chứa quyền 'admin', set state để hiển thị sidebar
          setIsAdmin(userRoles.includes('admin'));
          setIsUser(userRoles.includes('user'));
          console.log('userRoles',userRoles);
        })
        .catch((error) => {
          if (error.message !== 'User logged out') {
            console.error('Error retrieving user profile:', error);
          }
        });
    }
  }, []);

  if (isLoggedOut) {
    return null; // Không hiển thị gì cả nếu người dùng đã đăng xuất
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Link href="/" className='navbar-brand'>
        Blood Donation
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Link href={"/blogs"} className='nav-link'>
            Blogs
          </Link> */}
          <Link href={"/donor/displayDonor"} className='nav-link'>
            Donor
          </Link>
          <Link href={"/FAQPage"} className='nav-link'>
          FAQPage
          </Link>
          {isAdmin && (
              <Link href={"/joinRoom"} className='nav-link'>
                Admin Room
              </Link>
            )}
            {isUser && (
              <Link href={"/joinRoom"} className='nav-link'>
                User Room
              </Link>
            )}
        </Nav>
        {/* <NotificationComponent /> */}
        <UserButton/>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default AppHeader;