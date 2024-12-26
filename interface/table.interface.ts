export interface IColumn {
  key: string;
  label: string;
}

export interface ISidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className: any }>;
  badge?: string;
  count?: number;
}

export interface IDataTableProps<T> {
  data: T[];
  columns: { key: string; label: string }[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
