const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
var webpack = require('webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "todo",
    projectName: "style",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      //   'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV)
      // })
    ],
    externals: ["single-spa", "vue", "vue-router", "axios", "js-cookie", /^@todo\/.+$/],
  });
};