module.exports = {
  configureWebpack: {
    externals: [
      "single-spa", 
      "vue", 
      "bizfly",
      "vue-router", 
      "vuex",
      "axios", 
      "js-cookie", 
      /^@todo\/.+/
    ]
  },
};