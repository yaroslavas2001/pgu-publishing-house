const path = require('path');
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob');
const PATHS = {
  src: path.join(__dirname, 'src')
}
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === "production";

const plugins = [];
if(isProduction){
  // plugins.push(
  //   new PurgeCSSPlugin({
  //     paths: glob.sync(`${PATHS.src}/**/*`,{nodir: true})
  //   }));
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions:{
        output:{
          comments:false
        }
      }
    }));
}
// //console.log('__dirname', __dirname);
// Используйте настройку configureWebpack для того чтобы переопределить настройки вебпака.
// Дефолтные настройки вебпака, которые использует vue-cli можно посмотреть по пути "\node_modules\@vue\cli-service\webpack.config.js"
module.exports = {
  publicPath: '/',
  assetsDir: "assets/",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@models": path.resolve(__dirname, "./src/models"),
        "@components": path.resolve(__dirname, "./src/views/components"),
        "@views": path.resolve(__dirname, "./src/views"),
        "@layouts": path.resolve(__dirname, "./src/views/layouts"),
      },
    },
   optimization:{
      minimize: isProduction
   },
   plugins:plugins
  },
};