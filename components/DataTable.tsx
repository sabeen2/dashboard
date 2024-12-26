import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowUpDown, Download } from "lucide-react";
import { IDataTableProps } from "@/interface/table.interface";

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
}: IDataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const searchedData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return searchedData;

    return [...searchedData].sort((a, b) => {
      const aVal = String(a[sortConfig.key as keyof T]);
      const bVal = String(b[sortConfig.key as keyof T]);
      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [searchedData, sortConfig]);

  const exportTableData = () => {
    const headers = columns.map((col) => col.label).join(",");
    const rows = sortedData.map((row) =>
      columns.map((col) => String(row[col.key as keyof T])).join(",")
    );
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "table-data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getPageNumbers = () => {
    let pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5];
      } else if (currentPage >= totalPages - 2) {
        pages = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
      } else {
        pages = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }
    }
    return pages;
  };

  return (
    <Card className="w-full">
      <CardContent className=" px-2 py-6 sm:px-6 sm:py-6 space-y-4">
        <div className="flex  justify-between gap-x-2 items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            className="text-sm text-white bg-gray-950 hover:bg-gray-950/80 hover:text-white"
            variant="outline"
            onClick={exportTableData}
          >
            <Download className=" sm:h-4 sm:w-4 mr-2 " />
            Export CSV
          </Button>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const direction =
                          sortConfig?.key === column.key &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc";
                        setSortConfig({ key: column.key, direction });
                      }}
                      className="h-8 px-2 font-medium"
                    >
                      {column.label}
                      <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-gray-500"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        <div
                          className="truncate max-w-xs"
                          title={String(row[column.key as keyof T])}
                        >
                          {String(row[column.key as keyof T])}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {`Page ${currentPage} of ${totalPages}`}
          </span>

          <div className="flex items-center ">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={currentPage <= 1}
            >
              First
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <PaginationPrevious className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 ${
                  currentPage === pageNum
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {pageNum}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <PaginationNext className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages}
            >
              Last
            </Button>
          </div>
        </div> */}
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-y-4">
          <span className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
            {`Page ${currentPage} of ${totalPages}`}
          </span>

          <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={currentPage <= 1}
              className="sm:mr-2 mb-2 sm:mb-0"
            >
              First
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="sm:mr-2 mb-2 sm:mb-0"
            >
              <PaginationPrevious className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 sm:mr-2 mb-2 sm:mb-0 ${
                  currentPage === pageNum
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {pageNum}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="sm:mr-2 mb-2 sm:mb-0"
            >
              <PaginationNext className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DataTable;
