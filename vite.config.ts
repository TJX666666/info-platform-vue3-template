import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from "@vitejs/plugin-vue";
import path from 'path'

const config = loadEnv('development', './')

export default defineConfig({

    server: {
        https: false,
        host: '0.0.0.0',
        port: parseInt(config.VITE_PORT),
        proxy: {
            '/api': {
                target: config.VITE_REQUEST_URL,
                changeOrigin: true,
            }
        }
    },
    resolve: {
        // 配置路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/global.scss";'
            }
        },
    },
    plugins: [
        vue(),
        Icons({
            autoInstall: true,
         }),
        //  hooks 自动引入
        AutoImport({
            imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
            dts: 'src/auto-import.d.ts',
            resolvers: [
                ElementPlusResolver(), // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],
        }),
        // 对 index.html 注入动态数据
        createHtmlPlugin({
            minify: true,
            entry: '/src/main.ts',
            inject: {
                data: {
                    title: config.VITE_GLOB_APP_TITLE,
                    injectScript: `<script src="/inject.js"></script>`,
                },
            },
        }),
        // 使用 gzip 或者 brotli 来压缩资源
        viteCompression(),
        // 组件按需引入
        Components({
            dirs: ['src/components'], // 目标文件夹
            extensions: ['vue', 'jsx'], // 文件类型
            dts: 'src/components.d.ts', // 输出文件，里面都是一些import的组件键值对
            // ui库解析器，也可以自定义，需要安装相关UI库
            resolvers: [
                // VantResolver(),
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                enabledCollections: ['ep'],
                }),
                // AntDesignVueResolver(),
                // HeadlessUiResolver(),
                // ElementUiResolver()
            ],
            
        })
          
    ],
      
});
