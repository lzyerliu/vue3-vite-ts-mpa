import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'
import glob from 'glob'
import fs from 'fs'
import autoprefixer from 'autoprefixer'
import postcssPxToViewport from 'postcss-px-to-viewport'

// get 多页面入口html文件, (入口文件目录需含main.ts;可更改自定义)
const getEntryHtml = () => {
  let entrys = {}
  // 遍历文件夹中含有main.ts的文件夹路径
  const allEntry = glob.sync('./src/pages/**/main.ts')
  // console.log(allEntry)
  // 获取模版
  const temp = fs.readFileSync('./index.html')
  if(!fs.existsSync('./pages')) {
    fs.mkdirSync('./pages')
  }
  // 创建多页面模版
  allEntry.forEach((entry: string) => {
    let pageArr = entry.split('/')
    let name = pageArr[pageArr.length - 2]
    let htmlPath = ''
    pageArr.map((el, index) => {
      if (index < pageArr.length - 1) {
        htmlPath += el + '/'
      }
      return el
    })
    htmlPath = `${htmlPath}${name}.html`
    // console.log(htmlPath)
    // 优先取同级的html 入口文件
    if (fs.existsSync(htmlPath)) {
      let tempHtml = fs.readFileSync(htmlPath)
      let htmlContent = tempHtml.toString()
      fs.writeFile(`./pages/${name}.html`, htmlContent, err => {
        if (err) {
          console.log(err)
        }
      })
    } else {
      // 否则取 多页面模版路径pages中的同名html入口文件
      try {
        // 判断文件是否存在
        fs.accessSync(`./pages/${name}.html`)
      } catch (error) {
        console.log(`创建模版${name}.html文件`)
        let index = temp.toString().indexOf('</body>')
        let content = temp.toString().slice(0, index) + `<script type="module" src=".${entry}"></script>` + temp.toString().slice(index)
        fs.writeFile(`./pages/${name}.html`, content, err => {
          if (err) {
            console.log(err)
          }
        })
      }
    }
    // input入口配置
    entrys[name] = resolve(__dirname, `pages/${name}.html`)
  })
  return entrys
}
const pageEntry = getEntryHtml()
// console.log(pageEntry)

// 压缩配置参数
const viteCompressionOptions = {
  filter: /\.(js|css|json|txt|html|svg)(\?.*)?$/i, // 需要压缩的文件
  threshold: 1024, // 文件容量大于这个值就压缩
  algorithm: 'gzip', // 压缩方式
  ext: 'gz', // 后缀名
  deleteOriginFile: false, // 验收是否删除源文件
}

// console.log(import.meta.env)
// console.log(process.env)

/**
 * 读取环境变量的值
 * @param mode 模式
 * @param target key值
 * @returns value
 */
const getEnvFn = (mode: any, target: any) => {
  return loadEnv(mode, process.cwd())[target]
}

// https://vitejs.dev/config/
export default ({ mode }) => {

  // console.log(loadEnv(mode, process.cwd()))
  const isProd = getEnvFn(mode, 'VITE_APP_ENV') === 'production'
  const cdnHost = getEnvFn(mode, 'VITE_APP_CDN_HOST')
  console.log(isProd, cdnHost)

  return defineConfig({
    plugins: [
      vue(),
      viteCompression(<Object>viteCompressionOptions)
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    base: cdnHost,
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          postcssPxToViewport({
            viewportWidth: 750,             // (Number) The width of the viewport. 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 1334,           // (Number) The height of the viewport. 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 3,               // (Number) The decimal numbers to allow the REM units to grow to. 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            virwportUnit: 'vw',             // (String) Expected units. 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore'], // (Array) The selectors to ignore and leave as px. 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelVlaue: 1,               // (Number) Set the minimum pixel value to replace. 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false,              // (Boolean) Allow px to be converted in media queries. 允许在媒体查询中转换`px`
          })
        ]
      }
    },
    build: {
      // target: 'es2015', // 默认modules
      rollupOptions: {
        input: pageEntry,
        output: {
          dir: 'dist',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        }
      },
      // 生产环境移除console
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: true
        }
      }
    },
    server: {
      port: 5656,
      open: false,
      cors: true,
      // proxy: {
      //   '/api': {
      //     target: '',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: path => path.replace('/api', '/')
      //   }
      // }
    }
  })
}
