/* eslint-disable @next/next/no-img-element */
'use client'
/* eslint-disable react/jsx-key */
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Link from "next/link";
import { toast } from 'react-toastify';
import { mutate } from "swr"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateManagementAccountModal from './create.managementAccount.modal';
import UpdateManagementAccountModal from './update.managementAccount.modal';

interface IProps {
  managementAccounts: IManagementAccount[];
}

function AppManagementAccountTable(props: IProps) {
  const { managementAccounts } = props;

  const [managementAccount, setManagementAccounts] = useState<IManagementAccount | null>(null);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [viewedManagementAccount, setViewedManagementAccount] = useState<IManagementAccount | null>(null);

  const handleDeleteManagementAccount = (id: number) => {
    if (confirm(`Do you want to delete this management account (id = ${id})`)) {
      fetch(`http://localhost:8000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      })
        .then(res => {
          console.log("Response status:", res.status); // In trạng thái phản hồi

          if (res.status === 200 || res.status === 204) {
            toast.success("Delete management account succeed !");
            mutate("http://localhost:8000/users");
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

  const handleViewManagementAccount = (id: number) => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success("View management account succeed !");
          setViewedManagementAccount(res);
          setShowViewModal(true);
          mutate("http://localhost:8000/users");
        }
      });
  }

  return (
    <>
      <div
        className='mb-3'
        style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Management Accounts</h3>
        {/* <Button variant="secondary"
          onClick={() => setShowModalCreate(true)}
        >Add New</Button> */}
      </div>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Is Locked</th>
            <th>Image user</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {managementAccounts?.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.roles}</td>
                <td>{item.isLocked ? 'Đã khóa' : 'Chưa khóa'}</td>
                <td>
                  <img
                    src={`http://localhost:8000/users/${item.id}/profile-image`} // Đường dẫn đến hình ảnh trên server
                    alt={`Profile of ${item.username}`}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                </td>
                <td>
                  <Button variant='primary' className='mx-1' size="sm" >
                    <Link
                      href={`/admin/managementAccount/${item.id}`}
                      style={{ color: 'white', textDecoration: 'none' }}
                      onClick={() => {
                        handleViewManagementAccount(item.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </Button>
                  <Button variant='warning' className='mx-1' size="sm"
                    onClick={() => {
                      setManagementAccounts(item);
                      setShowModalUpdate(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button variant='danger' className='mx-1' size="sm"
                    onClick={() => {
                      handleDeleteManagementAccount(item.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      {/* <CreateManagementAccountModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      /> */}

      <UpdateManagementAccountModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        managementAccount={managementAccount}
        setManagementAccount={setManagementAccounts}
      />

    </>
  );
}

export default AppManagementAccountTable;
