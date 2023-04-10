import { queryApi } from "../../redux/query";

const Orders = () => {
    const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
    let orders = data.filter((el) => {
        return el.hasOwnProperty("history") 
    })
    return (
        <div>
            <h2>Orders:</h2>
            <div>{orders.map((el) => {
                return Object.entries(el.history).map((order: any) => {
                    return <div>{order[0]}</div>
                })
            })}</div>
        </div>
    )
}

export default Orders