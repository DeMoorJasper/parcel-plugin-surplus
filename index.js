module.exports = function(bundler) {
  const surplusAsset = require.resolve('./lib/surplus-asset.js');

  bundler.addAssetType('js', surplusAsset);
  bundler.addAssetType('jsx', surplusAsset);
  bundler.addAssetType('es6', surplusAsset);
  bundler.addAssetType('jsm', surplusAsset);
  bundler.addAssetType('mjs', surplusAsset);
};
