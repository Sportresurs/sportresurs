import cn from "classnames/bind";
import AddImage from "../../public/svg/addImage.svg";
import styles from "./EmptyCard.module.scss";
import Spinner from "../Spinner";

const cx = cn.bind(styles);

export default function EmptyCard({ className, isLoading, ...attrs }) {
  return (
    <div className={cx(className, "card")} {...attrs}>
      {isLoading ? (
        <Spinner color="black" />
      ) : (
        <AddImage className={cx("icon")} />
      )}
    </div>
  );
}
