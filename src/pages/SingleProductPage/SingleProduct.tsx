import './singleProduct.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItem } from '../../redux/catalog/asyncActions';
import { RootState } from '../../redux/store';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import ImageMagnifier from '../../components/ImageMagnify/ImageMagnify';
import { Warning } from '../../Icons/Warning/Warning';
import { Modal } from '../../components/ModalWindow/Modal';
import { Spinner } from '../../components/Preloader/Spinner/Spinner';
import { useAppDispatch } from '../../hooks/hook';
import { queryApi } from '../../redux/query';

function SingleProduct() {
  const [warningVisible, setWarningVisible] = useState(false);
  const [addProduct, {}] = queryApi.useAddProductForAuthUserMutation();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const authUserID = useSelector((state: RootState) => state.auth.currentUser);
  let { data, isLoading, isFetching } = queryApi.useGetUserQuery(authUserID.id);
  const [selectValue, setSelectValue] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<boolean>(false);
  const [largeImgEnabled, setLargeImgEnabled] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const dispatch = useAppDispatch();

  const params = useParams();

  const item = useSelector((state: RootState) => state?.catalog?.currentItem);

  useEffect(() => {
    dispatch(getItem(params.id!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const addItemToCart = async (item: any) => {
    let { title, frontImageUrl, price, color } = item;
    let id = Date.now();
    let img = frontImageUrl;
    let size = selectValue || item.size[0];
    if (isAuth) {
      let res = { title, img, count, size, price, color, id };
      let arr = [];
      data.basket.item.forEach((element: any) => {
        arr.push(element);
      });
      arr.push(res);
      await addProduct({
        userId: authUserID.id,
        data: arr,
      });
    } else {
      setWarningVisible(true);
    }
  };

  return Object.keys(item).length === 0 ? (
    <Spinner />
  ) : (
    <>
      <Modal
        setVisible={setWarningVisible}
        visible={warningVisible}
        width="30%"
        height="20%"
        justifyContent="center"
        alignItems="center">
        <Warning text="You must be logged in!" />
      </Modal>
      <div style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
        <div
          className={
            largeImgEnabled ? 'catalogItem__large-image_disabled' : 'catalogItem__wrapper'
          }>
          <div className="catalogItem__image">
            <div className="catalogItem__image-wrapper">
              <AiOutlineArrowLeft onClick={() => setCurrentImage(!currentImage)} />
              <div onClick={() => setLargeImgEnabled(true)}>
                <ImageMagnifier
                  src={currentImage ? item?.backImageUrl || '' : item?.frontImageUrl || ''}
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
            <div className="catalogItem__info-price">{item?.price}</div>
            <div className="catalogItem__info-title">{item?.title}</div>
            <div className="catalogItem__info-size">
              <div>Size:</div>
              <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                {(item?.size || []).map((el: any) => (
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
          <AiOutlineArrowLeft className="svg" onClick={() => setCurrentImage(!currentImage)} />
          <div>
            <img
              onClick={() => setLargeImgEnabled(false)}
              src={currentImage ? item.backImageUrl : item.frontImageUrl}
              alt=""
            />
            <ImCancelCircle
              className="svg"
              style={{ position: 'absolute', top: '4%' }}
              onClick={() => setLargeImgEnabled(false)}
            />
          </div>
          <AiOutlineArrowRight className="svg" onClick={() => setCurrentImage(!currentImage)} />
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
