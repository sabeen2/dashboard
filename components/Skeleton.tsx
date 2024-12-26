"use client";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="space-y-6 w-full max-w-6xl p-6">
        <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
            >
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        </div>

        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
