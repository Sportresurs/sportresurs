import s from "../styles/Playgrounds.module.scss";
import { Grid } from "../components/Grid";
import AdminList from "../components/AdminList/AdminList";

export default function Admins() {
  return (
    <div className={s.background}>
      <Grid>
        <AdminList />
      </Grid>
    </div>
  );
}
