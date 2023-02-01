import React from 'react';
import './MainPage.scss';

const MainPage: React.FC = () => {
  return (
    <article className="mainPage-wrapper">
      <img
        src="https://cdn.shopify.com/s/files/1/0053/7994/8647/files/THISISNOTDIOR_MARILYN_EDITED2_1440x.jpg?v=1667320644"
        alt=""
      />
      <div className="mainPage__btn">SHOP NOW</div>
    </article>
  );
};

export default MainPage;
