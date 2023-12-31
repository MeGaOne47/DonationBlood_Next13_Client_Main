'use client'
/* eslint-disable react/jsx-key */
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { toast } from 'react-toastify';
import { mutate } from "swr"
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faEye, faPenToSquare, faPersonThroughWindow, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateJoinRoomModal from './update.joinRoom.modal';
import CreateJoinRoomModal from './create.joinRoom.modal';

interface IProps {
  rooms: IJoonRoom[]
}
function AppJoonRoomTable(props: IProps) {
  const { rooms } = props;

  const [room, setRoom] = useState<IJoonRoom | null>(null);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [viewedRoom, setViewedRoom] = useState<IJoonRoom | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Thêm state isAdmin

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
          } else {
            console.error('Error retrieving user profile');
            throw new Error('Error retrieving user profile');
          }
        })
        .then((profileData) => {
          const userRoles = profileData.roles;
          setIsAdmin(userRoles.includes('admin'));
        })
        .catch((error) => {
          console.error('Error retrieving user profile:', error);
        });
    }
  }, []);

  const fetchUserProfile = (accessToken: any, callback: (donorId: number) => void) => {
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
        console.log('profileData',profileData);
        const donorId = profileData.donor.id;
        callback(donorId);
        const userRoles = profileData.roles;
          setIsAdmin(userRoles.includes('admin'));
      })
      .catch((error) => {
        console.error('Error retrieving user profile:', error);
      });
  };

  const handleJoinRoom = (id: number) => {
    // Lấy thông tin người dùng từ Cookie
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      console.error('Access token not found in cookies');
      // Hiển thị thông báo lỗi nếu cần thiết
      return;
    }

    // Sử dụng accessToken để lấy donorId
    fetchUserProfile(accessToken, (donorId) => {
      // Xử lý tham gia phòng
      fetch(`http://localhost:8000/rooms/${id}/join/${donorId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        if (res.status === 201) {
          toast.success("Join room succeed !");
          // Cập nhật dữ liệu sau khi tham gia phòng thành công
          mutate("http://localhost:8000/rooms");
        } else {
          console.error("Join room failed with status:", res.status);
          toast.error("Join room failed !");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
    });
  };

  const handleLeaveRoom = (id: number) => {
    // Lấy thông tin người dùng từ Cookie
    const accessToken = Cookies.get('accessToken');
  
    if (!accessToken) {
      console.error('Access token not found in cookies');
      // Hiển thị thông báo lỗi nếu cần thiết
      return;
    }
  
    // Sử dụng accessToken để lấy donorId
    fetchUserProfile(accessToken, (donorId) => {
      // Xử lý rời phòng
      fetch(`http://localhost:8000/rooms/${id}/leave/${donorId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        if (res.status === 201) {
          toast.success("Leave room succeed !");
          // Cập nhật dữ liệu sau khi rời phòng thành công
          mutate("http://localhost:8000/rooms");
        } else {
          console.error("Leave room failed with status:", res.status);
          toast.error("Leave room failed !");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
    });
  };

  const handleDeleteRoom = (id: number) => {
    if (confirm(`Do you want to delete this rooms (id = ${id})`)) {
      fetch(`http://localhost:8000/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        console.log("Response status:", res.status); // In trạng thái phản hồi

        if (res.status === 200 || res.status === 204) {
          toast.success("Delete rooms succeed !");
          mutate("http://localhost:8000/rooms");
        } else {
          // Xử lý lỗi nếu cần thiết
          console.error("Delete request failed with status:", res.status);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
    } 
  }

  const handleViewRoom = (id: number) => {
    fetch(`http://localhost:8000/rooms/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success("View rooms succeed !");
          setViewedRoom(res);
          setShowViewModal(true);
          mutate("http://localhost:8000/rooms");
        } 
      });
  }

  return (
    <>
      <div
        className='mb-3'
        style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Rooms
          <h6>
            <p>Ghi Chú: các bạn có thể chọn các phòng tham gia hiến máu dưới đây.</p>
            <p>Có thể tham gia hoặc rời đi</p>
          </h6>
        </h3>
        {isAdmin && (
          <Button variant="danger" onClick={() => setShowModalCreate(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </div>
      <Table bordered hover size="sm">
        <thead>
        <tr style={{ textAlign: 'center' }}>
            <th>No</th>
            <th>Nội Dung</th>
            <th>Hiển Thị</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map(item => (
            <tr key={item.id} style={{ textAlign: 'center' }}>
              <td>
                <div style={{ marginTop: '48px' }}>
                  {item.id}
                </div>
              </td>
              <td>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Name: </strong>
                  {item.name}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Purpose: </strong>
                  {item.purpose}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Location: </strong>
                  {item.location}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Donation Instructions: </strong>
                  {item.donationInstructions}
                </div>
              </td>
              <td style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: '40px' }}>
                  <strong>Participants Count: </strong>
                  {item.participantsCount}
                </div>
                <div style={{ marginBottom: '48px' }}>
                  <strong>Max Participants: </strong>
                  {item.maxParticipants}
                </div>
              </td>
              <td>
              <div style={{ marginTop: '48px' }}>
                <Button variant='success' className='mx-1' size="sm"
                  onClick={() => handleJoinRoom(item.id)}
                ><FontAwesomeIcon icon={faArrowRightToBracket} /></Button>
                <Button variant='danger' className='mx-1' size="sm"
                  onClick={() => handleLeaveRoom(item.id)}
                ><FontAwesomeIcon icon={faPersonThroughWindow} /></Button>
                {isAdmin && (
                  <>
                    <Button variant='primary' className='mx-1' size="sm" >
                      <Link
                        href={`/admin/joonRoom/${item.id}`}
                        style={{ color: 'white', textDecoration: 'none' }}
                        onClick={() => handleViewRoom(item.id)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </Button>
                    <Button variant='warning' className='mx-1' size="sm"
                      onClick={() => {
                        setRoom(item);
                        setShowModalUpdate(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button variant='danger' className='mx-1' size="sm"
                      onClick={() => handleDeleteRoom(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </>
                )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateJoinRoomModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateJoinRoomModal
          showModalJoinRoom={showModalUpdate}
          setShowModalJoinRoom={setShowModalUpdate}
          joinRoom={room}
          setJoinRoom={setRoom}
      />
    </>
  );
}

export default AppJoonRoomTable;