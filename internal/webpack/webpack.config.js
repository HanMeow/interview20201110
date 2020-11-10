/* eslint max-len:0 */
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const launchEditorMiddleware = require('launch-editor-middleware');
const WebpackBar = require('webpackbar');
const chokidar = require('chokidar');

const {
  toFilename,
  createPugHtmlLoaderOptions,
  createHtmlWebpackPlugin,
} = require('./util');

const DEV_MODE = process.env.NODE_ENV === 'development';
const config = require('../../config');

/**
 * @argument {String[]} pageList 指定產出的靜態頁面，SPA 就留 index 就好
 * @description 需有對應的 {page}.js (見entry)、及對應的 src/html/{page}.pug (見plugin)
 */
const pageList = [
  'index',
  // 'Event',
  // 'About',
  // 'News',
  // 'Contact',
];

const entry = {};
pageList.forEach((key) => {
  // entry[key] = [`./pages/${key}/index.js`];
  entry[key] = [`./${key}.js`];
});

/**
 * @argument {String} port 用 --port={String} 來指定 port
 */
const port = +(process.argv.filter((argv) => /--port=/.test(argv))[0] || '3000').replace(/--port=/, '');

/**
 * @argument {String} publicPath 用 --path={String} 來指定網站 path
 */
const publicPath = (process.argv.filter((argv) => /--path=/.test(argv))[0] || '/hance/').replace(/--path=/, '');

/**
 * @argument {String} mode 用 --routerMode={String} 來指定網站 router mode (hash/history)
 */
const mode = (process.argv.filter((argv) => /--routerMode=/.test(argv))[0] || 'history').replace(/--routerMode=/, '');

