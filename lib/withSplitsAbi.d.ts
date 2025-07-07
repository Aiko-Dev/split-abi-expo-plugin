import { type ConfigPlugin } from "expo/config-plugins";
/**
 * Configuration options for the Split ABI Expo plugin.
 * See: https://developer.android.com/build/configure-apk-splits#configure-abi-split
 * @property reset - Default: true
 * @property enable - Default: true
 * @property universalApk - Default: false
 * @property include - Default: []
 */
export interface PluginConfig {
    reset?: boolean;
    enable?: boolean;
    universalApk?: boolean;
    include?: string[];
}
declare const withSplitsAbi: ConfigPlugin<PluginConfig>;
export default withSplitsAbi;
