import AllScenario from './AllScenario'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'

import { MEMBER } from '@datas/member'
import { PROJECT_LIST } from '@datas/projectList'
import { WORD_COUNT_STATS } from '@datas/wordCountStats'

const Main = () => {
  return (
    <div className="flex max-w-7xl justify-between gap-10">
      <div className="ms-16 mt-5 flex flex-col gap-2">
        <Profile member={MEMBER} />
        <div className="my-10">
          <Dashboard
            todayWordCount={WORD_COUNT_STATS.todayWordCount}
            monthTotalWordCount={WORD_COUNT_STATS.monthTotalWordCount}
            monthAvgWordCount={WORD_COUNT_STATS.monthAvgWordCount}
            dailyStats={WORD_COUNT_STATS.dailyStats}
          />
        </div>
      </div>
      <div className="me-16 mt-5 w-5/6 flex-col">
        <QuickAccess projects={PROJECT_LIST} />
        <div className="mt-16">
          <AllScenario projects={PROJECT_LIST} />
        </div>
      </div>
    </div>
  )
}

export default Main
