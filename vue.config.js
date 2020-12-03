const path = require('path');
const version = require('./node_modules/vue/package.json').version[0];
const entryFile = version === '3' ? 'main3.js' : 'main.js';

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, '/packages/vue/demo/vue/src')
            }
        },
        entry: {
            app: path.join(__dirname, '/packages/vue/demo/vue/src', entryFile)
        }
    }
};
