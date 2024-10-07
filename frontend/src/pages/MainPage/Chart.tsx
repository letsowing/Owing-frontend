import ApexCharts from 'react-apexcharts'

interface ChartProps {
  wordCountStats: { day: Date; wordCount: number }[]
}

const Chart = ({ wordCountStats }: ChartProps) => {
  return (
    <ApexCharts
      type="line"
      series={[
        { name: '글자수', data: wordCountStats.map((stat) => stat.wordCount) },
      ]}
      options={{
        chart: {
          height: 300,
          width: 500,
          toolbar: { show: false },
          background: 'white',
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
          categories: wordCountStats.map((stat) => stat.day.getTime()),
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
