import './section.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NotFound } from '../../NotFound/NotFound';
import SkeletonLoader from '../../Preloader/SleletonLoader/Skeleton';
import { RootState } from '../../../redux/store';
import { IProduct } from '../../../@types/types';

interface SectionProps {
  items: IProduct[];
  filterItems: IProduct[];
}

const Section: React.FC<SectionProps> = ({ items, filterItems }) => {
  const isFilterActive = useSelector((state: RootState) => state.catalog.filters);
  const notFoundItems = useSelector((state: RootState) => state.catalog.notFoundItems);
  const status = useSelector((state: RootState) => state.catalog.status);

  const handleMouseEnter = (event: React.MouseEvent<HTMLImageElement>, imageSrc: string) => {
    (event.target as HTMLImageElement).src = imageSrc;
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLImageElement>, imageSrc: string) => {
    (event.target as HTMLImageElement).src = imageSrc;
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
            (item: IProduct) => {
              return (
                <div className="catalog__section-product">
                  <NavLink
                    className="catalog__section-product catalog__section-link"
                    to={`${item.id}`}>
                    <img
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
