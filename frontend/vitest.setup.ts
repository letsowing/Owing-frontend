import { server } from './src/mocks/server'

import { afterAll, afterEach, beforeAll } from 'vitest'

if (process.env.NODE_ENV === 'test') {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
}
