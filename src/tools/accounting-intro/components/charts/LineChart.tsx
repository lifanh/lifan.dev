import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useChartColor } from './useChartColors';

interface LineChartProps {
  data: Array<{ [key: string]: any }>;
  title?: string;
  dataKey: string;
  xAxisKey: string;
  height?: number;
  color?: string;
  ariaLabel?: string;
}

export function CustomLineChart({ data, title, dataKey, xAxisKey, height = 300, color, ariaLabel }: LineChartProps) {
  const defaultColor = useChartColor(0);
  const strokeColor = color || defaultColor;

  return (
    <div className="w-full" role="img" aria-label={ariaLabel || title || 'Line chart'}>
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
              // Matches --color-neutral-800 (Recharts tooltips require inline styles)
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '0.5rem',
              color: '#f1f5f9'
            }}
            itemStyle={{ color: '#f1f5f9' }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={2}
            dot={{ fill: strokeColor, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
