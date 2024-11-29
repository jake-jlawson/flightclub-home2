import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

// Handle JSON files
rules.push({
  test: /\.json$/,
  type: 'json', // Webpack 5 built-in JSON support
});

// Handle image files
rules.push({
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  type: 'asset/resource', // For file-loader-like behavior
});

// Handle typescript and tsx files
rules.push({
  test: /\.tsx?$/,
  exclude: /(node_modules|\.webpack)/,
  use: [{ loader: 'ts-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
