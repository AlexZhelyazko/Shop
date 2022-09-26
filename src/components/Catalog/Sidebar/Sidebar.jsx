import './sidebar.scss';
import { useEffect, useState } from 'react';
import { fetchCatalogItems } from '../../../redux/catalog/asyncActions';
import { setItems, sortItemsByPrice } from '../../../redux/catalog/slice';
import { useAppDispatch } from '../../../redux/store';

const colorsData = [
  { Blue: 'blue123' },
  { Black: 'black' },
  { Paleblue: 'paleblue' },
  { White: 'white' },
  { Tan: 'tan' },
];

const Sidebar = ({ items }) => {
  const [startPrice, setStartPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(1000);
  const [activeColors, setActiveColors] = useState('');
  const dispatch = useAppDispatch();

  const setFilters = (color) => {
    const colors = color.toString();
    setActiveColors(colors);
    dispatch(fetchCatalogItems(colors));
  };

  useEffect(() => {
    // dispatch(fetchCatalogItems());
    // dispatch(sortItemsByPrice({ startPrice, finalPrice }));
  }, [startPrice, finalPrice, activeColors]);
  return (
    <aside>
      <div className="filter__price">
        <input type="text" onChange={(e) => setStartPrice(e.currentTarget.value)} />
        <input type="text" onChange={(e) => setFinalPrice(e.currentTarget.value)} />
      </div>

      <div className="filter__color">
        {colorsData.map((el) => {
          return <div onClick={() => setFilters(Object.values(el))}>{Object.keys(el)}</div>;
        })}
      </div>

      <div className="filter__size">
        <div>42</div>
        <div>44</div>
        <div>46</div>
        <div>48</div>
        <div>50</div>
        <div>52</div>
      </div>
    </aside>
  );
};

export default Sidebar;
