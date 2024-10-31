import Chart from './Chart'

interface DashboardProps {
  todayWordCount: number
  monthTotalWordCount: number
  monthAvgWordCount: number
  dailyStats: {
    day: Date
    wordCount: number
  }[]
}

const Dashboard = ({
  todayWordCount,
  monthTotalWordCount,
  monthAvgWordCount,
  dailyStats,
}: DashboardProps) => {
  return (
    <div className="mt-5 flex w-64 flex-col gap-2 rounded-3xl bg-beige py-5 text-sm dark:bg-coldbeige dark:text-darkblack">
      <label className="mb-2 px-5 text-xl font-semibold">Dashboard</label>
      <div className="flex justify-between px-5">
        <label className="text-gray">오늘의 활동 글자수</label>
        <label className="font-semibold text-redorange dark:text-blue">
          {todayWordCount}자
        </label>
      </div>
      <div className="flex justify-between px-5 text-sm">
        <label className="text-gray">이번 달 총 글 자수</label>
        <label className="font-semibold text-redorange dark:text-blue">
          {monthTotalWordCount}자
        </label>
      </div>
      <div className="flex justify-between px-5 text-sm">
        <label className="text-gray">이번 달 하루 평균 글자수</label>
        <label className="font-semibold text-redorange dark:text-blue">
          {monthAvgWordCount}자
        </label>
      </div>
      <div className="dark:coldbeige m-3 rounded-lg bg-white">
        <Chart dailyStats={dailyStats} />
      </div>
    </div>
  )
}

export default Dashboard
