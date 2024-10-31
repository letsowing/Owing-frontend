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
    <div className="flex h-auto w-[20rem] flex-col gap-2 rounded-3xl bg-beige px-2 py-10 dark:bg-coldbeige dark:text-darkblack">
      <label className="mx-5 mb-3 text-2xl font-semibold">Dashboard</label>
      <div className="mx-5 flex justify-between">
        <label className="text-sm text-gray">오늘의 활동 글자수</label>
        <label className="text-sm font-semibold text-redorange dark:text-blue">
          {todayWordCount}자
        </label>
      </div>
      <div className="mx-5 flex justify-between text-sm">
        <label className="text-sm text-gray">이번 달 총 글 자수</label>
        <label className="font-semibold text-redorange dark:text-blue">
          {monthTotalWordCount}자
        </label>
      </div>
      <div className="mx-5 flex justify-between text-sm">
        <label className="text-gray">이번 달 하루 평균 글자수</label>
        <label className="text-sm font-semibold text-redorange dark:text-blue">
          {monthAvgWordCount}자
        </label>
      </div>
      <div className="dark:coldbeige mx-3 mt-5 h-[190px] bg-white">
        <Chart dailyStats={dailyStats} />
      </div>
    </div>
  )
}

export default Dashboard
