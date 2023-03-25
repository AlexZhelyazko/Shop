import React from 'react';
import { NavLink } from 'react-router-dom';
import { queryApi } from '../../redux/query';
import './users.scss';

export const Users = () => {
  const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
  const users = data.filter((user) => user.role !== 'admin');
  console.log(users);
  return (
    <div className="users">
      {users &&
        users.map((user) => (
          <div className="users__wrap">
            <div className="user-img">
              <img src={user.avatar} alt="useravatar" />
            </div>
            <div className="user-info">
              <div>{user.id}</div>
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
                        <div>
                          <span>Status: {el[1].status}</span>
                          <button>Change status</button>
                        </div>
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
