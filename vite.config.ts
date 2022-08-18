import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx' 
/**
  * 在setup语法糖中，解决无法自定义组件的 name 属性
  * 使用方法  defineOptions({ name: 'my-component' })
*/ 
import DefineOptions from 'unplugin-vue-define-options/vite';
// 解决控制台warning
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(), 
      vueJsx(),
      DefineOptions(),
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: resolve(__dirname, './src/locales/**'),
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
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
    }
  })  
} 