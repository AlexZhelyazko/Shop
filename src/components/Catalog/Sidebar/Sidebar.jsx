import './sidebar.scss';
import { useEffect, useState } from 'react';
import RangeSlider from '../../RangeSlider/RangeSlider';
import { useAppDispatch } from '../../../redux/store';
import {
  clearFilters,
  setFilterItemsByColor,
  setFilterItemsBySize,
  setFilters,
  setNotFound,
} from '../../../redux/catalog/slice';
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

const Sidebar = ({ items, location }) => {
  let filterItemsByColor = useSelector((state) => state.catalog.filterItemByColor);
  let filterItemsByPrice = useSelector((state) => state.catalog.filterItemByPrice);
  let filterItemsBySize = useSelector((state) => state.catalog.filterItemBySize);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState([0, 4000]);
  const [activeColors, setActiveColors] = useState([]);
  const [activeSize, setActiveSize] = useState([]);

  const handleClickColor = (color) => {
    activeColors.includes(color)
      ? setActiveColors([...activeColors.filter((el) => el !== color)])
      : setActiveColors([...activeColors, color]);
  };

  const handleClickSize = (size) => {
    activeSize.includes(size)
      ? setActiveSize([...activeSize.filter((el) => el !== size)])
      : setActiveSize([...activeSize, size]);
  };

  useEffect(() => {
    let filterItemsByColor = items.filter((item) => activeColors.includes(item.color));
    dispatch(setFilterItemsByColor(filterItemsByColor));
  }, [activeColors]);

  useEffect(() => {
    let filterItemBySize = items.filter((item) => {
      let newArr = item.size.filter((el) => activeSize.includes(el));
      return newArr.length !== 0;
    });
    dispatch(setFilterItemsBySize(filterItemBySize));
  }, [activeSize]);

  const onSetFiltersClick = () => {
    if (filterItemsByColor.length || filterItemsByPrice.length || filterItemsBySize.length) {
      dispatch(setNotFound(false));
      dispatch(setFilters());
    } else {
      dispatch(setNotFound(true));
    }
  };

  const onClearClick = () => {
    setActiveColors([]);
    setActiveSize([]);
    setValue([0, 4000]);
    dispatch(clearFilters());
  };

  return (
    <aside className="filter__menu">
      <div className="filter__price">
        <RangeSlider value={value} setValue={setValue} location={location} items={items} />
      </div>
      <div className="filter__color">
        <h3>Color:</h3>
        <div className="filter__color-list">
          {colorsData.map((el) => {
            return (
              <div
                className={`${
                  activeColors.includes(Object.values(el)[0])
                    ? 'filter__color-active'
                    : 'filter__color-notactive'
                }`}
                onClick={() => handleClickColor(Object.values(el)[0])}>
                <span>{Object.keys(el)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="filter__size">
        {sizeData.map((el) => {
          return <div onClick={() => handleClickSize(el)}>{el}</div>;
        })}
      </div>
      <button onClick={onSetFiltersClick}>Set Filters</button>
      <button onClick={onClearClick}>Clear</button>
    </aside>
  );
};

export default Sidebar;
