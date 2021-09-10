import { useState } from "react";
import Button from "../Button/Button";
import { Grid } from "../grid/Grid";
import styles from "./SearchSection.module.scss";
import SearchIcon from "../../public/svg/searchIcon.svg";
import Basket from "../../public/svg/basketballIcon.svg";
import Football from "../../public/svg/footballIcon.svg";
import Child from "../../public/svg/childrenIcon.svg";
import Tenis from "../../public/svg/tenisIcon.svg";
import Close from "../../public/svg/closeAutoCIcon.svg";

export default function SearchSection() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleInputClear = () => {
    setValue("");
  };

  return (
    <section className={styles.section}>
      <Grid>
        <div className={styles.box}>
          <h2 className={styles.title}>Знайди свій ідеальний майданчик</h2>

          <form className={styles.form}>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                placeholder="Введіть назву вулиці"
                value={value}
                onChange={handleChange}
              />

              {value && (
                <button
                  className={styles.fromBtnClose}
                  type="button"
                  onClick={handleInputClear}
                >
                  <Close className={styles.fromBtnCloseIcon}></Close>
                </button>
              )}
            </div>

            <button className={styles.formBtn} type="button">
              <span className={styles.formBtnContent}>Пошук майданчика</span>
              <SearchIcon className={styles.formBtnIcon} />
            </button>
          </form>

          <ul className={styles.btnList}>
            <li className={styles.btnItem}>
              <Button variant="orange" size="medium">
                <span className={styles.btnContent}>Баскетбольний</span>
                <Basket className={styles.btnIcon} />
              </Button>
            </li>
            <li className={styles.btnItem}>
              <Button variant="green" size="medium">
                <span className={styles.btnContent}>Футбольний</span>
                <Football className={styles.btnIcon} />
              </Button>
            </li>
            <li className={styles.btnItem}>
              <Button variant="blue" size="medium">
                <span className={styles.btnContent}>Дитячий</span>
                <Child className={styles.btnIcon} />
              </Button>
            </li>
            <li className={styles.btnItem}>
              <Button variant="lilac" size="medium">
                <span className={styles.btnContent}>Тенісний</span>
                <Tenis className={styles.btnIcon} />
              </Button>
            </li>
          </ul>
        </div>
      </Grid>
    </section>
  );
}
