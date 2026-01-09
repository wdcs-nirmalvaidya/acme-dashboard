import { generateYAxis } from '../../lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../fonts';
import { fetchRevenue } from '../../lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  if (!revenue || revenue.length === 0) {
    return (
      <div className="w-full rounded-xl bg-white p-4">
        <p className="text-gray-400">No revenue data available.</p>
      </div>
    );
  }

  const chartHeight = 300;
  const barWidth = 24;
  const gap = 16;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="w-full rounded-xl bg-white p-4">
      {/* HEADER */}
      <h2
        className={`${lusitana.className} mb-4 flex items-center gap-2 text-xl`}
      >
        <CalendarIcon className="h-5 w-5 text-gray-500" />
        Revenue
      </h2>

      {/* CHART */}
      <div className="flex gap-4">
        {/* Y AXIS */}
        <div
          className="flex flex-col justify-between text-sm text-gray-400"
          style={{ height: chartHeight }}
        >
          {yAxisLabels.map((label, index) => (
            <span key={`y-${index}`}>{label}</span>
          ))}
        </div>

        {/* SVG BARS */}
        <svg
          width={(barWidth + gap) * revenue.length}
          height={chartHeight}
        >
          {revenue.map((item, index) => {
            const barHeight = (item.revenue / topLabel) * chartHeight;

            return (
              <rect
                key={`${item.month}-${index}`} // ✅ FIXED UNIQUE KEY
                x={index * (barWidth + gap)}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                rx="4"
                className="fill-blue-600"
              />
            );
          })}
        </svg>
      </div>

      {/* X AXIS */}
      <div
        className="mt-2 flex text-sm text-gray-400"
        style={{ marginLeft: 48 }}
      >
        {revenue.map((item, index) => (
          <span
            key={`x-${item.month}-${index}`} // ✅ FIXED UNIQUE KEY
            style={{
              width: barWidth + gap,
              textAlign: 'center',
            }}
          >
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
}
