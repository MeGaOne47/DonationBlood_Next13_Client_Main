'use client'
import useSWR from "swr";
import ApTableBloodRecipientsList from "@/components/app.bloodRecipient.table";
import { Button, Spinner } from "react-bootstrap";
import ButtonLoading from "@/components/btnLoading.modal";

const BloodRecipient = () => {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const {data, error, isLoading} = useSWR(
        "http://localhost:8000/blood-recipients?page=1&pageSize=10",
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
        );
    }

    return (
        <div>
            <ApTableBloodRecipientsList
                recipient={data?.sort((a: any, b: any) => b.id - a.id) ?? []}
            />
        </div>
    )
}
export default BloodRecipient;