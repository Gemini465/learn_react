const crackLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: crackLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};