import { Grid } from "../../components/Grid";
import AdminList from "../../components/AdminList";
import styles from "./Admins.module.scss";

export default function Admins() {
  return (
    <div className={styles.background}>
      <Grid>
        <AdminList />
      </Grid>
    </div>
  );
}
