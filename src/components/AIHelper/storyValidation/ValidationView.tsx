import { Header } from '@components/aiHelper/Header'

import { ValidationChat } from './ValidationChat'

export const ValidationView = () => {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <ValidationChat />
      </div>
    </div>
  )
}
