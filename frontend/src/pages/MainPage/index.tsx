import AllScenario from './AllScenario'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'

const Main = () => {
  const ProfileMockData = {
    image: '',
    name: '호쇼기',
  }

  const DashBoardMockData = {
    todayWordCount: 1000,
    monthTotalWordCount: 26000,
    monthAvgWordCount: 2000,
    wordCountStats: [
      {
        day: new Date(2024, 9, 1),
        wordCount: 1000,
      },
      {
        day: new Date(2024, 9, 2),
        wordCount: 2000,
      },
      {
        day: new Date(2024, 9, 3),
        wordCount: 400,
      },
      {
        day: new Date(2024, 9, 4),
        wordCount: 4000,
      },
      {
        day: new Date(2024, 9, 5),
        wordCount: 1234,
      },
      {
        day: new Date(2024, 10, 1),
        wordCount: 7934,
      },
    ],
  }

  const QuickAccessMockData = {
    projectList: [
      {
        id: 1,
        name: '억만장자',
        createdAt: new Date(2024, 8, 6, 12, 48),
        image: '',
      },
      {
        id: 2,
        name: '억만장자2',
        createdAt: new Date(2024, 8, 6, 12, 48),
        image: '',
      },
      {
        id: 3,
        name: '억만장자3',
        createdAt: new Date(2022, 8, 6, 12, 48),
        image: '',
      },
      {
        id: 3,
        name: '억만장자4',
        createdAt: new Date(2023, 8, 6, 12, 48),
        image: '',
      },
    ],
  }

  const AllScenarioMockData = {
    projectList: [
      {
        id: 1,
        name: '억만장자',
        updatedAt: new Date(2024, 8, 6, 12, 48),
        createdAt: new Date(2024, 8, 6, 12, 48),
        onClick: () => null,
      },
      {
        id: 2,
        name: '억만장자2',
        updatedAt: new Date(2024, 10, 6, 12, 48),
        createdAt: new Date(2024, 8, 6, 12, 48),
        onClick: () => null,
      },
      {
        id: 3,
        name: '억만장자3',
        updatedAt: new Date(2022, 9, 6, 12, 48),
        createdAt: new Date(2022, 8, 6, 12, 48),
        onClick: () => null,
      },
      {
        id: 4,
        name: '억만장자4',
        updatedAt: new Date(2023, 8, 6, 12, 48),
        createdAt: new Date(2023, 8, 6, 12, 48),
        onClick: () => null,
      },
    ],
  }

  return (
    <div className="flex justify-between gap-10">
      <div className="ms-16 mt-5 flex flex-col gap-2">
        <Profile image={ProfileMockData.image} name={ProfileMockData.name} />
        <div className="my-10">
          <Dashboard
            todayWordCount={DashBoardMockData.todayWordCount}
            monthTotalWordCount={DashBoardMockData.monthTotalWordCount}
            monthAvgWordCount={DashBoardMockData.monthAvgWordCount}
            wordCountStats={DashBoardMockData.wordCountStats}
          />
        </div>
      </div>
      <div className="me-16 mt-5 w-5/6 max-w-7xl flex-col">
        <QuickAccess projects={QuickAccessMockData.projectList} />
        <div className="mt-16">
          <AllScenario projects={AllScenarioMockData.projectList} />
        </div>
      </div>
    </div>
  )
}

export default Main
