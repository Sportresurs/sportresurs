import { useState } from "react";
import styles from "./Select.module.scss";

export default function Select({ requestStatus }) {
  const [status, setStatus] = useState(requestStatus);

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
    // should be logic for patch the DB
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      className={styles.select}
      value={status}
      onChange={handleOptionChange}
    >
      <option value="новий">новий</option>
      <option value="в процесі">в процесі</option>
      <option value="оброблено">оброблено</option>
    </select>
  );
}
