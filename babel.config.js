module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: [
          "react-native-paper/babel",
          ["module:react-native-dotenv",
          {
            moduleName: "@env",
            path: ".env",
            blacklist: null,
            whitelist: null,
            safe: false,
            allowUndefined: true,
          }],
        ],
      },
    },
    plugins: ["react-native-reanimated/plugin"],
  };
};
