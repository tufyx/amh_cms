var path = require('path');

module.exports = {  
  entry: path.resolve(__dirname, 'src/scripts/scripts.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
		test: /src\/.+.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
        	presets: ['es2015','react']
    	}
      },
      {
      	test: /\.jsx$/,
      	loaders: ['babel-loader']
      },
      {
      	test: /\.css$/, 
      	loader: "style!css",
      }
    ]
  }
};
