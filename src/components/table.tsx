import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/app/application/ui/table";
import { Button, Spinner } from "@nextui-org/react";

type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
};

export type Pagination = {
  total: number;
  limit: number;
  offset: number;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  pagination: Pagination;
  onPaginationChange: (newPagination: Pagination) => void;
  loading: boolean;
};

export const DataTable = <T extends object>({
  data,
  columns,
  pagination,
  onPaginationChange,
  loading,
}: DataTableProps<T>) => {
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const handleNextPage = () => {
    setLoadingNext(true);
    onPaginationChange({
      ...pagination,
      offset: Math.min(
        pagination.offset + pagination.limit,
        pagination.total - pagination.limit
      ),
    });
  };

  const handlePreviousPage = () => {
    setLoadingPrevious(true);
    onPaginationChange({
      ...pagination,
      offset: Math.max(pagination.offset - pagination.limit, 0),
    });
  };

  useEffect(() => {
    if (!loading) {
      setLoadingPrevious(false);
      setLoadingNext(false);
    }
  }, [loading]);
  return (
    <>
      <Table className="w-full overflow-x-auto">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.className || ""
                }`}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={columnIndex}
                  className="px-4 py-3 text-sm text-gray-900"
                >
                  {column.accessor(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4 px-4">
        <span className="text-sm text-gray-600">
          Page {Math.floor(pagination.offset / pagination.limit) + 1} of{" "}
          {Math.ceil(pagination.total / pagination.limit)}
        </span>
        <div className="flex space-x-2">
          <Button
            onClick={handlePreviousPage}
            disabled={pagination.offset === 0 || loadingPrevious}
            variant="faded"
            size="sm"
            className="px-4 py-2 bg-green-500"
          >
            {loadingPrevious ? <Spinner size="sm" /> : "Previous"}
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={
              pagination.offset + pagination.limit >= pagination.total ||
              loadingNext
            }
            size="sm"
            className="px-4 py-2 bg-blue-500 text-white"
          >
            {loadingNext ? <Spinner size="sm" /> : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
};
