import './sidebar.scss';
import { useState } from 'react';

const colorsData = [
  { Blue: 'blue123' },
  { Black: 'black' },
  { Paleblue: 'paleblue' },
  { White: 'white' },
  { Tan: 'tan' },
];

const sizeData = [{ 42: 42 }, { 44: 44 }, { 46: 46 }, { 48: 48 }, { 50: 50 }, { 52: 52 }];

const Sidebar = ({ items }) => {
  const [startPrice, setStartPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(1000);
  const [activeColors, setActiveColors] = useState('');

  return (
    <aside>
      <div className="filter__price">
        <input type="text" onChange={(e) => setStartPrice(e.currentTarget.value)} />
        <input type="text" onChange={(e) => setFinalPrice(e.currentTarget.value)} />
      </div>

      <div className="filter__color">
        {colorsData.map((el) => {
          return <div>{Object.keys(el)}</div>;
        })}
      </div>

      <div className="filter__size"></div>
    </aside>
  );
};

export default Sidebar;
