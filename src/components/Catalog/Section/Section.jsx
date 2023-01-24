import { useSelector } from 'react-redux';
import './section.scss';
import { NavLink } from 'react-router-dom';
import { NotFound } from '../../NotFound/NotFound';
import { useRef } from 'react';
import SkeletonLoader from '../../Preloader/SleletonLoader/Skeleton';

const Section = ({ items, filterItems }) => {
  const imgRef = useRef(null);
  const isFilterActive = useSelector((state) => state.catalog.filters);
  const notFoundItems = useSelector((state) => state.catalog.notFoundItems);
  const status = useSelector((state) => state.catalog.status);

  const handleMouseEnter = (event, imageSrc) => {
    event.target.src = imageSrc;
  };

  const handleMouseOut = (event, imageSrc) => {
    event.target.src = imageSrc;
  };
  const fakeArr = [...new Array(8)];
  return notFoundItems ? (
    <NotFound />
  ) : (
    <section
      className="catalog__section"
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {status === 'pending'
        ? fakeArr.map(() => (
            <div className="catalog__section-product">
              <SkeletonLoader />
            </div>
          ))
        : (filterItems.length === 0 && isFilterActive === false ? items : filterItems).map(
            (item) => {
              return (
                <div className="catalog__section-product">
                  <NavLink
                    className="catalog__section-product catalog__section-link"
                    to={`${item.id}`}>
                    <img
                      ref={imgRef}
                      onMouseOver={(event) => handleMouseEnter(event, item.frontImageUrl)}
                      onMouseOut={(event) => handleMouseOut(event, item.backImageUrl)}
                      className="catalog__section-image"
                      width="228px"
                      height="300px"
                      src={item.backImageUrl}
                      alt={item.title}
                    />
                    <div className="catalog__section-product-info">
                      <span className="catalog__section-product-title">{item.title}</span>
                      <span>{item.size + ' '}</span>
                      <span>{item.price} </span>
                    </div>
                  </NavLink>
                </div>
              );
            },
          )}
    </section>
  );
};

export default Section;
