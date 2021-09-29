import classNames from "classnames/bind";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./LoginButton.module.scss";
import AvatarIcon from "../../public/svg/avatarIcon.svg";
import DeleteDialog from "../DeleteDialog";

const cx = classNames.bind(styles);

export default function LoginButton({ setIsAdminLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequestsAmount, setNewRequestsAmount] = useState(0);

  useEffect(() => {
    // fetch logic to get amount of new requests
    // fake fetch
    setNewRequestsAmount(5);
  }, []);

  const handleMenuClose = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleAdminLogOut = () => {
    setIsDialogOpen(!isDialogOpen);
    setIsMenuOpen(!isMenuOpen);
    setIsAdminLoggedIn(false);
    signOut();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={handleMenuClose}>
          <AvatarIcon />
          {newRequestsAmount > 0 && (
            <p className={styles.requests}>
              <span className={styles.amount}>{newRequestsAmount}</span>
            </p>
          )}
        </button>
        <div
          className={cx("menu", {
            isMenuOpen,
          })}
        >
          <Link href="/admins">
            <a onClick={handleMenuClose} className={styles.link}>
              Адміністратори
            </a>
          </Link>

          <Link href="/requests">
            <a onClick={handleMenuClose} className={styles.link}>
              Запити{" "}
              {newRequestsAmount > 0 && (
                <span className={styles.amount}>{newRequestsAmount}</span>
              )}
            </a>
          </Link>
          <Link href="">
            <a onClick={handleOpenDialog} className={styles.link}>
              Вийти
            </a>
          </Link>
        </div>
      </div>
      <DeleteDialog
        variant="adminLogout"
        visible={isDialogOpen}
        shouldLockScreen={true}
        onCancel={handleOpenDialog}
        onClose={handleAdminLogOut}
        forAdminLogOut={true}
      />
    </>
  );
}
