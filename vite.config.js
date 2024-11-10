import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       // target: 'http://54.165.154.95:9000',
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // }
})
