import classNames from "classnames/bind";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./LoginButton.module.scss";
import AvatarIcon from "../../public/svg/avatarIcon.svg";
import DeleteDialog from "../DeleteDialog";
import getRequestsAmount from "../../utils/getRequestsAmount";

const cx = classNames.bind(styles);

export default function LoginButton({ setIsAdminLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequestsAmount, setNewRequestsAmount] = useState(null);

  useEffect(() => {
    getRequestsAmount().then((data) => setNewRequestsAmount(data));
  }, [isMenuOpen]);

  const handleMenuClose = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleAdminLogOut = async () => {
    setIsDialogOpen(!isDialogOpen);
    setIsMenuOpen(!isMenuOpen);
    setIsAdminLoggedIn(false);
    try {
      const isSignedOut = await signOut();
      if (!isSignedOut) setIsAdminLoggedIn(true);
    } catch {
      setIsAdminLoggedIn(true);
    }
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
          <Link href="/districts">
            <a onClick={handleMenuClose} className={styles.link}>
              Райони{" "}
              {newRequestsAmount > 0 && (
                <span className={styles.amount}>{newRequestsAmount}</span>
              )}
            </a>
          </Link>
          <Link href="/purposes">
            <a onClick={handleMenuClose} className={styles.link}>
              Види спорту{" "}
              {newRequestsAmount > 0 && (
                <span className={styles.amount}>{newRequestsAmount}</span>
              )}
            </a>
          </Link>
          <Link href="/types">
            <a onClick={handleMenuClose} className={styles.link}>
              Типи{" "}
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
