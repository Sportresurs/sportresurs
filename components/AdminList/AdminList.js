import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import s from "./AdminList.module.scss";
import Tick from "../../public/svg/tickIcon.svg";
import QuestionMark from "../../public/svg/questionMarkIcon.svg";
import Dagger from "../../public/svg/daggerIcon.svg";
import DeleteIcon from "../../public/svg/deleteIcon.svg";
import EditIcon from "../../public/svg/editIcon.svg";
import AddAdminForm from "../AddAdminForm";
import EditAdminForm from "../EditAdminForm";
import useFetchData from "../../utils/hooks/useFetchData";

export default function AdminList() {
  const [adminList] = useFetchData(
    `${process.env.NEXT_PUBLIC_HOST}api/admin/get-admins`,
    []
  );

  // const data = [
  //   {
  //     id: 0,
  //     email: "zelykrostyslav@email.com",
  //     status: "logged",
  //   },
  //   {
  //     id: 1,
  //     email: "denysgolovko@email.com",
  //     status: "logged",
  //   },
  //   {
  //     id: 2,
  //     email: "lebronjames@email.com",
  //     status: "notLoggedIn",
  //   },
  //   {
  //     id: 3,
  //     email: "giannisantetokounmpo@email.com",
  //     status: "deleted",
  //   },
  // ];

  const eAdminStatus = {
    LOGGED: "logged",
    NOTLOGGED: "notLoggedIn",
    DELETED: "deleted",
  };

  const [admins, setAdmins] = useState(adminList);
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState({ isVisible: false, id: null });
  const [editEmail, setEditEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = admins.concat({
      email,
      id: uuidv4(),
      status: eAdminStatus.NOTLOGGED,
    });
    setAdmins(newList);
    setEmail("");
  };

  const handleChange = useCallback((e) => {
    const { target } = e;
    const { value } = target;
    setEmail(value);
  }, []);

  const handleChangeEdit = useCallback((e) => {
    const { target } = e;
    const { value } = target;
    setEditEmail(value);
  }, []);

  const handleSubmitEdit = (id) => (event) => {
    event.preventDefault();
    const elementsIndex = admins.findIndex((element) => element.id === id);
    const newArray = [...admins];
    newArray[elementsIndex] = { ...newArray[elementsIndex], email: editEmail };
    setAdmins(newArray);
    setVisible({ isVisible: false, id });
  };

  const handleDelete = useCallback(
    (id) => {
      const newList = admins.filter((admin) => admin.id !== id);
      setAdmins(newList);
    },
    [admins]
  );

  const onClickEdit = useCallback((adminEmail, id) => {
    setVisible({ isVisible: true, id });
    setEditEmail(adminEmail);
  }, []);

  function pickIcon(status) {
    switch (status) {
      case status === eAdminStatus.LOGGED:
        return <Tick className={s.icon} />;
      case status === eAdminStatus.NOTLOGGED:
        return <QuestionMark className={s.icon} />;
      case status === eAdminStatus.DELETED:
        return <Dagger className={s.icon} />;
      default:
        return null;
    }
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>Адміністратори</h2>
      {adminList.map((admin) => (
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
            <button
              className={s.btnIcon}
              onClick={() => onClickEdit(admin.email, admin.id)}
            >
              <EditIcon />
            </button>
            {visible.isVisible && visible.id === admin.id ? (
              <EditAdminForm
                value={editEmail}
                handleChange={handleChangeEdit}
                handleSubmit={handleSubmitEdit}
                adminId={admin.id}
              />
            ) : null}
          </p>
        </div>
      ))}
      <h2 className={s.addAdminTitle}>Додати нового адмістратора</h2>
      <AddAdminForm
        value={email}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
