"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData } from "@/redux/features/dataSlice";
import DataTable from "@/components/DataTable";
import LoadingSkeleton from "@/components/Skeleton";
import { IColumn } from "@/interface/table.interface";

const CommentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, status, currentPage, totalPages } = useSelector(
    (state: RootState) => state.data
  );

  const columns: IColumn[] = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "body", label: "Comment" },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchData({ page: 1, limit: 10, section: "comments" }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(fetchData({ page, limit: 10, section: "comments" }));
  };

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "failed") {
    return <div>Error loading comments</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <DataTable
        data={comments}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CommentsPage;
