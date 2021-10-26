import { useState } from "react";
import axios from "axios";
import s from "./AdminList.module.scss";
import Tick from "../../public/svg/tickIcon.svg";
import QuestionMark from "../../public/svg/questionMarkIcon.svg";
import Dagger from "../../public/svg/daggerIcon.svg";
import DeleteIcon from "../../public/svg/deleteIcon.svg";
import EditIcon from "../../public/svg/editIcon.svg";
import AddAdminForm from "../AddAdminForm";
import EditAdminForm from "../EditAdminForm";

export default function AdminList({ admins, setAdmins }) {
  const [visible, setVisible] = useState({ isVisible: false, id: null });

  const handleDelete = async (id) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST}api/admin/delete-admin`,
      {},
      {
        params: {
          id,
        },
      }
    );
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}api/admin/get-admins`)
      .then((res) => setAdmins(res.data));
  };

  const onClickEdit = (id) => {
    setVisible({ isVisible: true, id });
  };

  function pickIcon(status) {
    switch (status) {
      case "confirmed":
        return <Tick className={s.icon} />;
      case "pending":
        return <QuestionMark className={s.icon} />;
      case "deleted":
        return <Dagger className={s.icon} />;
      default:
        return null;
    }
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>Адміністратори</h2>
      {admins.map((admin) => (
        <div key={admin.id} className={s.textContainer}>
          <p className={s.email}>
            {pickIcon(admin.status)}
            {admin.email}
            <button
              className={s.btnIcon}
              onClick={() => handleDelete(admin.id)}
            >
              <DeleteIcon />
            </button>
            <button className={s.btnIcon} onClick={() => onClickEdit(admin.id)}>
              <EditIcon />
            </button>
            {visible.isVisible && visible.id === admin.id ? (
              <EditAdminForm
                setAdmins={setAdmins}
                setVisible={setVisible}
                adminId={admin.id}
                adminEmail={admin.email}
              />
            ) : null}
          </p>
        </div>
      ))}
      <h2 className={s.addAdminTitle}>Додати нового адмістратора</h2>
      <AddAdminForm setAdmins={setAdmins} />
    </div>
  );
}
