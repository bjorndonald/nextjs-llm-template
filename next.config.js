const webpack = require("webpack");
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com'
            },
        ],
    },
    // To fix some issues with postgres driver
    webpack: new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
    }),
    env: {
        SERVER_URI: process.env.SERVER_URI
    }
}
