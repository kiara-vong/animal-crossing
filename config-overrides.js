// .vert shaders (src/Rocks.js, src/Bushes.js) are imported as plain URLs and
// fetched as raw text at runtime by PatchShaderMaterial in utils.js. It
// only works if the import resolves to a file URL, which is exactly what
// webpack 5's default asset/resource handling already does for unrecognized
// extensions, with no custom loader needed. An earlier version of this file
// tried to wire up webpack-glsl-loader here, but that loader inlines the
// shader source as a CommonJS module string. fetch() would receive
// "module.exports = ..." instead of GLSL, silently breaking the shader.
module.exports = function override(config, env) {
  return config;
};
