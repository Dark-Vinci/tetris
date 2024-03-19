const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/Components'),
      '@containers': path.resolve(__dirname, 'src/Containers'),
      '@startup': path.resolve(__dirname, 'src/Pages'),
    },
  },
};