const { override, addWebpackPlugin } = require("customize-cra");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = override((config) => {
  if (config.optimization && config.optimization.minimizer) {
    config.optimization.minimizer = config.optimization.minimizer.filter(
      (plugin) => plugin.constructor.name !== "CssMinimizerPlugin"
    );
  }
  return config;
});
