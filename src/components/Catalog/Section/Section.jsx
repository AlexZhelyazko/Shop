import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/store';
import { setCartItems } from '../../../redux/cart/cartSlice';
import './section.scss';
import { NavLink } from 'react-router-dom';
import { NotFound } from '../../NotFound/NotFound';
import { useRef, useState } from 'react';

const Section = ({ items, filterItems }) => {
  const imgRef = useRef(null);
  const [productHover, setProductHover] = useState(false);
  const isFilterActive = useSelector((state) => state.catalog.filters);
  const notFoundItems = useSelector((state) => state.catalog.notFoundItems);
  const dispatch = useAppDispatch();

  const handleMouseEnter = (event, imageSrc) => {
    event.target.src = imageSrc;
  };

  const handleMouseOut = (event, imageSrc) => {
    event.target.src = imageSrc;
  };
  console.log(notFoundItems);
  return notFoundItems ? (
    <NotFound />
  ) : (
    <section
      className="catalog__section"
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {(filterItems.length === 0 && isFilterActive === false ? items : filterItems).map((item) => {
        return (
          <div className="catalog__section-product">
            <NavLink
              className="catalog__section-product catalog__section-link"
              to={`${item.price}`}>
              <img
                ref={imgRef}
                onMouseOver={(event) => handleMouseEnter(event, item.frontImageUrl)}
                onMouseOut={(event) => handleMouseOut(event, item.backImageUrl)}
                className="catalog__section-image"
                width="228px"
                height="300px"
                src={productHover ? item.frontImageUrl : item.backImageUrl}
                alt={item.title}
              />
              <div className="catalog__section-product-info">
                <span className="catalog__section-product-title">{item.title}</span>
                <br />
                <span>{item.price}</span>
                {/* <button onClick={() => dispatch(setCartItems(item))}>Add</button> */}
              </div>
            </NavLink>
          </div>
        );
      })}
    </section>
  );
};

export default Section;
