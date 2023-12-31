'use client'
import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import useSWR, { Fetcher } from 'swr'
import { format } from 'date-fns';

const ViewDetailRecipient = ({ params }: { params: { id: string } }) => {

    const fetcher: Fetcher<IRecipient, string> = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blood-recipients/${params.id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    const router = useRouter();

    const handleBtnAdmin = () => {
        router.push('/'); // Quay lại danh sách người nhận máu
    }

    const handleBtn = () => {
        router.push('/blogs'); // Quay lại trang chủ
    }

    return (
        <div>
            <h1>Chi Tiết Người Nhận Máu</h1>
            {isLoading && (
                <div>
                    Loading...
                </div>
            )}
            {error && (
                <div>
                    Error fetching data.
                </div>
            )}
            {data && (
                <div>
                    <Card className="text-center">
                        <Card.Header>{data?.fullName}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Ngày Sinh:</strong> {format(new Date(data?.birthDate), 'dd/MM/yyyy')}<br />
                                <strong>Giới Tính:</strong> {data?.gender}<br />
                                <strong>Địa Chỉ:</strong> {data?.address}<br />
                                <strong>Số Điện Thoại:</strong> {data?.phoneNumber}<br />
                                <strong>Nhóm Máu:</strong> {data?.bloodType}<br />
                                <strong>Yếu Tố Rh:</strong> {data?.rhFactor}<br />
                                <strong>Số Lượng Máu Cần:</strong> {data?.requiredAmount} ml<br />
                                {/* Thêm các trường thông tin khác của người nhận máu */}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">ID: {data?.id}</Card.Footer>
                    </Card>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button variant='danger' onClick={handleBtnAdmin}>Quay lại Danh Sách Người Nhận Máu</Button>
                        <Button variant='warning' onClick={handleBtn}>Quay lại Trang Chủ</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewDetailRecipient;
