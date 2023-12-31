'use client'
import useSWR from "swr";
import AppJoonRoomTable from "@/components/app.roomList.table";
import ButtonLoading from "@/components/btnLoading.modal";

const Blogs = () => {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const {data, error, isLoading} = useSWR(
        "http://localhost:8000/rooms",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    if (isLoading) {
        return (
            <ButtonLoading/>
        )
    }

    return (
        <div>
            <AppJoonRoomTable
                rooms={data?.sort((a: any, b: any) => b.id - a.id) ?? []}
            />
        </div>
    )
}
export default Blogs;