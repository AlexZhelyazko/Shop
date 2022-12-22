import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItem } from '../../../redux/catalog/asyncActions';
import ReactImageMagnify from 'react-image-magnify';
import { useAppDispatch } from '../../../redux/store';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import './catalogItem.scss';

function CatalogItem() {
  const [currentImage, setCurrentImage] = useState(false);
  const [largeImgEnabled, setLargeImgEnabled] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const params = useParams();
  const item = useSelector((state) => state?.catalog?.currentItem);
  console.log(Object.keys(item).length === 0);
  useEffect(() => {
    dispatch(getItem(params.id));
  }, [params.id]);

  return Object.keys(item).length === 0 ? (
    <div>Load</div>
  ) : (
    <div>
      <div
        className={largeImgEnabled ? 'catalogItem__large-image_disabled' : 'catalogItem__wrapper'}>
        <div className="catalogItem__image">
          <div className="catalogItem__image-wrapper">
            <AiOutlineArrowLeft onClick={() => setCurrentImage(!currentImage)} />
            <div onClick={() => setLargeImgEnabled(true)}>
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
            </div>
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
          <div className="catalogItem__info-title">{item?.title}</div>
          <div>
            <div>Size:</div>
            <select>
              {item?.size.map((el) => (
                <option key={el}>{el}</option>
              ))}
            </select>
          </div>
          <div>
            <div>Quantity:</div>
            <div>
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
          <button>Add to Cart</button>
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

export default CatalogItem;
