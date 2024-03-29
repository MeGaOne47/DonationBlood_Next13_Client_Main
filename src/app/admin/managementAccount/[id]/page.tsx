/* eslint-disable @next/next/no-img-element */
'use client'
import {useRouter} from "next/navigation";
import {Button, Card} from "react-bootstrap";
import useSWR, { Fetcher } from 'swr'

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {



    const fetcher: Fetcher<IManagementAccount, string> = (url: string) => fetch(url)
        .then((res) => res.json());

    const {data, error, isLoading} = useSWR(
        `http://localhost:8000/users/${params.id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const handleBtn = () => {
        // alert(" Trở về trang chủ");
        router.push('/')
    }

    const handleBtnAdmin = () => {
        // alert(" Trở về trang admin");
        router.push('/blogs')
    }

    console.log(">> check id:", params.id)
    return (
        <div>
            Vieu detail with hoidanit = {params.id}
            <div>
                <Card className="text-center">
                    <Card.Header>{data?.username}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {data?.email}
                        </Card.Text>
                        <Card.Text>
                            {data?.isLocked}
                        </Card.Text>
                        <Card.Text>
                            <img
                                src={`http://localhost:8000/users/${data?.id}/profile-image`} // Đường dẫn đến hình ảnh trên server
                                alt={`Profile of ${data?.username}`}
                                style={{ width: '500px', height: '300px', borderRadius: '50%' }}
                            />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">Quyền hạn: {data?.roles}</Card.Footer>
                </Card>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button variant='danger' onClick={ () => handleBtnAdmin()}>Back Blogs</Button>

                <Button variant='warning' onClick={ () => handleBtn()}> Back Home</Button>
            </div>
        </div>
    )
}

export default ViewDetailBlog;