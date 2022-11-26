import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalogItems } from '../../../redux/catalog/asyncActions';
import { useAppDispatch } from '../../../redux/store';
import './catalogItem.scss';

function CatalogItem() {
  const [count, setCount] = useState(0);
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
        <div>
          <img src={currentItem.backImageUrl} style={{ width: '95px' }} alt="" />
        </div>
      </div>
      <div className="catalogItem__info">
        <div>{currentItem.price}</div>
        <div>{currentItem.title}</div>
        <div>{currentItem.size}</div>
        <div>
          Quantity:{' '}
          <div>
            <span>-</span>
            {count}
            <span>+</span>
          </div>
        </div>
        <button>Add to Cart</button>
        <div>{currentItem.description}</div>
      </div>
      <div></div>
    </div>
  );
}

export default CatalogItem;
