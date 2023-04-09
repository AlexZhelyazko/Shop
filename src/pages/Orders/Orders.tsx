import { queryApi } from "../../redux/query";

const Orders = () => {
    const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
    return (
        <div>
            Orders
        </div>
    )
}

export default Orders