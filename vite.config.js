import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: 5173,
        strictPort: false,
        open: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: './index.html'
            }
        }
    },
    css: {
        postcss: false
    },
    publicDir: 'public'
})