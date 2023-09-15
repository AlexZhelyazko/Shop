import { NavLink } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "../../../hooks/hook";
import { getCurrentUser } from "../../../redux/selectors";
import SkeletonLoader from "../../../components/Preloader/SkeletonLoader/Skeleton";

interface ItemProps {
  item: any;
  onDeleteClick: any;
  onUpdateClick: any;
}

export const Item: React.FC<ItemProps> = ({
  item,
  onDeleteClick,
  onUpdateClick,
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLImageElement>,
    imageSrc: string
  ) => {
    (event.target as HTMLImageElement).src = imageSrc;
  };

  const handleMouseOut = (
    event: React.MouseEvent<HTMLImageElement>,
    imageSrc: string
  ) => {
    (event.target as HTMLImageElement).src = imageSrc;
  };
  const currentUser = useAppSelector(getCurrentUser);

  return (
    <div key={item.id} className="catalog__section-product">
      <NavLink
        ref={ref}
        className="catalog__section-product catalog__section-link"
        to={`${item.id}`}
      >
        {inView ? (
          <img
            onMouseOver={(event) =>
              handleMouseEnter(event, item?.frontImageUrl)
            }
            onMouseOut={(event) => handleMouseOut(event, item?.backImageUrl)}
            className="catalog__section-image"
            width="228px"
            height="300px"
            src={item.backImageUrl}
            alt={item.title}
          />
        ) : (
          <div>
            <SkeletonLoader></SkeletonLoader>
          </div>
        )}
        <div className="catalog__section-product-info">
          <span className="catalog__section-product-title">{item.title}</span>
          <span>{item.size + " "}</span>
          <span>{item.price} </span>
        </div>
      </NavLink>
      {currentUser.role === "admin" && (
        <div>
          <div
            onClick={() => onDeleteClick(item.id)}
            className="catalog__section-product-delete"
          >
            DELETE
          </div>
          <div
            className="catalog__section-product-change_price"
            onClick={() => onUpdateClick(item.id)}
          >
            CHANGE PRICE
          </div>
        </div>
      )}
    </div>
  );
};
