import { useState } from "react";
import styles from "./TopCourts.module.scss";
import CourtCard from "../CourtCard";
import Slider from "../Slider";
import useWindowSize from "../../utils/hooks/findWindowSize";
import useIsAdmin from "../../utils/hooks/useIsAdmin";
import EmptyCard from "../EmptyCard/EmptyCard";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import SearchPlaygroundModal from "../SearchPlaygroundModal/SearchPlaygroundModal";
import useAsyncData from "../../utils/hooks/useAsyncData";
import playgroundService from "../../api/playgroundService";
import BasketIcon from "../../public/svg/basket.svg";
import Spinner from "../Spinner";

const DEFAULT_COUNT = 4;
function getAdminList(list) {
  const missingItemsCount = DEFAULT_COUNT - list.length;
  return missingItemsCount > 0
    ? [
        ...list,
        ...Array.from({ length: missingItemsCount }).map((_, index) => ({
          id: `fake-${index}`,
          isEmpty: true,
        })),
      ]
    : list;
}
function CourtCardWrapper({ court, isAdmin, onAdd, onDelete }) {
  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();
  const { isLoading, requestData } = useAsyncData(playgroundService.patch, {
    runOnMount: false,
  });
  const handleSave = async (selected) => {
    handleCloseModal();
    const { area } = await requestData(selected, {
      featured: true,
    });
    if (area) {
      onAdd(area);
    }
  };
  const handleDelete = async () => {
    await requestData(court.id, {
      featured: false,
    });
    onDelete(court.id);
  };
  if (court.isEmpty) {
    return (
      <>
        <EmptyCard
          id={court.id}
          isLoading={isLoading}
          onClick={handleOpenModal}
        />
        <SearchPlaygroundModal
          visible={isModalShown}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </>
    );
  }
  if (isAdmin) {
    return (
      <div className={styles.adminCardWrapper}>
        <button className={styles.adminDeleteButton} onClick={handleDelete}>
          {isLoading ? (
            <Spinner color="black" />
          ) : (
            <BasketIcon className={styles.adminDeleteIcon} />
          )}
        </button>
        <CourtCard courtInfo={court} />
      </div>
    );
  }
  return <CourtCard courtInfo={court} />;
}
export default function TopCourts({ courtList }) {
  const size = useWindowSize();
  const [list, setList] = useState(courtList);
  const onAdd = (playground) => {
    setList((currentList) => [...currentList, playground]);
  };
  const onDelete = (id) => {
    setList((currentList) => currentList.filter((pl) => pl.id !== id));
  };
  const { isAdmin } = useIsAdmin();

  const listToRender = isAdmin ? getAdminList(list) : list;
  return (
    <section className={styles.topCourts}>
      <h2 className={styles.title}>Наші найкращі локації</h2>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {size.width <= 1150 && (
            <Slider
              slidesToShow={listToRender.length}
              slidesToScroll={1}
              isInfinite={true}
              withArrows={false}
              isModal={false}
              isAutoplay={true}
              isVariableWidth={true}
              arrayLength={listToRender.length}
              classNameBox={styles.topCourtsSlider}
              responsive={[
                {
                  breakpoint: 1150,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 630,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {listToRender.map((court) => (
                <li key={court.id} className={styles.listItem}>
                  <CourtCardWrapper
                    court={court}
                    isAdmin={isAdmin}
                    onAdd={onAdd}
                    onDelete={onDelete}
                  />
                </li>
              ))}
            </Slider>
          )}
          {size.width >= 1151 &&
            listToRender.map((court) => (
              <li key={court.id} className={styles.listItem}>
                <CourtCardWrapper
                  court={court}
                  isAdmin={isAdmin}
                  onAdd={onAdd}
                  onDelete={onDelete}
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
