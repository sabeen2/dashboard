"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData } from "@/redux/features/dataSlice";
import DataTable from "@/components/DataTable";
import LoadingSkeleton from "@/components/Skeleton";
import { IColumn } from "@/interface/table.interface";

const UsersPage: React.FC = () => {
  const columns: IColumn[] = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
    ],
    []
  );

  const dispatch = useDispatch<AppDispatch>();
  const { users, status, currentPage, totalPages } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchData({ page: 1, limit: 10, section: "users" }));
    }
  }, [dispatch, users.length]);

  const handlePageChange = (page: number): void => {
    if (page !== currentPage) {
      dispatch(fetchData({ page, limit: 10, section: "users" }));
    }
  };

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "failed") {
    return <div className="text-red-500 text-center">Error loading users</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white tracking-tight">
        Users
      </h1>
      <DataTable
        data={users}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersPage;
