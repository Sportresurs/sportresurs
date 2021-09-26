import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "next/image";
import CourtCardInfo from "../CourtCardInfo";
import styles from "./PlaygroundItem.module.scss";
import Tag from "../Tag";
import PlaygroundModal from "../PlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";

const PlaygroundItem = ({ playground, isActive, handleClick }) => {
  const playgroundInfoFields = [
    { label: "Тип майданчика", field: "type" },
    { label: "Графік", field: "opening" },
    { label: "Покриття", field: "covering" },
  ];
  const containerStyleWrapper = classNames(styles.wrapper, {
    [styles.activeWrapper]: isActive,
  });

  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();

  return (
    <div className={containerStyleWrapper} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.bgImage}
            src={playground.image}
            alt=""
            layout="fill"
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tagBtn}>
          <Tag color={playground.color} text={playground.district} />
        </div>
        <CourtCardInfo
          rating={playground.rating}
          color={playground.color}
          address={playground.address}
          courtNumber={playground.courtNumber}
          playground={playground}
          showExtendedInfo={isActive}
          playgroundInfoFields={playgroundInfoFields}
          isList={true}
          modal={handleOpenModal}
        />
      </div>
      <PlaygroundModal
        visible={isModalShown}
        onClose={handleCloseModal}
        playground={playground}
      />
    </div>
  );
};

PlaygroundItem.propTypes = {
  playground: PropTypes.object,
  isActive: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default PlaygroundItem;
