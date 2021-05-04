import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    border-radius: 6px;

    tr {
      background-color: #fff;
      font-weight: 600;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 1.25rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      background-color: #fff;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const Table = ({ columns, data, setData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const onDelete = (id) => {
    console.log("id", id);
    let _data = [...data];
    _data.splice(id, 1);
    setData(_data);

    localStorage.setItem("data", JSON.stringify(_data));
  };

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <tr>
                  <td className="deleteContainer">
                    <button onClick={() => onDelete(i)} className="deleteBtn">
                      Remove
                    </button>
                  </td>
                </tr>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default Table;
