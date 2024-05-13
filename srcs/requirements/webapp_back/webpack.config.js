const path= require('path');

module.exports = {
    entry: './backend/assets/index.js',
    output: {
        filename: 'index-bundle.js',
        path: path.resolve(__dirname, './backend/static'),
    },
};