interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}
export const MetricCard = ({ title, value, subtitle, icon }: MetricCardProps) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    );
  };