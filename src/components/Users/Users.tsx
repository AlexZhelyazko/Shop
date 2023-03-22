import React from 'react';
import { queryApi } from '../../redux/query';

export const Users = () => {
  const { data = [], isLoading, isError } = queryApi.useGetUsersQuery();
  console.log(data);
  const users = data.filter((user) => user.role !== 'admin');
  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <div>{user.name}</div>
      ))}
    </div>
  );
};
