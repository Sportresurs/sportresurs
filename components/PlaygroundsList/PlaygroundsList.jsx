import React, { useState } from "react";
import image from "../../public/img/playgroundItemImage.png";
import PlaygroundItem from "../PlaygroundItem";
import styles from "./PlaygroundsList.module.scss";

const PlaygroundsList = () => {
  const playgrounds = [
    {
      id: 1,
      address: "Тернопільська, 13а, Львів",
      courtNumber: 1,
      rating: 4.5,
      color: "yellow",
      district: "Сихівський",
      type: "спортивний",
      purpose: "не зазначено",
      area: "1630 м. кв.",
      covering: "штучна трава",
      access: "безкоштовний",
      opening: "00:00 - 24:00",
      lighting: "є",
      additionally:
        "огорожа, ворота, тенісний стіл, вуличні тренажери,смітники, лавки, комерційні години (бронювання за телефоном)",
      image,
    },
    {
      id: 2,
      address: "Чорноморська, 12, Львів",
      courtNumber: 2,
      rating: 4,
      color: "red",
      district: "Галицький",
      type: "дитячо-спортивний",
      purpose: "футбольний, дитячий",
      area: "1375 м. кв.",
      covering: "штучна трава",
      access: "безкоштовний",
      opening: "08:00 - 22:00",
      lighting: "є",
      additionally: "дитячі елементи, огорожа, ворота",
      image,
    },
    {
      id: 3,
      address: "вул. П. Орлика, 5-б, Львів",
      courtNumber: 11,
      rating: 4,
      color: "green",
      district: "Шевченківський",
      type: "спортивний",
      purpose: "футбольний, тренажери, корти",
      area: "970 м. кв.",
      covering: "поліуританове",
      access: "безкоштовний",
      opening: "00:00 - 24:00",
      lighting: "є",
      additionally:
        "огорожа, ворота, тенісний стіл, вуличні тренажери,смітники, лавки, комерційні години (бронювання за телефоном)",
      image,
    },
    {
      id: 4,
      address: "вул. Ковельська, 67, Львів",
      courtNumber: 17,
      rating: 4.5,
      color: "orange",
      district: "Личаківський",
      type: "спортивний",
      purpose: "футбольний",
      area: "3000 м. кв.",
      covering: "штучна трава",
      access: "безкоштовний",
      opening: "00:00 - 24:00",
      lighting: "відсутнє",
      additionally: "фут. ворота, огорожа, покриття",
      image,
    },
  ];

  const [activeItemId, setActiveItemId] = useState(null);
  const handleClick = (id) => {
    setActiveItemId(id);
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapperHeading}>Майданчики поблизу</h1>
      <ul className={styles.list}>
        {playgrounds.map((playground) => (
          <li className={styles.listItem} key={playground.id}>
            <PlaygroundItem
              playground={playground}
              isActive={activeItemId === playground.id}
              handleClick={() => {
                handleClick(playground.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaygroundsList;
