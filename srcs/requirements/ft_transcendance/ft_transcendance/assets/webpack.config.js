const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Uncomment if needed

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../../../NGINX/html'),
    filename: '[name].[contenthash].bundle.js',
	clean: true,
    publicPath: '/'
  },
  performance: {
    maxAssetSize: 700000,
    maxEntrypointSize: 700000,
    hints: 'warning',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
	new CompressionWebpackPlugin({
		algorithm: 'gzip',
		test: /\.(js|css|html|svg)$/,
		threshold: 10240,
		minRatio: 0.8,
	  }),
	// new CopyWebpackPlugin({
	// patterns: [
	// 	{ from: './src/app/images/favicon.ico', to: 'images/favicon.ico' }
	// ]
	// }),
    // new BundleAnalyzerPlugin(), // Uncomment if needed
  ],
//   devServer: {
//     static: path.join(__dirname, 'dist'),
//     compress: true,
//     port: 3000,
//     historyApiFallback: true,
//   }, // Uncomment if needed for debugging
  mode: 'production',
  optimization: {
	usedExports: true,
	minimize: true,
	minimizer: [new TerserPlugin()],
	splitChunks: {
	  chunks: 'all',
	},
  },
};


// npm install --save-dev webpack webpack-cli copy-webpack-plugin webpack-dev-server html-webpack-plugin mini-css-extract-plugin css-loader style-loader