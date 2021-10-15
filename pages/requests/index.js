import classNames from "classnames/bind";
import styles from "./Requests.module.scss";
import data from "../../utils/testData/testRequestArr";
import TableRow from "../../components/TableRow";

const cx = classNames.bind(styles);

export default function Requests({ requests }) {
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
            {requests.map(
              ({
                id,
                status,
                // eslint-disable-next-line camelcase
                admin_email,
                name,
                phone,
                details,
                createdAt,
              }) => (
                <TableRow
                  key={id}
                  id={id}
                  date={createdAt}
                  status={status}
                  // eslint-disable-next-line camelcase
                  admin={admin_email}
                  name={name}
                  tel={phone}
                  info={details}
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

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getRequests`, {
    method: "GET",
  });
  const requests = await res.json();
  return {
    props: {
      requests: requests.userRequests,
    },
  };
}
