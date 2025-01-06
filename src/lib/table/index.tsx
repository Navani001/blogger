"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Box,
} from "@mui/material";

interface RowData {
  title: string;
  url: string;
  status: string;
  desc: string;
  [key: string]: any;
}

interface TableProps {
  rows: RowData[];
  handleView?: (row: RowData) => void;
  isview?: boolean;
}

export default function CustomPaginationActionsTable({
  rows,
  handleView,
  isview,
  coloumn_remove = ['id'],
}: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate empty rows for current page
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // Get current page rows
  const currentPageRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="w-full">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {rows.length > 0 &&
                Object.keys(rows[0]).map(
                  (key) =>
                    !coloumn_remove.includes(key) && (
                      <TableCell
                        key={key}
                        align={key === "name" ? "left" : "right"}
                        component="th"
                        scope="col"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    )
                )}
              {isview && (
                <TableCell align="center" component="th" scope="col">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageRows.map((row:any, index:any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((key) => 
                    !coloumn_remove.includes(key) && (
                   
                  <TableCell
                    key={key}
                    align={key === "name" ? "left" : "right"}
                    component={key === "name" ? "th" : "td"}
                    scope={key === "name" ? "row" : undefined}
                  >
                    {/* {key} */}
                    {row[key]}
                  </TableCell>
                   
                ))}
                {isview && (
                  <TableCell align="center">
                    <IconButton
                      aria-label="view"
                      onClick={() => handleView && handleView(row)}
                      size="small"
                    >
                      👁️
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell
                  colSpan={Object.keys(rows[0] || {}).length + (isview ? 1 : 0)}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
