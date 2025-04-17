import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite port
    strictPort: true, // Exit if port is already in use
    host: true, // Allow access from network (needed for Docker)
    hmr: {
      clientPort: 3000, // Port for HMR websocket connection (matches docker-compose exposed port)
    },
    watch: {
       usePolling: true, // Use polling for file changes in Docker
    }
  },
}); 