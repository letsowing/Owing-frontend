import { useThemeStore } from '@stores/themeStore'

import ApexCharts from 'react-apexcharts'

interface ChartProps {
  dailyStats: {
    date: Date
    dailyCount: number
  }[]
}

const Chart = ({ dailyStats }: ChartProps) => {
  const { isDarkMode } = useThemeStore()

  const gradientColors = isDarkMode
    ? { start: '#C3DCFE', end: '#3082F6' }
    : { start: '#EF931A', end: '#FB5D2B' }

  return (
    <ApexCharts
      type="line"
      series={[
        { name: '글자수', data: dailyStats.map((stat) => stat.dailyCount) },
      ]}
      options={{
        chart: {
          height: 500,
          toolbar: { show: false },
          background: 'transparent',
          parentHeightOffset: 0,
        },
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        grid: { show: true },
        yaxis: {
          show: true,
          labels: {
            formatter: (value) => Math.round(value).toString(),
            minWidth: 20,
            offsetX: -5,
          },
          floating: false,
          tickAmount: 4,
        },
        xaxis: {
          labels: {
            show: true,
            rotate: -45,
            offsetY: -2,
          },
          axisTicks: { show: true },
          axisBorder: { show: true },
          categories: dailyStats.map((stat) => new Date(stat.date).getTime()),
          type: 'datetime',
        },
        title: {
          text: '날짜별 글자수',
          align: 'left',
        },
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: [gradientColors.end],
            stops: [0, 100],
          },
        },
        colors: [gradientColors.start],
        tooltip: {
          y: { formatter: (value: number) => `${value}` },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '100%',
              },
              yaxis: {
                tickAmount: 3,
              },
            },
          },
        ],
      }}
    />
  )
}

export default Chart
