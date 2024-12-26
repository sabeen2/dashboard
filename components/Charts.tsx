"use client";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData } from "@/redux/features/dataSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Users, MessageSquare, FileText } from "lucide-react";
import { Bar, ComposedChart, LabelList, Scatter, TooltipProps } from "recharts";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
} from "recharts";
import LoadingSkeleton from "@/components/Skeleton";
import { IStatCardProps } from "@/interface/charts.interface";

const data = [
  { name: "Jan", users: 400, posts: 240, comments: 240 },
  { name: "Feb", users: 300, posts: 138, comments: 221 },
  { name: "Mar", users: 200, posts: 540, comments: 229 },
  { name: "Apr", users: 270, posts: 308, comments: 200 },
  { name: "May", users: 180, posts: 480, comments: 218 },
  { name: "Jun", users: 230, posts: 300, comments: 250 },
  { name: "Jul", users: 349, posts: 400, comments: 210 },
];

const pieData = [
  { name: "Users", value: 400 },
  { name: "Posts", value: 300 },
  { name: "Comments", value: 300 },
];

const COLORS = {
  users: "#6366f1",
  posts: "#ec4899",
  comments: "#8b5cf6",
  gradient1: "#c084fc",
  gradient2: "#818cf8",
  gradient3: "#f472b6",
};

const StatCard: React.FC<IStatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => (
  <Card className="overflow-hidden transition-all hover:shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <div className="flex items-center mt-2">
            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500">
              {trend}% vs last month
            </span>
          </div>
        </div>
        <div className="p-3 dark:bg-gray-900/50 bg-gray-100 rounded-lg">
          <Icon className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className=" dark:bg-gray-900 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-600">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, posts, comments, status } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(fetchData({ page: 1, limit: 10, section: "users" }));
    dispatch(fetchData({ page: 1, limit: 10, section: "posts" }));
    dispatch(fetchData({ page: 1, limit: 10, section: "comments" }));
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingSkeleton />;
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading data
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8  bg-background min-h-screen">
      <h1 className="text-4xl font-bold mb-8 dark:text-white text-gray-800 tracking-tight">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={Users}
          trend={12}
        />
        <StatCard
          title="Total Posts"
          value={posts.length}
          icon={FileText}
          trend={8}
        />
        <StatCard
          title="Total Comments"
          value={comments.length}
          icon={MessageSquare}
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Statistical Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="users" barSize={20} fill="#6366f1">
                  <LabelList dataKey="users" position="top" />
                </Bar>
                <Bar dataKey="posts" barSize={20} fill="#ec4899">
                  <LabelList dataKey="posts" position="top" />
                </Bar>
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ stroke: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Scatter dataKey="comments" fill="#8b5cf6" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Distribution Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={Object.values(COLORS)[index]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Growth Trends</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                {Object.entries(COLORS)
                  .slice(0, 3)
                  .map(([key, color], index) => (
                    <linearGradient
                      key={key}
                      id={`gradient-${key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                content={
                  <CustomTooltip
                    active={undefined}
                    payload={undefined}
                    label={undefined}
                  />
                }
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="users"
                stroke={COLORS.users}
                fill={`url(#gradient-users)`}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="posts"
                stroke={COLORS.posts}
                fill={`url(#gradient-posts)`}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="comments"
                stroke={COLORS.comments}
                fill={`url(#gradient-comments)`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
