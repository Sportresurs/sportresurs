import React from "react";

import RouteGuard from "../../components/RouteGuard";
import EntityButtonAction from "../../components/EntityButtonAction";
import styles from "./Purpose.module.scss";

import PurposeTable from "../../components/Purpose-table";

function PurposeAdminMenu({ purposes }) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <div className={styles.districtContentWrapper}>
      <RouteGuard>
        <EntityButtonAction selectedRows={selectedRows} pathName="purposes" />
        <PurposeTable
          purposes={purposes}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </RouteGuard>
    </div>
  );
}

export default PurposeAdminMenu;

export async function getServerSideProps() {
  try {
    const PurposeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/purpose`
    );

    const { purposes } = await PurposeResponse.json();

    return {
      props: {
        purposes,
      },
    };
  } catch (error) {
    throw new Error(`Problem fetch home page content ${error}`);
  }
}
