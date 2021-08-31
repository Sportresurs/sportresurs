import React from "react";
import styles from "./modal.module.scss";

const PlaygroundInfo = () => (
  <div className={styles.info_wrapper}>
    <p>
      <b>Тип майданчика:</b> спортивний
    </p>
    <p>
      <b>Рік відкриття:</b> 2014
    </p>
    <p>
      <b>Метраж</b> 1630 м.кв.
    </p>
    <p>
      <b>Покриття:</b> штучна трава
    </p>
    <p>
      <b>Доступ:</b> безкоштовний
    </p>
    <p>
      <b>Час роботи:</b> 08:00 - 22:00
    </p>
    <p>
      <b>Освітлення:</b> є
    </p>
    <p>
      <b>Додатково:</b> огорожа, ворота, тенісний стіл, вуличні
      тренажери,смітники, лавки, комерційні години (бронювання за телефоном)
    </p>
  </div>
);

export default PlaygroundInfo;
