/**
 * format is {
 *   browserName: [versions..]
 *   OR
 *   browserName: {
 *     version: [platforms...]
 *   }
 * }
 * for possibilities
 * https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
 */

module.exports = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
    version: '56'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '51'
  },
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.12',
    version: '10'
  },
  sl_ie_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '14'
  },
};
