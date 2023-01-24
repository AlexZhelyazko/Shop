import './catalogItem.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItem } from '../../redux/catalog/asyncActions';
import { useAppDispatch } from '../../redux/store';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { setCartItems } from '../../redux/cart/cartSlice';

function SingleProduct() {
  const [selectValue, setSelectValue] = useState('');
  const [currentImage, setCurrentImage] = useState(false);
  const [largeImgEnabled, setLargeImgEnabled] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const params = useParams();
  const item = useSelector((state) => state?.catalog?.currentItem);
  useEffect(() => {
    dispatch(getItem(params.id));
  }, [params.id]);

  useEffect(() => {
    if (item.size !== undefined) {
      setSelectValue(item?.size[0]);
    }
  }, []);

  const addItemToCart = (item) => {
    let title = item.title;
    let img = item.frontImageUrl;
    dispatch(setCartItems({ title, img, count, selectValue }));
  };

  return Object.keys(item).length === 0 ? (
    <div>Load</div>
  ) : (
    <div>
      <div
        className={largeImgEnabled ? 'catalogItem__large-image_disabled' : 'catalogItem__wrapper'}>
        <div className="catalogItem__image">
          <div className="catalogItem__image-wrapper">
            <AiOutlineArrowLeft onClick={() => setCurrentImage(!currentImage)} />
            {/* <div onClick={() => setLargeImgEnabled(true)}>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: '',
                    isFluidWidth: true,
                    src: currentImage ? item?.backImageUrl : item?.frontImageUrl,
                  },
                  largeImage: {
                    src: currentImage ? item?.backImageUrl : item?.frontImageUrl,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </div> */}
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
          <div className="catalogItem__info-price">{item?.price}</div>
          <div className="catalogItem__info-title">{item?.title}</div>
          <div className="catalogItem__info-size">
            <div>Size:</div>
            <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
              {item?.size.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <div className="catalogItem__info-quantity">
            <div>Quantity:</div>
            <div className="catalogItem__info-quantity_counter">
              <span
                onClick={() =>
                  setCount((prev) => {
                    if (prev === 0) {
                      return 0;
                    }
                    return prev - 1;
                  })
                }>
                -
              </span>
              {count}
              <span onClick={() => setCount((prev) => prev + 1)}>+</span>
            </div>
          </div>
          <button
            disabled={!count}
            onClick={() => addItemToCart(item)}
            className="catalogItem__info-addBtn">
            Add to Cart
          </button>
          <div>{item?.description}</div>
        </div>
      </div>
      <div
        className={
          largeImgEnabled ? 'catalogItem__large-image' : 'catalogItem__large-image_disabled'
        }>
        <AiOutlineArrowLeft onClick={() => setCurrentImage(!currentImage)} />
        <div>
          <img
            onClick={() => setLargeImgEnabled(false)}
            src={currentImage ? item.backImageUrl : item.frontImageUrl}
            alt=""
          />
          <ImCancelCircle
            style={{ position: 'absolute', top: '4%' }}
            onClick={() => setLargeImgEnabled(false)}
          />
        </div>
        <AiOutlineArrowRight onClick={() => setCurrentImage(!currentImage)} />
      </div>
    </div>
  );
}

export default SingleProduct;
