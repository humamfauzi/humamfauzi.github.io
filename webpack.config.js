const path = require('path');
module.exports = {
  mode: 'production',
  entry: './scripts/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: 'AncillaryLib',
    libraryTarget: 'window',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        "test": /\.tsx?/,
        "use": 'ts-loader',
        "exclude": /node_modules/,
      }
    ]
  }
}