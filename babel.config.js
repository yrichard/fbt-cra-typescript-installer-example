const cracoConfig = require("./craco.config");

module.exports = function (api) {
  api.cache(true);
  return cracoConfig.babel;
};
