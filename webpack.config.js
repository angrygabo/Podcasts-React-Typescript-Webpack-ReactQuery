import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

export default (env, argv) => {
  const isProduction = argv.mode === 'development';

  return {
    entry: './src/index.tsx',
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.resolve(new URL('dist', import.meta.url).pathname),
      filename: isProduction ? 'index_bundle.[contenthash].js' : 'bundle.js',
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProduction
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }
          : false,
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ],
        }
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    optimization: {
      minimizer: isProduction ? [new TerserPlugin()] : [],
    },
  };
};
