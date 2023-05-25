import { useState } from "react";
import { NavLink } from "react-router-dom";
import { queryApi } from "../../redux/query";
import "./users.scss";

export const Users = () => {
  const [dateFilter, setDateFilter] = useState("From New To Old");
  const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
  const users = data.filter((user) => user.role !== "admin");

  return (
    <>
      <div>
        <div>
          <label htmlFor="filter_date">Sort by Date</label>
          <input type="checkbox" name="filter_date" id="filter_date" />
        </div>
        <div>
          <label htmlFor="filter_status">Show only:</label>
          <input
            type="checkbox"
            name="filter_status"
            id="filter_status"
            value="Completed"
          />
          <span>Completed</span>
          <input
            type="checkbox"
            name="filter_status"
            id="filter_status"
            value="Confirmed"
          />
          <span>Confirmed</span>
          <input
            type="checkbox"
            name="filter_status"
            id="filter_status"
            value="Canceled"
          />{" "}
          <span>Canceled</span>
        </div>
      </div>
      <div className="users">
        {users &&
          users.map((user) => (
            <div className="users__wrap">
              <div className="user-img">
                <img src={user.avatar} alt="useravatar" />
              </div>
              <div className="user-info">
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>
                  {user.history &&
                    Object.entries(user.history).map((el: any) => {
                      return (
                        <div className="history__item">
                          <div className="history__item-date">{el[0]}</div>
                          <div>
                            {el[1]?.item.map((item: any) => (
                              <div className="history__item-info">
                                <NavLink to={`/shop/${item.id}`}>
                                  <img src={item.img} alt="item" />
                                </NavLink>
                                <div>
                                  <span>{item.title}</span>
                                  <span>Size: {item.size}</span>
                                  <span>Count: {item.count}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="history__item-price">
                            ${el[1].totalPrice}
                          </div>
                          <StatusComponent
                            date={el[0]}
                            history={user.history}
                            id={user.id}
                            status={el[1].status}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

interface IStatus {
  status: string;
  id: string;
  history: any;
  date: any;
}

const StatusComponent: React.FC<IStatus> = ({ status, id, history, date }) => {
  const [visible, setVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState(status);

  const [updateStatus, {}] = queryApi.useChagneOrderStatusMutation();

  const showMenu = () => {
    if (visible) {
      //req
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleChangeStatus = async (e: any, date: any) => {
    setOrderStatus(e);
    let newHist = { ...history };
    newHist[date] = { ...history[date] };
    newHist[date].status = e;
    await updateStatus({ userId: id, data: newHist });
    setVisible(false);
  };

  return (
    <>
      {visible ? (
        <div className="orderStatusList">
          <div
            className="orderStatus"
            onClick={(e) =>
              handleChangeStatus(e.currentTarget.textContent, date)
            }
          >
            Order Confirmed
          </div>
          <div
            className="orderStatus"
            onClick={(e) =>
              handleChangeStatus(e.currentTarget.textContent, date)
            }
          >
            Order Completed
          </div>
          <div
            className="orderStatus"
            onClick={(e) =>
              handleChangeStatus(e.currentTarget.textContent, date)
            }
          >
            Order Canceled
          </div>
        </div>
      ) : (
        <>
          <button className="changeStatusBtn" onClick={showMenu}>
            Change status
          </button>
          <div>
            <span>Status: {orderStatus}</span>
          </div>
        </>
      )}
    </>
  );
};
