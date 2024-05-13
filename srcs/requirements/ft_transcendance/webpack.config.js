const path= require('path');

module.exports = {
    entry: './ft_transcendance/assets/index.js',
    output: {
        filename: 'index-bundle.js',
        path: path.resolve(__dirname, './ft_transcendance/static'),
    },
};