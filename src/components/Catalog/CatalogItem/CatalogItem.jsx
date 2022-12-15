import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItem } from '../../../redux/catalog/asyncActions';
import ReactImageMagnify from 'react-image-magnify';
import { useAppDispatch } from '../../../redux/store';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import './catalogItem.scss';

function CatalogItem() {
  const [currentImage, setCurrentImage] = useState(false);
  const [largeImgEnabled, setLargeImgEnabled] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const params = useParams();
  const item = useSelector((state) => state?.catalog?.currentItem);
  useEffect(() => {
    dispatch(getItem(params.id));
  }, [params]);
  return (
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
                    src: currentImage ? item.backImageUrl : item.frontImageUrl,
                  },
                  largeImage: {
                    src: currentImage ? item.backImageUrl : item.frontImageUrl,
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
      </div>
      <div
        className={
          largeImgEnabled ? 'catalogItem__large-image' : 'catalogItem__large-image_disabled'
        }>
        <AiOutlineArrowLeft onClick={() => setCurrentImage(!currentImage)} />
        <img
          onClick={() => setLargeImgEnabled(false)}
          src={currentImage ? item.backImageUrl : item.frontImageUrl}
          alt=""
        />
        <AiOutlineArrowRight onClick={() => setCurrentImage(!currentImage)} />
      </div>
    </div>
  );
}

export default CatalogItem;
