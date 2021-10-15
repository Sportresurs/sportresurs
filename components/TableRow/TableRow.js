import { useSession } from "next-auth/client";
import classNames from "classnames/bind";
import { useState } from "react";
import Select from "../Select";
import styles from "./TableRow.module.scss";

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
  // TODO: will be changed to session.user.mail
  /* const testMail = "remenjuk2010@gmail.com"; */

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

  const updateData = async (requestID, requestStatus, adminEmail) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getRequests`, {
      method: "PATCH",
      body: JSON.stringify({
        id: requestID,
        status: requestStatus,
        email: adminEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleStatusChange = (e) => {
    setCurrentStatus(e.target.value);

    switch (e.target.value) {
      case "в процесі":
        setCurrentEmail(currentAdminEmail);
        updateData(id, e.target.value, currentAdminEmail);

        break;
      case "оброблено":
        setCurrentEmail(currentAdminEmail);
        updateData(id, e.target.value, currentAdminEmail);
        break;
      case "новий":
        setCurrentEmail(null);
        updateData(id, e.target.value, null);
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
