import ThemeToggleSwitch from '@components/common/DarkModeToggle'

import AllScenario from './AllScenario'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'

import { MEMBER } from '@datas/member'
import { PROJECT_LIST } from '@datas/projectList'
import { WORD_COUNT_STATS } from '@datas/wordCountStats'

const Main = () => {
  return (
    <div className="mx-[5%] flex w-[90%]">
      <div className="mt-5 flex-col xl:w-[20%] 2xl:w-[25%]">
        <Profile member={MEMBER} />
        <div className="my-9">
          <Dashboard
            todayWordCount={WORD_COUNT_STATS.todayWordCount}
            monthTotalWordCount={WORD_COUNT_STATS.monthTotalWordCount}
            monthAvgWordCount={WORD_COUNT_STATS.monthAvgWordCount}
            dailyStats={WORD_COUNT_STATS.dailyStats}
          />
        </div>
        <div className="flex w-[85%] justify-center">
          <ThemeToggleSwitch />
        </div>
      </div>
      <div className="mt-6 flex-col xl:w-[80%] 2xl:w-[75%]">
        <QuickAccess projects={PROJECT_LIST} />
        <div className="mb-20 mt-16 w-full dark:bg-darkblack">
          <AllScenario projects={PROJECT_LIST} />
        </div>
      </div>
    </div>
  )
}

export default Main
