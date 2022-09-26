import { useEffect } from 'react';
import './section.scss';

const Section: React.FC<any> = ({ items, filterItems }) => {
  console.log(items);
  console.log(filterItems);

  return (
    <section
      className="catalog__section"
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map((item: any) => {
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
              <span>{item.price}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Section;
