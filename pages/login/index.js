import { signIn } from "next-auth/client";
import styles from "./Login.module.scss";
import Button from "../../components/Button";

export default function Login() {
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Вітаємо в СпортРесурс</h1>
          <p className={styles.text}>Активуйте свій доступ адміна</p>
          <Button
            onClick={() => signIn()}
            variant="green"
            className={styles.button}
          >
            Google Login
          </Button>
        </div>
      </div>
    </section>
  );
}
