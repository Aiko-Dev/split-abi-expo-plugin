# split-abi-expo-plugin

Very basic plugin to control the split abi property of the gradle build in your Expo app configuration without EAS Build. Expo >= 52 and < 54 are supported (tested on Expo SDK 52).

## Install

example with `npm`:

```bash
npm install git+https://github.com/Aiko-Dev/split-abi-expo-plugin.git
```

## Usage

In your `app.config.js` (or .ts), you can configure the plugin:

```js
const config = {
  // rest of your config...

  plugins: [
    [
      "split-abi-expo-plugin",
      {
        // See: https://developer.android.com/build/configure-apk-splits#configure-abi-split
        enable: true // Default: true
        universalApk: true, // Default: false
        include: ["armeabi-v7a", "arm64-v8a", "x86", "x86_64"], // Default: []
      },
    ],
  ]
}
```

