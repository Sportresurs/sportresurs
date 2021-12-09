import { Grid } from "../../components/Grid";
import AdminList from "../../components/AdminList";
import styles from "./Admins.module.scss";
import RouteGuard from "../../components/RouteGuard";

export default function Admins() {
  return (
    <div className={styles.background}>
      <Grid>
        <RouteGuard>
          <AdminList />
        </RouteGuard>
      </Grid>
    </div>
  );
}
