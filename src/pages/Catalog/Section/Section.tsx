import "./section.scss";
import { useState, useEffect } from "react";
import { NotFound } from "../../../components/NotFound/NotFound";
import SkeletonLoader from "../../../components/Preloader/SkeletonLoader/Skeleton";
import { IProduct } from "../../../@types/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { queryApi } from "../../../redux/query";
import { fetchCatalogItems } from "../../../redux/catalog/asyncActions";
import { Modal } from "../../../components/ModalWindow/Modal";
import { Item } from "./Item";

interface SectionProps {
  items: IProduct[];
  showFilter: boolean;
}

const Section: React.FC<SectionProps> = ({ items, showFilter }) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const dispatch = useAppDispatch();
  const filterItems = useAppSelector((state) => state.catalog.filterItem);
  const isFilterActive = useAppSelector((state) => state.catalog.filters);
  const notFoundItems = useAppSelector((state) => state.catalog.notFoundItems);
  const status = useAppSelector((state) => state.catalog.status);
  const [deleteItem, {}] = queryApi.useDeleteItemFromSectionMutation();
  const [updatePrice, {}] = queryApi.useChangePriceMutation();
  const [showChangingPrice, setShowChangingPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [currentItemId, setCurrentItemId] = useState<string>("");

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
      style={
        windowSize[0] > 500 || (!showFilter && windowSize[0] < 500)
          ? { display: "flex", flexDirection: "row", flexWrap: "wrap" }
          : { display: "none" }
      }
    >
      {(filterItems.length === 0 && isFilterActive === false
        ? items
        : filterItems
      ).map((item: IProduct) => {
        return (
          <Item
            key={item.id}
            onUpdateClick={onUpdateClick}
            onDeleteClick={onDeleteClick}
            item={item}
          />
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
