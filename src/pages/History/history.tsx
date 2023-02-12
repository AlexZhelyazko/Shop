import './history.scss';
import React, { useEffect, useRef } from 'react';
import { queryApi } from '../../redux/query';
import { useAppSelector } from '../../hooks/hook';
import { getCurrentUser } from '../../redux/selectors';
import { Spinner } from '../../components/Preloader/Spinner/Spinner';
import { NavLink } from 'react-router-dom';

export const History = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const { data, isLoading, isFetching } = queryApi.useGetUserQuery(currentUser.id);

  // const [trigger] = queryApi.useLazyGetUserQuery(currentUser.id);
  // const data = useRef<any>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     data.current = await trigger(currentUser.id).unwrap();
  //   };
  //   fetchData();
  // }, []);
  // console.log(data.current);

  if (isLoading || isFetching || data === undefined) {
    return <Spinner />;
  }

  // if (data) {
  //   const { history } = data;
  //   const arrHistory = Object.entries(history);
  //   console.log(arrHistory.map((el) => el[0]));
  // }
  console.log(Object.entries(data.history));
  return (
    <div>
      {data &&
        Object.entries(data.history).map((el: any) => {
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
            </div>
          );
        })}
    </div>
  );
};
