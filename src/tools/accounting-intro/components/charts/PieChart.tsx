import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useChartColors } from './useChartColors';

interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title?: string;
  height?: number;
  ariaLabel?: string;
}

export function CustomPieChart({ data, title, height = 300, ariaLabel }: PieChartProps) {
  const chartColors = useChartColors();

  return (
    <div className="w-full" role="img" aria-label={ariaLabel || title || 'Pie chart'}>
      {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name}: ${entry.value}`}
            outerRadius={80}
            fill={chartColors[0]}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number | undefined) => value !== undefined ? ['$' + value.toLocaleString(), 'Amount'] : ['', '']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
