import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalogItems } from '../../../redux/catalog/asyncActions';
import { useAppDispatch } from '../../../redux/store';
import './catalogItem.scss';

function CatalogItem() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const items = useSelector((state) => state.catalog.items);
  const currentItem = items.find((el) => el.id === params.id);
  useEffect(() => {
    dispatch(fetchCatalogItems());
  }, []);
  console.log(currentItem);
  return (
    <div className="catalogItem__wrapper">
      <div className="catalogItem__image">
        <img src={currentItem.frontImageUrl} alt="" />
      </div>
      <div className="catalogItem__info">
        <div>{currentItem.price}</div>
        <div>{currentItem.title}</div>
        <div></div>
      </div>
    </div>
  );
}

export default CatalogItem;
