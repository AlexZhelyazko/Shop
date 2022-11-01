import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { setCartItems } from '../../../redux/cart/cartSlice';
import './section.scss';
import { NavLink } from 'react-router-dom';

const Section: React.FC<any> = ({ items, filterItems }) => {
  const isFilterActive = useSelector((state: RootState) => state.catalog.filters);

  const dispatch = useAppDispatch();

  return (
    <section
      className="catalog__section"
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {(filterItems.length === 0 && isFilterActive === false ? items : filterItems).map(
        (item: any) => {
          return (
            <div className="catalog__section-product">
              <NavLink className="catalog__section-link" to={`${item.price}`}>
                <img
                  className="catalog__section-image"
                  width="228px"
                  height="300px"
                  src={item.imageUrl}
                  alt={item.title}
                />
              </NavLink>
              <div className="catalog__section-product-info">
                <span>{item.title}</span>
                <div></div>
                <span>{item.price}</span>
              </div>
              <button onClick={() => dispatch(setCartItems(item))}>Add</button>
            </div>
          );
        },
      )}
    </section>
  );
};

export default Section;
