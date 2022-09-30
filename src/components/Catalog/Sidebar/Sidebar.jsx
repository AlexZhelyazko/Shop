import './sidebar.scss';
import { useEffect, useState } from 'react';
import RangeSlider from '../../RangeSlider/RangeSlider';
import { useAppDispatch } from '../../../redux/store';
import { sortItemsByColor } from '../../../redux/catalog/slice';

const colorsData = [
  { Blue: 'blue123' },
  { Black: 'black' },
  { Paleblue: 'paleblue' },
  { White: 'white' },
  { Tan: 'tan' },
];

const sizeData = [{ 42: 42 }, { 44: 44 }, { 46: 46 }, { 48: 48 }, { 50: 50 }, { 52: 52 }];

const Sidebar = ({ items }) => {
  const dispatch = useAppDispatch();
  const [activeColors, setActiveColors] = useState([]);
  const handleClick = (color) => {
    activeColors.includes(color)
      ? setActiveColors([...activeColors.filter((el) => el !== color)])
      : setActiveColors([...activeColors, color]);
  };

  useEffect(() => {
    dispatch(sortItemsByColor(activeColors));
  }, [activeColors]);

  return (
    <aside>
      <div className="filter__price">
        <RangeSlider />
      </div>
      <div className="filter__color">
        {colorsData.map((el) => {
          return <div onClick={() => handleClick(Object.values(el)[0])}>{Object.keys(el)}</div>;
        })}
      </div>
      <div className="filter__size"></div>
    </aside>
  );
};

export default Sidebar;
