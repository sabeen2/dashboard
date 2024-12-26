"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData } from "@/redux/features/dataSlice";
import DataTable from "@/components/DataTable";
import LoadingSkeleton from "@/components/Skeleton";
import { IColumn } from "@/interface/table.interface";

const PostsPage: React.FC = () => {
  const columns: IColumn[] = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "body", label: "Body" },
    ],
    []
  );

  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, currentPage, totalPages } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchData({ page: 1, limit: 10, section: "posts" }));
    }
  }, [dispatch, posts.length]);

  const handlePageChange = (page: number): void => {
    if (page !== currentPage) {
      dispatch(fetchData({ page, limit: 10, section: "posts" }));
    }
  };

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "failed") {
    return <div className="text-red-500 text-center">Error loading posts</div>;
  }

  return (
    <div className="sm:container sm:mx-auto py-10 px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white tracking-tight">
        Posts
      </h1>
      <DataTable
        data={posts}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostsPage;
