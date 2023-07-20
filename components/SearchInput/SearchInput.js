import cn from "classnames/bind";
import styles from "./SearchInput.module.scss";

const cx = cn.bind(styles);

export default function SearchInput({ className, clear, ...attrs }) {
  return (
    <div className={cx("inputBox", className)}>
      <input {...attrs} className={cx("input")} />
      {clear && (
        <button className={cx("clear")} onClick={clear}>
          &times;
        </button>
      )}
    </div>
  );
}
