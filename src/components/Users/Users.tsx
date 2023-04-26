import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { queryApi } from '../../redux/query';
import './users.scss';

export const Users = () => {
  const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
  const users = data.filter((user) => user.role !== 'admin');
  return (
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
                          {el[1].item.map((item: any) => (
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
                        <div className="history__item-price">${el[1].totalPrice}</div>
                        <StatusComponent status={el[1].status} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

interface IStatus {
  status: string;
}

const StatusComponent: React.FC<IStatus> = ({status}) => {
  const [visible, setVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState(status);

  const onChangeStatusClick = () => {
    if (visible) {
      //req
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const func = (e: any) => {
    setOrderStatus(e);
  };

  return (
    <>
      <button onClick={onChangeStatusClick}>Change status</button>
      {visible ? (
        <div>
          <div onClick={(e) => func(e.currentTarget.textContent)}>Order Confirmed</div>
          <div onClick={(e) => func(e.currentTarget.textContent)}>Order Completed</div>
          <div onClick={(e) => func(e.currentTarget.textContent)}>Order Canceled</div>
        </div>
      ) :                         <div>
      <span>Status: {orderStatus}</span>
    </div>}
    </>
  );
};
