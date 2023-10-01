import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { terser as Tenser } from 'rollup-plugin-terser'
import EslintPlugin from 'vite-plugin-eslint'
import Checker from 'vite-plugin-checker'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import {
  ElementPlusResolve,
  createStyleImportPlugin as CreateStyleImportPlugin
} from 'vite-plugin-style-import'
import { createSvgIconsPlugin as CreateSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin as CreateHtmlPlugin } from 'vite-plugin-html'
import ViteImages from 'vite-plugin-vue-images'
/**
 * 在setup语法糖中，解决无法自定义组件的 name 属性
 * 使用方法  defineOptions({ name: 'my-component' })
 */
import DefineOptions from 'unplugin-vue-define-options/vite'
// 解决控制台warning
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// import ViteCompression from 'vite-plugin-compression'
import { viteMockServe as ViteMockServe } from 'vite-plugin-mock'
import Progress from 'vite-plugin-progress'
import Swc from 'unplugin-swc'
import pkg from './package.json'

const { dependencies, devDependencies, name, version } = pkg
const _APP_INFO_ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: ((date: Date) => {
    let [year, month, day] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ]
    month < 10 && (month = `0${month}` as unknown as number)
    day < 10 && (day = `0${day}` as unknown as number)
    return `${year}/${month}/${day} ${date.toLocaleTimeString([], {
      hourCycle: 'h24'
    })}`
  })(new Date())
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const {
    VITE_APP_BASE_URL,
    VITE_APP_BASE_API,
    VITE_APP_BASE_OSS_API,
    VITE_APP_MOCK,
    VITE_APP_PROJECT_ICON,
    VITE_APP_PROJECT_TITLE
  } = loadEnv(mode, process.cwd())
  const hasMode = mode === 'dev'
  return {
    plugins: [
      Vue(),
      VueJsx(),
      Tenser(),
      DefineOptions(),
      CreateSvgIconsPlugin({
        // 指定要缓存的文件夹
        iconDirs: [resolve(process.cwd(), 'src/icons')],
        symbolId: '[name]'
      }),
      CreateHtmlPlugin({
        minify: true,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        entry: '/src/main.ts',
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            // 查找.env文件里面的VITE_APP_PROJECT_TITLE，请以VITE_标识开头
            title: VITE_APP_PROJECT_TITLE,
            icon: VITE_APP_PROJECT_ICON
            // injectScript: '<script src="/provider/inject.js" type="text/javascript"></script>'
          }
        }
      }),
      EslintPlugin({
        include: [
          '{src,typings,mock,plugins}/**/*.{ts,d.ts,tsx,vue}',
          'vite.config.ts'
        ],
        cache: false
      }),
      Checker({
        typescript: true,
        // vueTsc: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"' // for example, lint .ts & .tsx
        }
      }),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: resolve(__dirname, './src/locales/**')
      }),
      Icons({ scale: 1, defaultClass: 'inline-block', autoInstall: true }),
      ElementPlus({ useSource: true }),
      Components({
        dts: 'typings/components.d.ts',
        extensions: ['vue', 'tsx'],
        deep: true,
        dirs: ['src/components'], // configure default customer components file, file all components auto import
        resolvers: [ElementPlusResolver(), IconResolver()],
        importPathTransform(str) {
          return /(.tsx)$/g.test(str) ? str.slice(0, -4) : str
        }
      }),
      AutoImport({
        dts: 'typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        imports: [
          'vue',
          'vue-router',
          'pinia',
          'vue-i18n',
          { './src/service/main.ts': ['application'] }
        ],
        resolvers: [
          ElementPlusResolver({ importStyle: hasMode ? 'sass' : false }),
          IconResolver({ prefix: 'ep' })
        ]
      }),
      CreateStyleImportPlugin({
        resolves: [ElementPlusResolve()]
      }),
      ViteImages({
        dirs: ['src/assets', 'src/icons'], // 图像目录的相对路径
        extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'], // 有效的图像扩展
        customResolvers: [], // 覆盖名称->图像路径解析的默认行为
        customSearchRegex: '([a-zA-Z0-9]+)' // 重写搜索要替换的变量的Regex。
      }),
      // ViteCompression({
      //   verbose: true,
      //   disable: false,
      //   threshold: 10240,
      //   algorithm: 'gzip',
      //   ext: '.gz'
      // }),
      ViteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve' && VITE_APP_MOCK === 'true', // 开发打包开关
        prodEnabled: command !== 'serve', // 生产打包开关
        logger: true
      }),
      Progress(),
      Swc.vite()
      // Rollup plugin
      // Swc.rollup()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~@': resolve(__dirname, './')
      },
      extensions: ['.ts', '.js', '.vue', '.json', '.d.ts', '.tsx']
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        [VITE_APP_BASE_API]: {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path
        },
        [VITE_APP_BASE_OSS_API]: {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path
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
      sourcemap: hasMode,
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
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    base: '/nat/',
    define: {
      _APP_INFO_: JSON.stringify(_APP_INFO_)
    }
  }
})
