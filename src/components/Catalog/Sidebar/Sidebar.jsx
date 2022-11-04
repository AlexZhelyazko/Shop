import './sidebar.scss';
import { useEffect, useState } from 'react';
import RangeSlider from '../../RangeSlider/RangeSlider';
import { useAppDispatch } from '../../../redux/store';
import { clearFilters, setFilterItemsByColor, setFilters } from '../../../redux/catalog/slice';
import { useSelector } from 'react-redux';

const colorsData = [
  { Blue: 'blue' },
  { Black: 'black' },
  { Pink: 'pink' },
  { White: 'white' },
  { Yellow: 'yellow' },
  { Red: 'red' },
  { Green: 'green' },
];

const sizeData = ['M', 'S', 'L', 'XL'];

const Sidebar = ({ items, location, setNotFoundItems, func }) => {
  let filterItemsByColor = useSelector((state) => state.catalog.filterItemByColor);
  let filterItemsByPrice = useSelector((state) => state.catalog.filterItemByPrice);
  const dispatch = useAppDispatch();
  const [activeColors, setActiveColors] = useState([]);
  const handleClick = (color) => {
    activeColors.includes(color)
      ? setActiveColors([...activeColors.filter((el) => el !== color)])
      : setActiveColors([...activeColors, color]);
  };

  useEffect(() => {
    let filterItemsByColor = items.filter((item) => activeColors.includes(item.color));
    dispatch(setFilterItemsByColor(filterItemsByColor));
  }, [activeColors]);

  const onSetFiltersClick = () => {
    if (filterItemsByColor.length || filterItemsByPrice.length) {
      func(false);
      dispatch(setFilters());
    } else {
      func(true);
    }
  };
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
      <div className="filter__size">{sizeData}</div>
      <button onClick={onSetFiltersClick}>Set Filters</button>
      <button onClick={() => dispatch(clearFilters())}>Clear</button>
    </aside>
  );
};

export default Sidebar;
