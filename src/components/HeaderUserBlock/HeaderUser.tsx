import './headerUser.scss';
import React, { useState } from 'react';
import { setCurrentUser, setIsAuth } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { getCurrentUser } from '../../redux/selectors';

export const HeaderUser = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopUpVisible(!popUpVisible);
  };

  const onExitClick = () => {
    dispatch(setIsAuth(false));
    dispatch(setCurrentUser({}));
  };

  return (
    <div className="header__user" onClick={(e) => handleClick(e)}>
      <span className="header__user-name">{currentUser.name}</span>
      <div className="header__user-avatar">
        <img src={currentUser.avatar} alt="" />
      </div>
      {popUpVisible && (
        <div className="header__user-popup">
          <span>History of Orders</span>
          <span>Account Settings</span>
          <span onClick={onExitClick}>Exit</span>
        </div>
      )}
    </div>
  );
};
