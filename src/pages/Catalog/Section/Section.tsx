import "./section.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NotFound } from "../../../components/NotFound/NotFound";
import SkeletonLoader from "../../../components/Preloader/SkeletonLoader/Skeleton";
import { IProduct } from "../../../@types/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { useInView } from "react-intersection-observer";
import { getCurrentUser } from "../../../redux/selectors";
import { queryApi } from "../../../redux/query";
import { fetchCatalogItems } from "../../../redux/catalog/asyncActions";
import { Modal } from "../../../components/ModalWindow/Modal";

interface SectionProps {
  items: IProduct[];
}

const Section: React.FC<SectionProps> = ({ items }) => {
  const dispatch = useAppDispatch();
  const filterItems = useAppSelector((state) => state.catalog.filterItem);
  const isFilterActive = useAppSelector((state) => state.catalog.filters);
  const notFoundItems = useAppSelector((state) => state.catalog.notFoundItems);
  const status = useAppSelector((state) => state.catalog.status);
  const currentUser = useAppSelector(getCurrentUser);
  const [deleteItem, {}] = queryApi.useDeleteItemFromSectionMutation();
  const [updatePrice, {}] = queryApi.useChangePriceMutation();
  const [showChangingPrice, setShowChangingPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [currentItemId, setCurrentItemId] = useState<string>("");

  const { ref, inView, entry } = useInView({ threshold: 1, triggerOnce: true });

  const onDeleteClick = async (id: string) => {
    await deleteItem(id);
    dispatch(fetchCatalogItems());
  };

  const onUpdateClick = (id: string) => {
    setCurrentItemId(id);
    setShowChangingPrice(true);
  };

  const onSavePriceClick = async (id: string) => {
    let priceString = "$" + price;
    await updatePrice({ price: priceString, id });
    setPrice(0);
    setCurrentItemId("");
    setShowChangingPrice(false);
    dispatch(fetchCatalogItems());
  };

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

  const fakeArr = [...new Array(8)];

  if (notFoundItems) {
    return <NotFound />;
  }

  if (status === "pending") {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        className="catalog__section"
      >
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
      style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      {(filterItems.length === 0 && isFilterActive === false
        ? items
        : filterItems
      ).map((item: IProduct) => {
        return (
          <div ref={ref} key={item.id} className="catalog__section-product">
            <NavLink
              className="catalog__section-product catalog__section-link"
              to={`${item.id}`}
            >
              <img
                loading="lazy"
                onMouseOver={(event) =>
                  handleMouseEnter(event, item?.frontImageUrl)
                }
                onMouseOut={(event) =>
                  handleMouseOut(event, item?.backImageUrl)
                }
                className="catalog__section-image"
                width="228px"
                height="300px"
                src={item.backImageUrl}
                alt={item.title}
              />
              <div className="catalog__section-product-info">
                <span className="catalog__section-product-title">
                  {item.title}
                </span>
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
      })}
      <Modal
        visible={showChangingPrice}
        setVisible={setShowChangingPrice}
        width="140px"
        height="180px"
        justifyContent="center"
        alignItems="center"
      >
        <div className="price__modal">
          <h2>New Price:</h2>
          <input
            type="text"
            placeholder="price"
            onChange={(e) => setPrice(+e.target.value)}
          />
          <div
            className="changePrice-btn"
            onClick={() => onSavePriceClick(currentItemId)}
          >
            Save
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Section;
