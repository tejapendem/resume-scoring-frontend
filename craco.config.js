module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (webpackConfig.optimization?.minimizer) {
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
        );
      }
      return webpackConfig;
    },
  },
};
