import { useEffect, useState } from 'react';
import { fetchCatalogItems } from '../../../redux/catalog/asyncActions';
import { setItems, sortItemsByPrice } from '../../../redux/catalog/slice';
import { useAppDispatch } from '../../../redux/store';

const Sidebar = ({ items }) => {
  const [startPrice, setStartPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(1000);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCatalogItems());
    dispatch(sortItemsByPrice({ startPrice, finalPrice }));
  }, [startPrice, finalPrice]);
  return (
    <aside>
      <input type="text" onChange={(e) => setStartPrice(e.currentTarget.value)} />
      <input type="text" onChange={(e) => setFinalPrice(e.currentTarget.value)} />
    </aside>
  );
};

export default Sidebar;
