/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import ButtonLoading from "@/components/btnLoading.modal";
import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import useSWR, { Fetcher } from 'swr';

const ViewDetailJoinRoom = ({ params }: { params: { id: string } }) => {
    const fetcher: Fetcher<IJoonRoom, string> = (url: string) => fetch(url)
        .then((res) => res.json());

    // Sử dụng useSWR để fetch dữ liệu từ API
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/rooms/${params.id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    // Kiểm tra nếu đang loading, hiển thị thông báo "Loading..."
    if (isLoading) {
        return (
            <ButtonLoading/>
        )
    }

    // Sử dụng useRouter để điều hướng trang
    const router = useRouter();

    // Hàm xử lý khi người dùng click nút "Back Blogs"
    const handleBtnBlogs = () => {
        router.push('/blogs');
    }

    // Hàm xử lý khi người dùng click nút "Back Home"
    const handleBtnHome = () => {
        router.push('/');
    }

    console.log(">> check id:", params.id)
    
    // Hiển thị chi tiết phòng tham gia hiến máu
    return (
        <div>
            View detail with room ID = {params.id}
            <div>
                <Card className="text-center">
                    <Card.Header>{data?.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <strong>Purpose:</strong> {data?.purpose}
                            <br />
                            <strong>Location:</strong> {data?.location}
                            <br />
                            <strong>Max Participants:</strong> {data?.maxParticipants}
                            <br />
                            <strong>Donation Instructions:</strong> {data?.donationInstructions}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div style={{ textAlign: 'center' }}>
                {/* Nút chuyển hướng về trang Blogs */}
                <Button variant='danger' onClick={handleBtnBlogs}>Back Blogs</Button>

                {/* Nút chuyển hướng về trang Home */}
                <Button variant='warning' onClick={handleBtnHome}>Back Home</Button>
            </div>
        </div>
    )
}

export default ViewDetailJoinRoom;
