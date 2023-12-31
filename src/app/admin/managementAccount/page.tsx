'use client'
import AppManagementAccountTable from "@/components/app.managementAccount.table";
import ButtonLoading from "@/components/btnLoading.modal";
import useSWR from "swr";

const Blogs = () => {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const {data, error, isLoading} = useSWR(
        "http://localhost:8000/users",
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
            <AppManagementAccountTable
                managementAccounts={data?.sort((a: any, b: any) => b.id - a.id) ?? []}
            />
        </div>
    )
}
export default Blogs;