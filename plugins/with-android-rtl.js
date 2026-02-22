/**
 * Expo config plugin that adds android:supportsRtl="true"
 * to the <application> tag in AndroidManifest.xml.
 */
const { withAndroidManifest } = require('expo/config-plugins');

function withAndroidRTL(config) {
  return withAndroidManifest(config, (config) => {
    const mainApplication = config.modResults.manifest.application?.[0];
    if (mainApplication) {
      mainApplication.$['android:supportsRtl'] = 'true';
    }
    return config;
  });
}

module.exports = withAndroidRTL;
