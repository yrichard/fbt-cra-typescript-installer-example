module.exports = {
  babel: {
    presets: ["@babel/preset-typescript"],
    plugins: [
      [
        "babel-plugin-fbt",
        {
          fbtEnumManifest: require("./.enum_manifest.json"),
          extraOptions: { __self: true },
        },
      ],
      "babel-plugin-fbt-runtime",
    ],
  },
};
