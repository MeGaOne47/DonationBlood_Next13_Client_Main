import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { FaUser, FaHeart, FaUserCog, FaPennyArcade, FaJoint, FaLongArrowAltRight } from 'react-icons/fa';
import Cookies from 'js-cookie';

function AppSideBar() {
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

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
    <>
      {isAdmin && (
        <Button 
          variant="primary" 
          onMouseEnter={handleShow} 
          style={
            { 
              marginBottom: '20px', 
              display: 'flex', 
              flexDirection: 'column',
              height: '314px', // Ajusted height
              alignItems: 'center', // Center icons horizontally
              justifyContent: 'center', // Center icons vertically
            }}>
        <FaHeart style={
          { 
            marginBottom: '20px', 
          }} />
        <FaUser style={
          { 
            marginBottom: '20px', 
          }} />
        <FaUserCog style={
          { 
            marginBottom: '20px', 
          }} />
        <FaLongArrowAltRight style={
          { 
            marginBottom: '20px', 
          }} />
        </Button>
      )}

      <Offcanvas show={show} onHide={handleHide} placement="start" backdrop={false} onMouseLeave={handleHide} style={{ width: '300px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/admin/bloodRecipients" onClick={handleHide}>
              <FaHeart style={{ marginRight: '8px' }} /> Blood Recipients
            </Nav.Link>
            <Nav.Link href="/admin/donor" onClick={handleHide}>
              <FaUser style={{ marginRight: '8px' }} /> Donor
            </Nav.Link>
            <Nav.Link href="/admin/managementAccount" onClick={handleHide}>
              <FaUserCog style={{ marginRight: '8px' }} /> Management Account
            </Nav.Link>
            <Nav.Link href="/joinRoom" onClick={handleHide}>
                <FaLongArrowAltRight style={{ marginRight: '8px' }} /> Management Join Room
              </Nav.Link>
            </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AppSideBar;
