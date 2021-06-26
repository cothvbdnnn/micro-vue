module.exports = {
  configureWebpack: {
    externals: [
      "single-spa", 
      "vue", 
      "vue-router", 
      "axios", 
      "js-cookie", 
      /^@todo\/.+/
    ]
  },
};