import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface LineChartProps {
  data: Array<{ [key: string]: any }>;
  title?: string;
  dataKey: string;
  xAxisKey: string;
  height?: number;
  color?: string;
}

export function CustomLineChart({ data, title, dataKey, xAxisKey, height = 300, color = '#3b82f6' }: LineChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: 'currentColor' }}
            className="text-slate-600 dark:text-slate-400"
          />
          <YAxis
            tick={{ fill: 'currentColor' }}
            className="text-slate-600 dark:text-slate-400"
          />
          <Tooltip
            formatter={(value: number | undefined) => value !== undefined ? ['$' + value.toLocaleString(), 'Amount'] : ['', '']}
            contentStyle={{
              backgroundColor: 'rgb(var(--color-slate-800))',
              border: '1px solid rgb(var(--color-slate-600))',
              borderRadius: '0.5rem'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
