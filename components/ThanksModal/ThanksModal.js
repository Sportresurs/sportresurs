import PropTypes from "prop-types";
import Button from "../Button";
import s from "./ThanksModal.module.scss";
import Modal from "../Modal";
import ThumbUpIcon from "../../public/svg/thumbUp.svg";

export default function ThanksModal({ isShow, variant = "client", onClose }) {
  return (
    <Modal
      shouldLockScreen={false}
      variant="small"
      visible={isShow}
      onClose={onClose}
    >
      <div className={s.modal}>
        <ThumbUpIcon className={s.icon} />
        <h3 className={s.title}>Готово!</h3>
        <p className={s.text}>
          {variant === "client"
            ? "Ми отримали ваші дані і скоро вам зателефонуємо"
            : "Ваші зміни збережено"}
        </p>
        <Button variant="black" size="medium" onClick={onClose}>
          Добре
        </Button>
      </div>
    </Modal>
  );
}

ThanksModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  variant: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
