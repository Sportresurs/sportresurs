import React from "react";

import RouteGuard from "../../components/RouteGuard";
import EntityButtonAction from "../../components/EntityButtonAction";
import styles from "./Types.module.scss";
import TypesTable from "../../components/Types-table";

function TypesAdminMenu({ types }) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  return (
    <div className={styles.districtContentWrapper}>
      <RouteGuard>
        <EntityButtonAction selectedRows={selectedRows} pathName="types" />
        <TypesTable
          types={types}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </RouteGuard>
    </div>
  );
}

export default TypesAdminMenu;

export async function getServerSideProps() {
  try {
    const TypeResponse = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/type`);

    const { types } = await TypeResponse.json();

    return {
      props: {
        types,
      },
    };
  } catch (error) {
    throw new Error(`Problem fetch home page content ${error}`);
  }
}
