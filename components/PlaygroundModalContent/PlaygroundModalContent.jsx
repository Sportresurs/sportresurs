import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import axios from "axios";
import styles from "./PlaygroundModalContent.module.scss";
import Ratings from "../Rating";
import PlaygroundInfoRow from "../PlaygroundInfoRow";
import Tag from "../Tag";
import ContactUsButton from "../ContactUsButton";
import Slider from "../Slider";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import AdminPlaygroundModal from "../AdminPlaygroundModal/AdminPlaygroundModal";
import placeholderImage from "../../public/img/placeholderImgModal.png";
import DeleteIcon from "../../public/svg/deleteIcon.svg";
import EditIcon from "../../public/svg/editIcon.svg";
import DeleteDialog from "../DeleteDialog";
import useIsAdmin from "../../utils/hooks/useIsAdmin";

const PlaygroundModalContent = ({ playground, color }) => {
  const { isAdmin } = useIsAdmin();
  const playgroundInfoFields = [
    { label: "Тип", value: playground.type },
    {
      label: "Призначення",
      value: playground.Purposes.map((purpose, index, arr) =>
        index === arr.length - 1 ? purpose.title : `${purpose.title}, `
      ),
    },
    { label: "Метраж", value: playground.size },
    { label: "Покриття", value: playground.coating },
    { label: "Доступ", value: playground.access },
    {
      label: "Час роботи",
      value: `${playground.open_time.substring(
        0,
        5
      )} - ${playground.close_time.substring(0, 5)}`,
    },
    { label: "Освітлення", value: playground.light ? "є" : "немає" },
    { label: "Додатково", value: playground.additional },
  ];

  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();
  const [isVisibleDialog, setVisibleDialog] = useState(false);

  const handleDeleteDialogOpen = () => {
    setVisibleDialog(true);
  };

  const handleCancelDeleteDialog = () => {
    setVisibleDialog(false);
  };

  const handleDeleteDialogClose = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/api/playground/delete-playground?id=${playground.id}`
      );
    } finally {
      setVisibleDialog(false);
      window.location.reload(false);
    }
  };

  const [images, setImages] = useState([]);

  function getRelatedImages(courtNumber) {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}api/images/images`, {
        params: { id: courtNumber },
      })
      .then(({ data }) => {
        const imgIDs = [];
        data.forEach((el) => {
          imgIDs.push(el);
        });

        return imgIDs;
      })
      .then((orderData) => setImages(orderData))
      .catch((error) => error);
  }

  useEffect(() => {
    getRelatedImages(playground.id);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        {images.length >= 1 && (
          <Slider
            slidesToShow={1}
            slidesToScroll={1}
            withArrows={true}
            isModal={true}
            classNameBox={styles.sliderBox}
            classNameDots={styles.dots}
            classNameDotsModal={styles.modalDots}
            isArrowColorBlack={false}
            arrayLength={images.length}
          >
            {images.map(({ id, name }) => (
              <img
                alt={name}
                src={`${process.env.NEXT_PUBLIC_HOST}api/images/related/${id}`}
                className={styles.bgImage}
                key={id}
              />
            ))}
          </Slider>
        )}
        {images.length === 0 && (
          <Image
            src={placeholderImage}
            alt="placeholderImg"
            layout="responsive"
          ></Image>
        )}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tagBtn}>
          <Tag color={color} text={playground.district} />
        </div>
        {isAdmin ? (
          <h1 className={styles.heading}>
            Майданчик № {playground.number}
            <EditIcon
              className={styles.icon}
              onClick={() => handleOpenModal()}
            />
            <DeleteIcon
              className={styles.icon}
              onClick={() => handleDeleteDialogOpen()}
            />
          </h1>
        ) : (
          <h1 className={styles.heading}>Майданчик № {playground.number}</h1>
        )}
        <p className={styles.street}>{playground.address}</p>
        <Ratings color={color} readOnly={true} value={playground.rating} />
        <div className={styles.infoWrapper}>
          {playgroundInfoFields.map(({ label, value }, index) => (
            <PlaygroundInfoRow key={index} label={label} value={value} />
          ))}
        </div>
        <div className={styles.contactBtn}>
          <ContactUsButton shouldLockScreen={false} />
        </div>
      </div>
      <AdminPlaygroundModal
        visible={isModalShown}
        onClose={handleCloseModal}
        area={playground}
        images={images}
      />
      <DeleteDialog
        variant="deleteCourt"
        visible={isVisibleDialog}
        onClose={handleDeleteDialogClose}
        onCancel={handleCancelDeleteDialog}
      />
    </div>
  );
};

PlaygroundModalContent.propTypes = {
  playground: PropTypes.object,
  color: PropTypes.string,
};

export default PlaygroundModalContent;
