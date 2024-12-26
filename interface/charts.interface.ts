export interface IStatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend: number;
}