const webpackConfig = {
  mode: process.env.NODE_ENV,
  context: path.resolve('src'),
  entry,
  devtool: DEV_MODE ? 'inline-source-map' : false,
  output: {
    path: path.resolve('dist'),
    filename: toFilename('assets/js/[name]'),
    chunkFilename: toFilename('assets/js/[name]-chunk'),
    publicPath,
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/assets'),
      path.resolve('node_modules'),
    ],
    alias: {
      '@': path.resolve('src'),
    },
  },
  /*
    ##     ##  #######  ########  ##     ## ##       ########
    ###   ### ##     ## ##     ## ##     ## ##       ##
    #### #### ##     ## ##     ## ##     ## ##       ##
    ## ### ## ##     ## ##     ## ##     ## ##       ######
    ##     ## ##     ## ##     ## ##     ## ##       ##
    ##     ## ##     ## ##     ## ##     ## ##       ##
    ##     ##  #######  ########   #######  ######## ########
  */
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: publicPath.substr(0, 1) === '/' ? publicPath : '../../',
              hmr: DEV_MODE,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            // https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138/9
            options: {
              compilerOptions: {
                modules: [
                  {
                    // remove html attribute data-testid
                    preTransformNode(astEl) {
                      const attribute = 'data-testid';
                      if (process.env.NODE_ENV === 'production') {
                        const { attrsMap, attrsList } = astEl;
                        if (attrsMap[attribute]) {
                          delete attrsMap[attribute];
                          const index = attrsList.findIndex((x) => x.name === attribute);
                          attrsList.splice(index, 1);
                        }
                      }
                      return astEl;
                    },
                  },
                ],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|woff|mp4|eot)$/,
        use: {
          // https://github.com/webpack-contrib/file-loader
          loader: 'file-loader',
          options: {
            name: DEV_MODE ? '[path][name].[ext]' : '[path][name].[ext]?[contenthash:8]',
            esModule: false,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: DEV_MODE ? '[path][name].[ext]' : '[path][name].[ext]?[contenthash:8]',
            esModule: false,
            limit: 2 * 1024, // 小於 2k 的圖片變 base64
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [
              {
                loader: 'pug-plain-loader',
                options: {
                  data: {
                    DEV_MODE,
                    APP_ENV: process.env.APP_ENV,
                    env: process.env,
                  },
                },
              },
            ],
          },
          {
            // 這個沒用到，因為 util.js 裡的 createHtmlWebpackPlugin 取代
            use: [
              {
                loader: 'html-loader',
                options: {
                  interpolate: true, // <img src="${require(`./images/gallery.png`)}">
                  // attrs: ['img:src', 'video:src', 'img:srcset', 'source:srcset'],
                },
              },
              {
                loader: 'pug-html-loader',
                options: createPugHtmlLoaderOptions(),
              },
            ],
            include: path.resolve('src/html'),
          },
        ],
      },
      {
        test: /\.(styl|stylus)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: publicPath.substr(0, 1) === '/' ? publicPath : '../../',
              hmr: DEV_MODE,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                // https://github.com/luisrudge/postcss-flexbugs-fixes
                require('postcss-flexbugs-fixes'),
                // https://github.com/postcss/autoprefixer#options
                require('autoprefixer')({
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              paths: ['src/css/', 'src/assets/', 'src/'],
              sourceMap: true,
              define: {
                DEV_MODE,
              },
              preferPathResolver: 'webpack',
              import: [path.resolve('src/css/mixins/_index.styl')],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  /*
    ########  ##       ##     ##  ######   #### ##    ##  ######
    ##     ## ##       ##     ## ##    ##   ##  ###   ## ##    ##
    ##     ## ##       ##     ## ##         ##  ####  ## ##
    ########  ##       ##     ## ##   ####  ##  ## ## ##  ######
    ##        ##       ##     ## ##    ##   ##  ##  ####       ##
    ##        ##       ##     ## ##    ##   ##  ##   ### ##    ##
    ##        ########  #######   ######   #### ##    ##  ######
  */
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: toFilename('assets/css/[name]', 'css'),
      chunkFilename: toFilename('assets/css/[name]-chunk', 'css'),
    }),
    // eslint-disable-next-line arrow-body-style
    ...pageList.map((key) => {
      try {
        if (fs.existsSync(path.resolve(`src/html/${key}.pug`))) {
          return createHtmlWebpackPlugin({
            template: `html/${key}.pug`,
            // filename: `${DEV_MODE ? '' : 'App_Data/dist/'}${key}.html`,
            filename: `${key}.html`,
            favicon: 'assets/original/favicon.ico',
            chunks: [key, 'commons', 'vendors'],
          }, { });
          // 第二參數可以傳變數給 pug
        }
        return null;
      } catch (err) {
        return null;
      }
    }).filter((item) => !!item),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new CopyWebpackPlugin([
      { from: 'assets/copy', to: './', ignore: ['.*'] },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ENV: JSON.stringify('client'),
        publicPath: JSON.stringify(publicPath),
        mode: JSON.stringify(mode),
        ...Object.keys(config).reduce((o, key) => {
          const value = config[key];
          o[key] = ['boolean', 'number'].includes(typeof value)
            ? value
            : JSON.stringify(value);
          return o;
        }, {}),
      },
    }),
    new WebpackBar(),
    ...DEV_MODE
      ? [
        new FriendlyErrorsPlugin(),
      ]
      : [
        new webpack.HashedModuleIdsPlugin(),
        new OptimizeCSSAssetsPlugin({}),
      ],
  ],
  /*
    #######  ########  ######## #### ##     ## #### ########    ###    ######## ####  #######  ##    ##
    ##     ## ##     ##    ##     ##  ###   ###  ##       ##    ## ##      ##     ##  ##     ## ###   ##
    ##     ## ##     ##    ##     ##  #### ####  ##      ##    ##   ##     ##     ##  ##     ## ####  ##
    ##     ## ########     ##     ##  ## ### ##  ##     ##    ##     ##    ##     ##  ##     ## ## ## ##
    ##     ## ##           ##     ##  ##     ##  ##    ##     #########    ##     ##  ##     ## ##  ####
    ##     ## ##           ##     ##  ##     ##  ##   ##      ##     ##    ##     ##  ##     ## ##   ###
    #######  ##           ##    #### ##     ## #### ######## ##     ##    ##    ####  #######  ##    ##
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 100,
      minChunks: 1,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: !DEV_MODE ? 'warning' : false,
  },
  externals: {
    // 如果有用到 cdnjs script src jquery 的話，可以把這一段加入
    // jquery: 'jQuery',
  },
  /*
    ########  ######## ##     ##  ######  ######## ########  ##     ## ######## ########
    ##     ## ##       ##     ## ##    ## ##       ##     ## ##     ## ##       ##     ##
    ##     ## ##       ##     ## ##       ##       ##     ## ##     ## ##       ##     ##
    ##     ## ######   ##     ##  ######  ######   ########  ##     ## ######   ########
    ##     ## ##        ##   ##        ## ##       ##   ##    ##   ##  ##       ##   ##
    ##     ## ##         ## ##   ##    ## ##       ##    ##    ## ##   ##       ##    ##
    ########  ########    ###     ######  ######## ##     ##    ###    ######## ##     ##
  */
  devServer: {
    open: `http://localhost:${port}/`,
    before(app, server) {
      app.use('/__open-in-editor', launchEditorMiddleware(null, 'src', () => console.log(
        'To specify an editor, specify the EDITOR env variable or '
        + 'add "editor" field to your Vue project config.\n',
      )));
      if (publicPath !== '/') {
        app.get('/', (req, res) => {
          res.redirect(publicPath); // 直接導向至 publicPath
        });
      }
      // hot reload for html, pug, 如果是開發 vue 專案，chokidar 就可以不用寫
      chokidar.watch('src/html/**/*').on('all', () => {
        server.sockWrite(server.sockets, 'content-changed');
      });
      // 以下都為測試用的 api, 正式站可以拿掉
      app.get('/__healthy', (req, res) => {
        res.json({
          status: 200,
          message: 'I\'m healthy',
        });
      });
      app.get('/api/data', (req, res) => {
        const mockData = [
          {
            name: 'name',
            age: 38,
          },
        ];
        res.json(mockData);
      });
      app.get('/api/formData', (req, res) => {
        res.json({
          status: 'ok',
          data: {
            name: 'name',
            email: 'email@email.com',
            country: '2',
            gender: '1',
            skill: ['Vue', 'React'],
          },
        });
      });
      app.post('/api/formData', (req, res) => {
        res.json({
          status: 'ok',
        });
      });
      app.get('/api/test', (req, res) => {
        // res.redirect('/test_base')
        res.json({
          a: 1,
        });
      });
    },
    historyApiFallback: {
      index: publicPath, // 所有 publicPath 底下的 path 都導向至 publicPath
      rewrites: [
        {
          from: /.*\.html/,
          to: publicPath,
        },
      ],
    },
    noInfo: true,
    port,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      children: false,
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    // proxy: [{
    //   context: ['/upload', '/api', '/Upload'],
    //   // target: 'https://test.com.tw/',
    //   secure: true,
    //   changeOrigin: true,
    // }, {
    //   context: ['/api/test'],
    //   target: 'https://test.test.net/',
    //   secure: true,
    //   changeOrigin: true,
    // }],
  },
};

module.exports = webpackConfig;
