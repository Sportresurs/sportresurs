import classNames from "classnames/bind";
import styles from "./Requests.module.scss";
import Select from "../../components/Select";
import data from "../../utils/testData/testRequestArr";

const cx = classNames.bind(styles);

export default function Requests() {
  return (
    <section className={styles.requests}>
      <div className={styles.container}>
        <h1 className={styles.title}>Запити на дзвінки</h1>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>№</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Адміністратор</th>
              <th>Ім’я</th>
              <th>Телефон</th>
              <th>Додаткова інформація</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map(({ id, date, status, admin, name, tel, info }) => (
              <tr
                key={id}
                className={cx("tableRow", {
                  new: status === "новий",
                })}
              >
                <td>{id}.</td>
                <td>{date}</td>
                <td>
                  <Select requestStatus={status} />
                </td>
                <td>{admin || "-"}</td>
                <td>{name}</td>
                <td>{tel}</td>
                <td>{info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
