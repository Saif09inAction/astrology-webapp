import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png:  { quality: 75 },
      jpg:  { quality: 75 },
      jpeg: { quality: 75 },
      webp: { quality: 78, lossless: false },
      svg:  { multipass: true },
    }),
  ],

  build: {
    // Raise warning threshold slightly since we're splitting chunks
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('firebase')) return 'vendor-firebase'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (id.includes('react-router-dom') || id.includes('react-dom') || (id.includes('node_modules/react/') )) return 'vendor-react'
        },

        // Content-hash filenames for aggressive long-term caching
        entryFileNames:   'assets/[name]-[hash].js',
        chunkFileNames:   'assets/[name]-[hash].js',
        assetFileNames:   'assets/[name]-[hash][extname]',
      },
    },

    // Minification settings
    target: 'es2020',
    minify: 'esbuild',

    // CSS code splitting — each chunk gets only CSS it needs
    cssCodeSplit: true,
  },

  // Optimize dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})
