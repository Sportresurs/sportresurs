import classNames from "classnames/bind";
import styles from "./Requests.module.scss";
import Select from "../../components/Select";
import data from "../../utils/testData/testRequestArr";

const cx = classNames.bind(styles);

export default function Requests() {
  const dataMaker = (date) => {
    const rawData = new Date(date);
    const adjustedDate = rawData.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return adjustedDate;
  };
  return (
    <section className={styles.requests}>
      <div className={styles.container}>
        <h1 className={styles.title}>Запити на дзвінки</h1>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={cx("headCell", "number")}>№</th>
              <th className={cx("headCell", "data")}>Дата</th>
              <th className={cx("headCell", "status")}>Статус</th>
              <th className={cx("headCell", "admin")}>Адміністратор</th>
              <th className={cx("headCell", "name")}>Ім’я</th>
              <th className={cx("headCell", "tel")}>Телефон</th>
              <th className={cx("headCell", "info")}>Додаткова інформація</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.requests.map(
              ({ id, date, status, admin, name, tel, info }) => (
                <tr
                  key={id}
                  className={cx("tableRow", {
                    new: status === "новий",
                  })}
                >
                  <td className={cx("tableCell", "number")}>{id}.</td>
                  <td className={cx("tableCell", "date")}>{dataMaker(date)}</td>
                  <td className={cx("tableCell", "status")}>
                    <Select
                      defaultValue={status}
                      options={data.statusOptions}
                      type="table"
                    />
                  </td>
                  <td className={cx("tableCell", "admin")}>{admin || "-"}</td>
                  <td className={cx("tableCell", "name")}>{name}</td>
                  <td className={cx("tableCell", "tel")}>{tel}</td>
                  <td className={cx("tableCell", "info")}>{info}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
