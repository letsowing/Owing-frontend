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
    <div className="flex h-[400px] w-[320px] flex-col gap-2 rounded-3xl bg-beige">
      <label className="mx-5 mb-3 mt-5 text-2xl font-semibold">Dashboard</label>
      <div className="mx-5 flex justify-between">
        <label className="text-gray">오늘의 활동 글자수</label>
        <label className="font-semibold text-redorange">
          {todayWordCount}자
        </label>
      </div>
      <div className="mx-5 flex justify-between">
        <label className="text-gray">이번 달 총 글 자수</label>
        <label className="font-semibold text-redorange">
          {monthTotalWordCount}자
        </label>
      </div>
      <div className="mx-5 flex justify-between">
        <label className="text-gray">이번 달 하루 평균 글자수</label>
        <label className="font-semibold text-redorange">
          {monthAvgWordCount}자
        </label>
      </div>
      <div className="mx-3 mt-5">
        <Chart dailyStats={dailyStats} />
      </div>
    </div>
  )
}

export default Dashboard
