import { handlers } from '@mocks/handlers'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(...handlers)

if (process.env.NODE_ENV === 'development') {
  worker.start()
}
