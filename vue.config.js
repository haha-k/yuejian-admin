/* eslint-disable prettier/prettier */
const path = require('path')

const port = 8080
const name = "约健后台管理系统"

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: 'static', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    lintOnSave: process.env.NODE_ENV === 'development', // 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps
        loaderOptions: {}, // css预设器配置项
        modules: false // 启用 CSS modules for all css / pre-processor files.
    },
    devServer: { // 环境配置
        host: '127.0.0.1',
        port: port,
        https: false,
        hotOnly: true,
        open: true, //配置自动启动浏览器
        overlay:{
          warnings:false,
          errors:true,
        },
        proxy: { // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
            // '/api/v1': {
            //     // target: '<url>',
            //     target: 'http://39.96.221.167:8000/api/v1',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/v1' : ''
            //     },
            // },
            '/api/v1': {
                // target: '<url>',
                target: 'http://127.0.0.1:8000/api/v1',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/v1' : ''
                },
            },
        },
        watchOptions: {
            poll: 1000, //开启polling,或者指定毫秒为单位进行轮询，1000
            ignored: /node_modules/, //忽略文件夹
            aggregateTimeout: 300 //当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：
        }
    },
    pluginOptions: { // 第三方插件配置
        // ...
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: config => {
        config.plugin('define').tap(args => {
            args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });

        //svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // config.module
        // .rules('vue')
        // .use('vue-loader')
        // .loader('vue-loader')
        // .tap(options => {
        // })
    }

};
