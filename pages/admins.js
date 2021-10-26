import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "../components/Grid";
import AdminList from "../components/AdminList/AdminList";

export default function Admins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}api/admin/get-admins`)
      .then((res) => setAdmins(res.data));
  }, []);

  return (
    <div>
      <Grid>
        <AdminList admins={admins} setAdmins={setAdmins} />
      </Grid>
    </div>
  );
}
