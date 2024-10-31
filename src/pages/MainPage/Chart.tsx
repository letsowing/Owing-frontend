import ApexCharts from 'react-apexcharts'

interface ChartProps {
  dailyStats: {
    day: Date
    wordCount: number
  }[]
}

const Chart = ({ dailyStats }: ChartProps) => {
  return (
    <ApexCharts
      type="line"
      series={[
        { name: '글자수', data: dailyStats.map((stat) => stat.wordCount) },
      ]}
      options={{
        chart: {
          height: 300,
          width: 500,
          toolbar: { show: false },
          background: 'transparent',
        },
        stroke: {
          curve: 'smooth',
          width: 4,
        },
        grid: { show: true },
        yaxis: { show: true },
        xaxis: {
          labels: { show: true },
          axisTicks: { show: false },
          axisBorder: { show: true },
          categories: dailyStats.map((stat) => stat.day.getTime()),
          type: 'datetime',
        },
        title: {
          text: 'Activity',
          align: 'left',
        },
        fill: {
          type: 'gradient',
          gradient: { gradientToColors: ['#FB5D2B'], stops: [0, 100] },
        },
        colors: ['#FB5D2B'],
        tooltip: {
          y: { formatter: (value: number) => `${value}` },
        },
      }}
    />
  )
}

export default Chart
