import './sidebar.scss';
import { useEffect, useState } from 'react';
import RangeSlider from '../../RangeSlider/RangeSlider';
import { useAppDispatch } from '../../../redux/store';
import { clearFilters, setFilterItemsByColor, setFilters } from '../../../redux/catalog/slice';
import { useSelector } from 'react-redux';

const colorsData = [
  { Blue: 'blue' },
  { Black: 'black' },
  { Paleblue: 'paleblue' },
  { White: 'white' },
  { Tan: 'tan' },
];

const sizeData = [{ 42: 42 }, { 44: 44 }, { 46: 46 }, { 48: 48 }, { 50: 50 }, { 52: 52 }];

const Sidebar = ({ items, location }) => {
  let filterItemsByColor = useSelector((state) => state.catalog.filterItemByColor);
  const dispatch = useAppDispatch();
  const [activeColors, setActiveColors] = useState([]);
  const handleClick = (color) => {
    activeColors.includes(color)
      ? setActiveColors([...activeColors.filter((el) => el !== color)])
      : setActiveColors([...activeColors, color]);
  };

  useEffect(() => {
    let filterItems = items.filter((item) => activeColors.includes(item.color));
    dispatch(setFilterItemsByColor(filterItems));
  }, [activeColors]);

  // useEffect(() => {
  //   dispatch(setFilters());
  // }, [filterItemsByColor]);

  return (
    <aside>
      <div className="filter__price">
        <RangeSlider location={location} items={items} />
      </div>
      <div className="filter__color">
        {colorsData.map((el) => {
          return <div onClick={() => handleClick(Object.values(el)[0])}>{Object.keys(el)}</div>;
        })}
      </div>
      <div className="filter__size"></div>
      <button onClick={() => dispatch(setFilters())}>Set Filters</button>
    </aside>
  );
};

export default Sidebar;
