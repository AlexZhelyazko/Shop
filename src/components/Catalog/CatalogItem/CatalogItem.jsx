import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalogItems, getItem } from '../../../redux/catalog/asyncActions';
import { useAppDispatch } from '../../../redux/store';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import './catalogItem.scss';

function CatalogItem() {
  const [currentImage, setCurrentImage] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const params = useParams();
  const item = useSelector((state) => state?.catalog?.currentItem);
  console.log(item);
  useEffect(() => {
    console.log('request');
    dispatch(getItem(params.id));
  }, [params]);
  // const currentItem = items.find((el) => el.id === params.id);
  return (
    <div className="catalogItem__wrapper">
      <div className="catalogItem__image">
        <div>
          <AiOutlineArrowLeft />
          <img src={currentImage ? item?.backImageUrl : item?.frontImageUrl} alt="" />
          <AiOutlineArrowRight onClick={() => setCurrentImage(!currentImage)} />
        </div>
        <div>
          <img
            src={currentImage ? item?.frontImageUrl : item?.backImageUrl}
            style={{ width: '95px' }}
            alt=""
          />
        </div>
      </div>
      <div className="catalogItem__info">
        <div>{item?.price}</div>
        <div>{item?.title}</div>
        <div>{item?.size}</div>
        <div>
          Quantity:{' '}
          <div>
            <span>-</span>
            {count}
            <span>+</span>
          </div>
        </div>
        <button>Add to Cart</button>
        <div>{item?.description}</div>
      </div>
      <div></div>
    </div>
  );
}

export default CatalogItem;
