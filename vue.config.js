const path = require("path");

const resolve = dir => path.join(__dirname, dir);
const Env = process.env.NODE_ENV;
const IS_PROD = ["production", "prod"].includes(Env);

process.env.VUE_APP_TITLE = "东盟-企业征信平台";

const vue_conf = {
  publicPath: process.env.BASE_URL, // 部署应用包时的URL前缀
  // publicPath: "./",
  outputDir: "dist", // 构建目录
  indexPath: "index.html", // 指定生成的 index.html 的输出路径
  filenameHashing: true, // 静态文件生成hash名称
  lintOnSave: true, // 开发模式下每次保存时lint代码
  productionSourceMap: !IS_PROD // 生产环境是否生成 sourceMap 文件
};

// const proxy_dev_url = "http://192.168.62.222:33335/";
// const proxy_dev_url = "http://192.168.63.144:33335/";

// const proxy_dev_url = "http://10.0.40.19:80/";
// const proxy_pay_url = "http://121.196.103.46:8080/";
const configureWebpack = config => {
  if (IS_PROD) {
    // 优化打包
    config.optimization = {
      splitChunks: {
        filename: "[name].bundle.js",
        cacheGroups: {
          default: {
            chunks: "initial",
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true
          },
          commons: {
            name: "chunk-common",
            chunks: "initial", // 优化哪些块
            minChunks: 2, // 当被至少两个模块用到时split
            maxInitialRequests: 5, //在一个入口中的最大并行请求数
            priority: 1, // 缓存组优先级
            reuseExistingChunk: true, //重用现有chunk
            enforce: true
          },
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "initial",
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          elementUI: {
            name: "chunk-elementui",
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: "initial",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          echarts: {
            name: "chunk-echarts",
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: "initial",
            priority: 4,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    };

    // 性能
    config.performance = {
      hints: process.env.NODE_ENV === "production" ? false : "warning",
      maxEntrypointSize: 400000,
      maxAssetSize: 250000,
      assetFilter: assetFilename => {
        return !/\.map$/.test(assetFilename);
      }
    };
  }
};

const chainWebpack = config => {
  // 删除懒加载模块的 prefetch preload，降低带宽压力
  config.plugins.delete("prefetch").delete("preload");

  //添加别名
  config.resolve.alias.set("@", resolve("src"));

  // 配置打包的输出文件名称
  config.output
    .filename("[name].[hash:8].js")
    .chunkFilename("js/[name].[hash:8].js")
    .end();

  if (IS_PROD) {
    config.optimization.delete("splitChunks");
  }
  return config;
};

// devServer更多配置查看https://webpack.js.org/configuration/dev-server/
const devServer = {
  // // 让浏览器 overlay 同时显示警告和错误
  // overlay: {
  //   warnings: true,
  //   errors: true
  // },
  // open: false, // 是否自动打开浏览器
  host: "localhost",
  port: 8083, //代理端口
  // https: false,
  // hotOnly: false, // 热更新
  proxy: {
    "/consumer": {
      target: proxy_dev_url,
      changeOrigin: true,
      pathRewrite: {
        "^/consumer": "/consumer"
      }
    }
  }
};

module.exports = {
  ...vue_conf,
  css: {
    sourceMap: IS_PROD ? false : true, //是否为CSS开启source map
    loaderOptions: {
      sass: {
        //设置style公用变量文件，在 sass-loader v7 中，这个选项名是 "data"
        prependData: `
        @import '~@/assets/style/index.scss';
        `
      }
    }
  },
  configureWebpack,
  chainWebpack,
  devServer
};
