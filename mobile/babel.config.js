module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            "@components": "./src/Component",
            "@containers": "./src/Containers",
            "@navigation": "./src/Navigation",
            "@utils": "./src/Utils",
            "@pages": "./src/Pages"
          },
        },
      ],
    ],
  };
};
