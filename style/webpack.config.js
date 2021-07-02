const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "todo",
    projectName: "style",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [],
    externals: [/^@todo\/.+$/],
  });
};
