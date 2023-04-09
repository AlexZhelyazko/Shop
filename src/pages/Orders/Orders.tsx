import { queryApi } from "../../redux/query";

const Orders = () => {
    const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
    console.log(data)
    return (
        <div>
            Orders
        </div>
    )
}

export default Orders