import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Performance optimizations
  build: {
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          router: ['react-router-dom'],
          i18n: ['react-i18next', 'i18next'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react'],
        },
      },
    },
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging
    sourcemap: mode === 'production' ? 'hidden' : true,
  },
  // CSS optimization
  css: {
    devSourcemap: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-i18next',
      'i18next',
      '@tanstack/react-query',
      'lucide-react',
    ],
  },
  // Enable modern JS features
  esbuild: {
    target: 'es2020',
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
}));