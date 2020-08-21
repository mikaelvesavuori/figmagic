module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  env: {
    test: {
      plugins: [
        'dynamic-import-node',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-modules-commonjs', { spec: true }]
      ]
    }
  }
};
