import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite'
import { resolve } from 'path'
import { terser as Tenser } from 'rollup-plugin-terser'
import EslintPlugin from 'vite-plugin-eslint'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
/**
  * 在setup语法糖中，解决无法自定义组件的 name 属性
  * 使用方法  defineOptions({ name: 'my-component' })
*/
import DefineOptions from 'unplugin-vue-define-options/vite'
// 解决控制台warning
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import ViteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const { VITE_APP_BASE_URL, VITE_APP_BASE_API, VITE_APP_MOCK } = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      Vue(),
      VueJsx(),
      DefineOptions(),
      Tenser(),
      EslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts', 'src/**/*.vue'],
        cache: true
      }),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: resolve(__dirname, './src/locales/**')
      }),
      ElementPlus({
        useSource: true
      }),
      Components({
        dts: true,
        extensions: ['vue'],
        dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
        resolvers: [ElementPlusResolver(), IconResolver()]
      }),
      AutoImport({
        dts: 'typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        resolvers: [ElementPlusResolver(), IconResolver({ prefix: 'ep' })]
      }),
      Icons({ scale: 1, defaultClass: 'inline-block', autoInstall: true }),
      ViteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve' && VITE_APP_MOCK === 'true', // 开发打包开关
        prodEnabled: command !== 'serve', // 生产打包开关
        logger: true
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~@': resolve(__dirname, './')
      },
      extensions: ['.ts', '.js', '.vue', '.json', '.d.ts']
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        [`/${VITE_APP_BASE_API}`]: {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(VITE_APP_BASE_API, 'g'), '')
        }
      },
      hmr: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/mixin.scss";'
        }
      }
    },
    build: {
      sourcemap: mode === 'dev',
      // 大文件报警阈值设置,不建议使用
      chunkSizeWarningLimit: 5000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks (id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  })
}
