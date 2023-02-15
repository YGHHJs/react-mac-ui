import { fileURLToPath, URL } from "node:url";

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      'api':{
        target:'https://gitee.com/GUANGHUIJs/ghstudy/blob/',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
  base:'./',
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
});
