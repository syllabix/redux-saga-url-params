var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

require('dotenv').config({silent: true});
var nonce = new Date().getTime();
var cssExtractor = new ExtractTextWebpackPlugin(`"${process.env.APP_NAME || 'app'}.css?_=${nonce}"`);

const dev = {
  entry: {
     js: ['babel-polyfill','./src/app.jsx']
  },
  output: {
    publicPath: '/',
    path: __dirname + '/public',
    filename: 'js/app.development.js?_=' + nonce
  },
  devtool: 'source-map',
  module: {
    rules: [
        {
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['eslint-loader'],
        },
        {    // CSS/Sass loader config
            test: /\.s?css$/,
            use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
        },
        {    // ES6 loader config
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components|imports.scss)/,
            use: ['babel-loader']
        },
        {   // Import fonts
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            use: ['file-loader?name=[name].[ext]']
        }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
        new HtmlWebpackPlugin({
            title: 'Dev Build',
            template: './public/index.html'
        }),
        new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            'process.env.ASSET_ROOT': `"${process.env.ASSET_ROOT}"`
		})
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            // Proxy the url /api to an external API.  This way you don't have to install the server on your computer and can get coding faster.
            '/api': {
                target: process.env.API_HOST,
                xfwd: true,
                changeOrigin: true
            }
        }
    }
};



const build = {
  entry: {
     js: ['babel-polyfill','./src/app.jsx']
  },
  output: {
    publicPath: (process.env.APP_ROOT || ''),
    path: __dirname + '/public',
    filename: `"${process.env.APP_NAME || 'app'}.min.js?_="${nonce}`
  },
  module: {
    rules: [
        {
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['eslint-loader'],
        },
        {    // CSS/Sass loader config
            test: /\.s?css$/,
            use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!sass-loader",
            })
        },
        {    // ES6 loader config
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components|imports.scss)/,
            use: ['babel-loader']
        },
        {   // Import fonts
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            use: ['file-loader?name=[name].[ext]']
        }
    ]
  },
  resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'process.env.ASSET_ROOT': `"${process.env.ASSET_ROOT}"`
		}),
        new CleanWebpackPlugin(['public']),
        cssExtractor,
        new webpack.optimize.UglifyJsPlugin({
            mangle: true, //note: this is has potential negative side effects, used in this context as it can reduce production build size
            compress: {
                warnings: false, // Suppress uglification warnings
                unsafe: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};


/*
SELECT WHICH CONFIG TO USE
*/
switch (process.env.npm_lifecycle_event) {
    case 'build':
    module.exports = build;
    break;
    default:
    module.exports = dev;
    break;
}