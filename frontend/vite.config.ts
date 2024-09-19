import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  })
}
