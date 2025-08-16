import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    include: [
      'react',
      'react-dom',
      'react-native-web',
      '@expo/vector-icons',
      'expo',
      'expo-status-bar',
    ],
    exclude: [
      'react-native',
      '@react-native/assets-registry',
      'react-native-safe-area-context',
      'react-native-screens',
      'react-native-gesture-handler',
      'react-native-reanimated',
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native/Libraries/Utilities/codegenNativeComponent': 'react-native-web',
      'react-native/Libraries/Components/View/ViewStylePropTypes': 'react-native-web',
      'react-native/Libraries/Image/AssetRegistry': 'react-native-web',
      'react-native/Libraries/Utilities/Platform': 'react-native-web',
      'react-native/Libraries/Utilities/BackHandler': 'react-native-web',
    },
  },
  define: {
    __DEV__: true,
    global: 'globalThis',
    'process.env.NODE_ENV': '"development"',
  },
})
