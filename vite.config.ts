import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // Pages 部署在子路径, 用相对路径
  plugins: [react(), tailwindcss()],
})
