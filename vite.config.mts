import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/ui",
  build: {
    outDir: "../../dist/ui",
  },
  plugins: [react()],
});
