import { useState, useCallback } from "react";
import axios from "axios";
import s from "./AdminList.module.scss";
import Tick from "../../public/svg/tickIcon.svg";
import QuestionMark from "../../public/svg/questionMarkIcon.svg";
import Dagger from "../../public/svg/daggerIcon.svg";
import DeleteIcon from "../../public/svg/deleteIcon.svg";
import EditIcon from "../../public/svg/editIcon.svg";
import AddAdminForm from "../AddAdminForm";
import EditAdminForm from "../EditAdminForm";
import useFetchData from "../../utils/hooks/useFetchData";
import Spinner from "../Spinner";
import DeleteDialog from "../DeleteDialog";

export default function AdminList() {
  const [adminList, isLoading] = useFetchData(
    `${process.env.NEXT_PUBLIC_HOST}api/admin/get-admins`,
    []
  );

  const eAdminStatus = {
    CONFIRMED: "confirmed",
    PENDING: "pending",
    DELETED: "deleted",
  };

  const [visible, setVisible] = useState({ isVisible: false, id: null });
  const [adminToDelete, setAdminToDelete] = useState(null);

  const handleSetAdminToDelete = (adminId) => {
    setAdminToDelete(adminId);
  };

  const handleCancelAdminToDelete = () => {
    setAdminToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}api/admin/delete-admin?id=${adminToDelete}`
      );
    } finally {
      setAdminToDelete(null);
      window.location.reload(false);
    }
  };

  const onClickEdit = useCallback((id) => {
    setVisible({ isVisible: true, id });
  }, []);

  const onClickEditCancel = useCallback(() => {
    setVisible({ isVisible: false, id: null });
  }, []);

  function pickIcon(status) {
    if (status === eAdminStatus.CONFIRMED) return <Tick className={s.icon} />;
    if (status === eAdminStatus.PENDING)
      return <QuestionMark className={s.icon} />;
    if (status === eAdminStatus.DELETED) return <Dagger className={s.icon} />;

    return null;
  }

  if (isLoading) {
    return (
      <div className={s.loadingContainer}>
        <Spinner size="50px" color="black" />
      </div>
    );
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
              onClick={() => {
                handleSetAdminToDelete(admin.id);
              }}
            >
              <DeleteIcon />
            </button>
            <button
              className={s.btnIcon}
              type="button"
              onClick={() => onClickEdit(admin.id)}
            >
              <EditIcon />
            </button>
            {visible.isVisible && visible.id === admin.id ? (
              <EditAdminForm admin={admin} cancel={onClickEditCancel} />
            ) : null}
          </p>
        </div>
      ))}
      <h2 className={s.addAdminTitle}>Додати нового адмістратора</h2>
      <AddAdminForm />
      <DeleteDialog
        variant="deleteAdmin"
        visible={adminToDelete}
        onClose={handleDelete}
        onCancel={handleCancelAdminToDelete}
      />
    </div>
  );
}
