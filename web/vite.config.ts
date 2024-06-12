import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
// import eslint from "vite-plugin-eslint";

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Plugins configuration
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          // for example, lint .ts and .tsx
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      // eslint({ cache: false }),
    ],

    // Server configuration
    server: {
      port: parseInt(env.VITE_PORT), // Convert port to a number
      strictPort: true,
      host: true,
      // : true,
      proxy: {
        "/api": env.VITE_PROXY_API_URL, // Directly use the environment variable
      },
    },
  };
});

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
