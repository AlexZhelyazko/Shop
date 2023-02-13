import './section.scss';
import { NavLink } from 'react-router-dom';
import { NotFound } from '../../../components/NotFound/NotFound';
import SkeletonLoader from '../../../components/Preloader/SkeletonLoader/Skeleton';
import { IProduct } from '../../../@types/types';
import { useAppSelector } from '../../../hooks/hook';
import { useInView } from 'react-intersection-observer';

interface SectionProps {
  items: IProduct[];
}

const Section: React.FC<SectionProps> = ({ items }) => {
  //
  const filterItems = useAppSelector((state) => state.catalog.filterItem);
  const isFilterActive = useAppSelector((state) => state.catalog.filters);
  const notFoundItems = useAppSelector((state) => state.catalog.notFoundItems);
  const status = useAppSelector((state) => state.catalog.status);

  const { ref, inView, entry } = useInView({ threshold: 1, triggerOnce: true });

  const handleMouseEnter = (event: React.MouseEvent<HTMLImageElement>, imageSrc: string) => {
    (event.target as HTMLImageElement).src = imageSrc;
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLImageElement>, imageSrc: string) => {
    (event.target as HTMLImageElement).src = imageSrc;
  };

  const fakeArr = [...new Array(8)];

  if (notFoundItems) {
    return <NotFound />;
  }

  if (status === 'pending') {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        className="catalog__section">
        {fakeArr.map((_, ind) => (
          <div key={ind} className="catalog__section-product">
            <SkeletonLoader />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      className="catalog__section"
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {(filterItems.length === 0 && isFilterActive === false ? items : filterItems).map(
        (item: IProduct) => {
          return (
            <div ref={ref} key={item.id} className="catalog__section-product">
              <NavLink className="catalog__section-product catalog__section-link" to={`${item.id}`}>
                <img
                  loading="lazy"
                  onMouseOver={(event) => handleMouseEnter(event, item?.frontImageUrl)}
                  onMouseOut={(event) => handleMouseOut(event, item?.backImageUrl)}
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
