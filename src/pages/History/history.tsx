import './history.scss';
import React, { useEffect, useRef } from 'react';
import { queryApi } from '../../redux/query';
import { useAppSelector } from '../../hooks/hook';
import { getCurrentUser } from '../../redux/selectors';
import { Spinner } from '../../components/Preloader/Spinner/Spinner';

export const History = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const { data, isLoading, isFetching } = queryApi.useGetUserQuery(currentUser.id);
  console.log(data.history);

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

  return (
    <div>
      {data &&
        Object.entries(data.history).map((el: any) => {
          return (
            <div>
              <span>{el[0]}</span>
              <span>{el[1].item.map((item: any) => item.title)}</span>
            </div>
          );
        })}
    </div>
  );
};
