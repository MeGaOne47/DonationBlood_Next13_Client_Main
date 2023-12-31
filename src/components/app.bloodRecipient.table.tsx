"use client"
import ImportExcelButton from '@/components/app.importExcelButton';
import CreateBloodRecipientModal from '@/components/create.bloodRecipient.modal';
import UpdateBloodRecipientModal from '@/components/update.bloodRecipient.modal';
import { faEye, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import Fuse from 'fuse.js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
interface IProps {
  recipient: IRecipient[]
}
function ApTableBloodRecipientsList(props: IProps) {

  const {recipient} = props;
  const [recipientss, setRecipientss] = useState<IRecipient[]>([]);
  const [recipients, setRecipients] = useState<IRecipient | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false); 
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [viewedRecipients, setViewedRecipients] = useState<IRecipient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/blood-recipients');
        const data = await response.json();
        setRecipients(data);
      } catch (error) {
        console.error('Error fetching blood recipients data:', error);
      }
    };

    if (!searchTerm) {
        fetchData();
    } 
    // handleSearch();
    }, [searchTerm]);

  const handleDeleteRecipient = (id: number) => {
    if (confirm(`Do you want to delete this Blood Recipient (id = ${id})`)) {
      fetch(`http://localhost:8000/blood-recipients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },

        })
        
        .then(res => {
            console.log("Response status:", res.status); // In trạng thái phản hồi

            if (res.status === 200 || res.status === 204) {
                toast.success("Delete Blood Recipient succeed !"); 
                try {
                    mutate("http://localhost:8000/blood-recipients");
                } catch (error) {
                    console.error("Error during mutation:", error);
                }
                
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

  const handleViewRecipient = (id: number) => {
      fetch(`http://localhost:8000/blood-recipients/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
          }).then(res => res.json())
          .then(res => {
              if (res) {
                  toast.success("View Blood Recipient succeed !");
                  setViewedRecipients(res);
                  setShowViewModal(true);
                  mutate("http://localhost:8000/blood-recipients");
              } 
          });
  }

  const handleSearch = () => {
        const fuse = new Fuse(recipient, { keys: ['fullName', 'phoneNumber'] });
        const result = fuse.search(searchTerm);
        const filteredDonors = result.map((item) => item.item);
    
        setRecipientss(filteredDonors);
    };

  const handleImportExcel = async (file: File) => {
    try {
      const formData = new FormData();  
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/blood-recipients/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Import thành công!');
        mutate("http://localhost:8000/blood-recipients");
      } else {
        toast.error('Import thất bại.');
      }
    } catch (error) {
      console.error('Lỗi khi import:', error);
      toast.error('Đã xảy ra lỗi khi import.');
    }
  };

  return (
    <>
    <div>
      <h1>Danh Sách Người Nhận Máu</h1>
      <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label>Tìm kiếm</Form.Label>
        <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
        />
        <ImportExcelButton onImport={handleImportExcel} />
        <div className='mb-3' style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Table Recipients</h3>
          <Button variant="danger" onClick={() => setShowModalCreate(true)}>
          <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </Form.Group>
      <Table striped bordered hover size="sm">
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>STT</th>
            <th>Họ và Tên</th>
            <th>Ngày Sinh</th>
            <th>Giới Tính</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Nhóm Máu</th>
            <th>Yếu Tố Rh</th>
            <th>Số Lượng Máu Cần</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recipient?.map(item => {
            return (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{format(new Date(item.birthDate), 'dd/MM/yyyy')}</td>
                <td>{item.gender}</td>
                <td>{item.address}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.bloodType}</td>
                <td>{item.rhFactor}</td>
                <td>{item.requiredAmount} ml</td>
                <td>
                        <Button variant='primary' className='mx-1' size="sm">          
                            <Link
                                href={`/admin/bloodRecipients/${item.id}`}
                                style={{ color: 'white', textDecoration: 'none' }}
                                onClick={() => {
                                handleViewRecipient(item.id);  
                                                            
                            }}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                        </Button>
                        <Button variant='warning' className='mx-1' size="sm"
                            onClick={() => {
                            setRecipients(item);
                            setShowModalUpdate(true);
                        }}
                        >
                        <FontAwesomeIcon icon={faPenToSquare} />

                        </Button>
                        <Button variant='danger' className='mx-1' size="sm"
                            onClick={() => {
                            handleDeleteRecipient(item.id);
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

      <CreateBloodRecipientModal
          showModalCreate={showModalCreate}
          setShowModalCreate={setShowModalCreate}
      />

      <UpdateBloodRecipientModal
          showModalUpdate={showModalUpdate}
          setShowModalUpdate={setShowModalUpdate}
          recipient={recipients}
          setRecipient={setRecipients}
      />
    </div>
    </>
  );
};

export default ApTableBloodRecipientsList;