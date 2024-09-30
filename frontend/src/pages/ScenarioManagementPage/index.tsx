import DnDWrapper from '../../components/ScenarioManagement/DnDWrapper'
import Tab from '../../components/ScenarioManagement/Tab'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ScenarioManagement = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Tab />
      <DnDWrapper />
    </DndProvider>
  )
}

export default ScenarioManagement
