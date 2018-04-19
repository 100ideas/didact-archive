const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const withSass = require('@zeit/next-sass')

// see blueprintjs repo for webpack config ideas
// https://github.com/palantir/blueprint/blob/develop/packages/select/webpack.config.js

module.exports = withSass({
  webpack: function (config) {
    if (config.resolve.alias) {
      delete config.resolve.alias['react']
      delete config.resolve.alias['react-dom']
    }

    // https://github.com/zeit/next.js/blob/master/examples/with-semantic-ui/next.config.js
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    }),

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
})