import { queryApi } from "../../redux/query";

const Orders = () => {
    const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
    let orders = data.filter((el) => {
        return el.hasOwnProperty("history") 
    })
    console.log(orders)
    return (
        <div>
            <h2>Orders:</h2>
            <div>
                {orders.map((el) => {
                    return (
                        <>
                            <div>{el.name}</div>
                            {Object.entries(el.history).map((order: any) => {
                                return  (
                                    <>
                                        <div>{order[0]}</div>
                                        <div>{order[1].status}</div>
                                        {order[1].item.map((item: any) => (
                                            <span>{item.title}</span>

                                         ))}
                                    </>
                                )
                            })}
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders