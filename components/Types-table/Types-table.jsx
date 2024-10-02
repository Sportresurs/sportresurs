import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import styles from "./TypesTable.module.scss";

const TypesTable = ({ types, selectedRows, setSelectedRows }) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: types,
    columns: useMemo(
      () => [
        {
          id: "select",
          header: "Обрати",
          // eslint-disable-next-line react/display-name
          cell: ({ row }) => (
            <input
              style={{ cursor: "pointer" }}
              type="checkbox"
              checked={selectedRows[0]?.id === row.original.id}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  setSelectedRows([row.original]);
                } else {
                  setSelectedRows([]);
                }
              }}
              disabled={
                !!selectedRows[0]?.id && selectedRows[0]?.id !== row.original.id
              }
            />
          ),
        },
        {
          header: "Номер",
          accessorKey: "id",
          id: "id",
        },
        {
          header: "Назва",
          accessorKey: "name",
        },
      ],

      [selectedRows, setSelectedRows]
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    state: {
      pagination,
    },
  });

  const lastPage = table.getPageCount() - 1;
  const disabledPrev = pagination.pageIndex === 0;
  const disabledNext = pagination.pageIndex === lastPage;

  const onClickNext = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }));
  };

  const onClickPrev = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex - 1,
    }));
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          disabled={disabledPrev}
          onClick={onClickPrev}
        >
          Назад
        </button>
        <button
          className={styles.button}
          disabled={disabledNext}
          onClick={onClickNext}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default TypesTable;
