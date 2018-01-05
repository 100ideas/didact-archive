const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = {
  webpack: function (config) {
    if (config.resolve.alias) {
      delete config.resolve.alias['react']
      delete config.resolve.alias['react-dom']
    }

    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        generateStatsFile: true,
        // Will be available at `.next/stats.json`
        statsFilename: 'stats.json'
      })
    );

    return config;
  }
}