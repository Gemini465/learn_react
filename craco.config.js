const crackLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: crackLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#5872da' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    devtool: {
        open: false
    }
};