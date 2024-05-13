import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// add env variables to the Vite config from the .env files
export default defineConfig({
  plugins: [react()],
});
