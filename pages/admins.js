import { Grid } from "../components/Grid";
import AdminList from "../components/AdminList/AdminList";
import RouteGuard from "../components/RouteGuard";

export default function Admins() {
  return (
    <div>
      <Grid>
        <RouteGuard>
          <AdminList />
        </RouteGuard>
      </Grid>
    </div>
  );
}
