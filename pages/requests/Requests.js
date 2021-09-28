import classNames from "classnames/bind";
import styles from "./Requests.module.scss";
import data from "../../utils/testData/testRequestArr";
import TableRow from "../../components/TableRow/TableRow";

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
                <TableRow
                  key={id}
                  id={id}
                  date={date}
                  status={status}
                  admin={admin}
                  name={name}
                  tel={tel}
                  info={info}
                  dataMaker={dataMaker}
                  options={data.statusOptions}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
