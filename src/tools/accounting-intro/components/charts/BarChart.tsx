import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BarChartProps {
  data: Array<{ [key: string]: any }>;
  title?: string;
  dataKey: string;
  xAxisKey: string;
  height?: number;
  color?: string;
}

export function CustomBarChart({ data, title, dataKey, xAxisKey, height = 300, color = '#3b82f6' }: BarChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
