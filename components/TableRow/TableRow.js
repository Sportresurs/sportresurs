import { useSession } from "next-auth/client";
import classNames from "classnames/bind";
import { useState } from "react";
import Select from "../Select";
import styles from "./TableRow.module.scss";
import updateRequestData from "../../utils/updateRequestData";

const cx = classNames.bind(styles);

export default function TableRow({
  id,
  date,
  status,
  admin,
  name,
  tel,
  info,
  options,
}) {
  const [session] = useSession();
  const currentAdminEmail = session?.user.email;

  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentEmail, setCurrentEmail] = useState(admin);

  const getFormattedDate = (dateToFormate) => {
    const rawData = new Date(dateToFormate);
    const formattedDate = rawData.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const handleStatusChange = (e) => {
    setCurrentStatus(e.target.value);

    switch (e.target.value) {
      case "в процесі":
        setCurrentEmail(currentAdminEmail);
        updateRequestData(id, e.target.value, currentAdminEmail);

        break;
      case "оброблено":
        setCurrentEmail(currentAdminEmail);
        updateRequestData(id, e.target.value, currentAdminEmail);
        break;
      case "новий":
        setCurrentEmail(null);
        updateRequestData(id, e.target.value, null);
        break;
      default:
        setCurrentEmail(null);
    }
  };

  return (
    <tr
      key={id}
      className={cx("tableRow", {
        new: currentStatus === "новий",
      })}
    >
      <td className={cx("tableCell", "number")}>{id}.</td>
      <td className={cx("tableCell", "date")}>{getFormattedDate(date)}</td>
      <td className={cx("tableCell", "status")}>
        <Select
          onChange={handleStatusChange}
          value={currentStatus}
          options={options}
          type="table"
        />
      </td>
      <td className={cx("tableCell", "admin")}>{currentEmail || "-"}</td>

      <td className={cx("tableCell", "name")}>{name}</td>
      <td className={cx("tableCell", "tel")}>{tel}</td>
      <td className={cx("tableCell", "info")}>{info || "Без коментаря"}</td>
    </tr>
  );
}
