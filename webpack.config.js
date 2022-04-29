const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = (env) => {
  const GLOBAL_SCSS = resolvePath('src/common/styles/index.scss');

  const isDevelopment = env.development

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      additionalData: `@import "${GLOBAL_SCSS}";`,
    },
  };

  const styleLoader = isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader;
  console.log(`./dotenv/${process.env.NODE_ENV}.env`);
  return {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    module: {
      rules: [
        // ts/js:
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },

        // css/scss
        {
          test: /\.scss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            styleLoader,
            'css-loader',
            sassLoader,
          ],
        },
        {
          test: /\.module.(s(a|c)ss)$/,
          use: [
            styleLoader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isDevelopment ? '[path]:[local]--[hash:base64:5]' : '[hash:base64:5]',
                },
              }
            },
            sassLoader,
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      modules: [path.resolve('./src'), 'node_modules'],
      alias: {
        '@api': resolvePath('./src/api'),
        '@common': resolvePath('./src/common'),
        '@components': resolvePath('./src/components'),
        '@containers': resolvePath('./src/containers'),
        '@ducks': resolvePath('./src/ducks'),
        '@public': resolvePath('./src/public'),
        '@routers': resolvePath('./src/routers'),
        '@store': resolvePath('./src/store'),
        '@views': resolvePath('./src/views'),
        '@widgets': resolvePath('./src/widgets'),
      }
    },

    output: {
      filename: 'bundle.js',
      path: resolvePath('dist'),
    },

    devServer: {
      host: '0.0.0.0',
      static: {
        directory: resolvePath('./src/public'),
      },
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        publicPath: '/'
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      }),
      new Dotenv({
        path: resolvePath(`./dotenv/${process.env.NODE_ENV}.env`),
      }),
    ]
  };
};
