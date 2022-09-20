import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { terser } from "rollup-plugin-terser";
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx' 
/**
  * 在setup语法糖中，解决无法自定义组件的 name 属性
  * 使用方法  defineOptions({ name: 'my-component' })
*/ 
import DefineOptions from 'unplugin-vue-define-options/vite';
// 解决控制台warning
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

import ViteCompression from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock';


// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      Vue(), 
      VueJsx(),
      DefineOptions(),
      terser(),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: resolve(__dirname, './src/locales/**'),
      }),
      ViteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', //开发打包开关
        prodEnabled: command !== 'serve' ,// 生产打包开关
        logger: true
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~@': resolve(__dirname, './'),
      },
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        [`/${env.VITE_APP_API}`]: {
          target: env.VITE_APP_BASE,
          changeOrigin: true,
          ws: true,
          rewrite(path: string):string {
            return path.replace(new RegExp(`^\/${env.VITE_APP_API}`), '')
          },
        }
      },
      hmr: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/mixin.scss";`
        }
      }
    },
    build: {
      sourcemap: mode === "dev",
      // 大文件报警阈值设置,不建议使用
      // chunkSizeWarningLimit: 1500,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id){
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
      },
    }
  })  
} 