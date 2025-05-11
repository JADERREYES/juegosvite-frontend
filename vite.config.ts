import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,  // Puedes especificar el puerto del servidor
  },
  build: {
    outDir: 'dist',  // Carpeta donde se almacenan los archivos compilados
  },
  plugins: [
    // Aquí puedes agregar cualquier plugin si lo necesitas
  ],
});
