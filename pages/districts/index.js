import React from "react";
import DistrictTable from "../../components/District-table";

import RouteGuard from "../../components/RouteGuard";
import EntityButtonAction from "../../components/EntityButtonAction";
import styles from "./District.module.scss";

function DistrictsAdminMenu({ districts }) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <div className={styles.districtContentWrapper}>
      <RouteGuard>
        <EntityButtonAction selectedRows={selectedRows} pathName="districts" />
        <DistrictTable
          districts={districts}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </RouteGuard>
    </div>
  );
}

export default DistrictsAdminMenu;

export async function getServerSideProps() {
  try {
    const districtsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/district`
    );

    const { districts } = await districtsResponse.json();

    return {
      props: {
        districts,
      },
    };
  } catch (error) {
    throw new Error(`Problem fetch home page content ${error}`);
  }
}
