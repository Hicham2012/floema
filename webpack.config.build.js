const webpack = require('webpack')

const copyWebpackPlugin = require('copy-webpack-plugin')
const miniCSSExtractPlugin = require('mini-css-extract-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'