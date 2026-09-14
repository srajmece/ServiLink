"use client";

import { useId } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const brand = "#2245e0";
const brandLight = "#8aa9ff";
const success = "#16a34a";
const palette = ["#2245e0", "#16a34a", "#d97706", "#0ea5e9", "#dc2626", "#8aa9ff", "#94a3b8"];

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--surface)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

function compactNumber(value: number): string {
  if (Math.abs(value) >= 100000) return `${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)}L`;
  if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  return String(value);
}

export function TrendAreaChart({ data, xKey, yKey }: { data: Record<string, unknown>[]; xKey: string; yKey: string }) {
  const gradientId = useId();
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={brand} stopOpacity={0.28} />
            <stop offset="95%" stopColor={brand} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#8a93a3" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#8a93a3" }} axisLine={false} tickLine={false} width={44} tickFormatter={compactNumber} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={brand}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DualLineChart({
  data,
  xKey,
  keyA,
  keyB,
  labelA,
  labelB,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  keyA: string;
  keyB: string;
  labelA: string;
  labelB: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#8a93a3" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#8a93a3" }} axisLine={false} tickLine={false} width={44} tickFormatter={compactNumber} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey={keyA} name={labelA} stroke={brand} strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey={keyB} name={labelB} stroke={success} strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleBarChart({ data, xKey, yKey, color = brandLight }: { data: Record<string, unknown>[]; xKey: string; yKey: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#8a93a3" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#8a93a3" }} axisLine={false} tickLine={false} width={44} tickFormatter={compactNumber} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey={yKey} fill={color} radius={[6, 6, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryDonutChart({ data }: { data: { category: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="category" innerRadius={55} outerRadius={90} paddingAngle={2} isAnimationActive={false}>
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export { palette as chartPalette };
