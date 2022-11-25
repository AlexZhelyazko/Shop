import './sidebar.scss';
import { useEffect, useState } from 'react';
import RangeSlider from '../../RangeSlider/RangeSlider';
import { useAppDispatch } from '../../../redux/store';
import { BsFilterLeft } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import {
  clearFilters,
  setFilterItemsByCategory,
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
  const [showFilter, setShowFilter] = useState(true);
  let filterItemsByColor = useSelector((state) => state.catalog.filterItemByColor);
  let filterItemsByPrice = useSelector((state) => state.catalog.filterItemByPrice);
  let filterItemsBySize = useSelector((state) => state.catalog.filterItemBySize);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState([0, 4000]);
  const [activeColors, setActiveColors] = useState([]);
  const [activeSize, setActiveSize] = useState([]);
  const [activeJackets, setActiveJackets] = useState(false);
  const [activeAccessories, setActiveAccessories] = useState(false);

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

  const handleClickCategory = (category) => {
    switch (category) {
      case 'jackets':
        setActiveJackets(!activeJackets);
      case 'accessories':
        setActiveAccessories(!activeAccessories);
      default:
        return;
    }
  };

  useEffect(() => {
    let filterItemByCategory;
    if (activeJackets && activeAccessories) {
      filterItemByCategory = items;
      dispatch(setFilterItemsByCategory(filterItemByCategory));
    } else if (activeJackets) {
      filterItemByCategory = items.filter((item) => item.category === 'jackets');
      dispatch(setFilterItemsByCategory(filterItemByCategory));
    } else if (activeAccessories) {
      filterItemByCategory = items.filter((item) => item.category === 'accessories');
      dispatch(setFilterItemsByCategory(filterItemByCategory));
    } else {
      return;
    }
  }, [activeAccessories, activeJackets]);
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
    <>
      <div className="burger">
        {showFilter ? (
          <div className="filter__burger-menu filter__menu">
            <GiCancel onClick={() => setShowFilter(false)} />
            <div className="filter__category">
              <h3>Category:</h3>
              <div className="filter__category-item">
                <input
                  className="filter__category-input"
                  value="jackets"
                  type="checkbox"
                  onChange={(event) => handleClickCategory(event.target.value)}
                  id="jackets"
                  name="jackets"
                  checked={activeJackets.value}
                />
                <label className="filter__category-label" htmlFor="lackets">
                  Jackets
                </label>
              </div>
              <div>
                <input
                  onChange={(event) => handleClickCategory(event.target.value)}
                  type="checkbox"
                  id="accessories"
                  name="accessories"
                  value="accessories"
                  checked={activeAccessories.value}
                />
                <label htmlFor="accessories">Accessories</label>
              </div>
            </div>
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
              <h3>Size:</h3>
              <div className="filter__size-list">
                {sizeData.map((el) => {
                  return (
                    <div
                      className={`${
                        activeSize.includes(el) ? 'filter__size-active' : 'filter__size-notactive'
                      }`}
                      onClick={() => handleClickSize(el)}>
                      {el}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="filter__buttons">
              <button className="setFilters_btn" onClick={onSetFiltersClick}>
                Set Filters
              </button>
              <button className="clear_btn" onClick={onClearClick}>
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div onClick={() => setShowFilter(true)} className="showFilter_btn">
            <BsFilterLeft onClick={() => setShowFilter(true)} /> Filters
          </div>
        )}
      </div>
      <aside className="sidebar filter__menu">
        <div className="filter__category">
          <h3>Category:</h3>
          <div>
            <input
              value="jackets"
              type="checkbox"
              onChange={(event) => handleClickCategory(event.target.value)}
              id="jackets"
              name="jackets"
              checked={activeJackets.value}
            />
            <label htmlFor="lackets">Jackets</label>
          </div>
          <div>
            <input
              onChange={(event) => handleClickCategory(event.target.value)}
              type="checkbox"
              id="accessories"
              name="accessories"
              value="accessories"
              checked={activeAccessories.value}
            />
            <label htmlFor="accessories">Accessories</label>
          </div>
        </div>
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
          <h3>Size:</h3>
          <div className="filter__size-list">
            {sizeData.map((el) => {
              return (
                <div
                  className={`${
                    activeSize.includes(el) ? 'filter__size-active' : 'filter__size-notactive'
                  }`}
                  onClick={() => handleClickSize(el)}>
                  {el}
                </div>
              );
            })}
          </div>
        </div>
        <div className="filter__buttons">
          <button className="setFilters_btn" onClick={onSetFiltersClick}>
            Set Filters
          </button>
          <button className="clear_btn" onClick={onClearClick}>
            Clear
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
