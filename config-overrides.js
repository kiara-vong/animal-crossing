module.exports = function override(config, env) {

  config.module.rules.push({
    test: /\.(glsl|vert|frag)$/,
    loader: 'webpack-glsl-loader'
  });

  return config;
};
