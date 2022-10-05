import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import './section.scss';

const Section: React.FC<any> = ({ items, filterItems }) => {
  const isFilterActive = useSelector((state: RootState) => state.catalog.filters);
  // console.log('items', items);
  // console.log('filteritems', filterItems);

  return (
    <section
      className="catalog__section"
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {(filterItems.length === 0 && isFilterActive === false ? items : filterItems).map(
        (item: any) => {
          return (
            <div className="catalog__section-product">
              <img
                className="catalog__section-image"
                width="228px"
                height="300px"
                src={item.imageUrl}
                alt={item.title}
              />
              <div className="catalog__section-product-info">
                <span>{item.title}</span>
                <div></div>
                <span>{item.price}</span>
              </div>
            </div>
          );
        },
      )}
    </section>
  );
};

export default Section;
