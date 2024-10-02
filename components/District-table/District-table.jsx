import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styles from "./ColorTable.module.scss";

const ColorTable = ({ districts, selectedRows, setSelectedRows }) => {
  const ColorCell = ({ row, value }) => (
    <input
      type="text"
      disabled
      value={value}
      style={{ backgroundColor: row.original.color }}
      className={styles.colorInput}
    />
  );

  const table = useReactTable({
    data: districts,
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
        {
          header: "Колір",
          accessorKey: "color",
          cell: ColorCell,
        },
      ],

      [selectedRows, setSelectedRows]
    ),
    getCoreRowModel: getCoreRowModel(),
  });

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
    </div>
  );
};

export default ColorTable;
