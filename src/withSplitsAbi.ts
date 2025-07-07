import { type ConfigPlugin, withAppBuildGradle } from "expo/config-plugins"

/**
 * Configuration options for the Split ABI Expo plugin.
 * See: https://developer.android.com/build/configure-apk-splits#configure-abi-split
 * @property reset - Default: true
 * @property enable - Default: true
 * @property universalApk - Default: false
 * @property include - Default: []
 */
export interface PluginConfig {
  reset?: boolean
  enable?: boolean
  universalApk?: boolean
  include?: string[]
}

const withSplitsAbi: ConfigPlugin<PluginConfig> = (config, props) => {
  return withAppBuildGradle(config, configMod => {
    let gradleContent = configMod.modResults.contents

    props.enable = props.enable ?? true
    props.reset = props.reset ?? true
    props.universalApk = props.universalApk ?? false
    props.include = props.include ?? []

    const includesList = props.include.map(abi => `"${abi}"`).join(", ")

    const abiSplitsBlock = `
    splits {
        abi {
            reset()
            enable ${props.enable}
            universalApk ${props.universalApk}
            include ${includesList}
        }
    }`

    gradleContent = gradleContent.replace(
      /\n\s*splits\s*\{\s*abi\s*\{[\s\S]*?\}\s*\}\s/g,
      ""
    )

    if (abiSplitsBlock.trim() !== "") {
      gradleContent = gradleContent.replace(
        /android\s*\{/,
        `android {${abiSplitsBlock}\n`
      )
    }

    configMod.modResults.contents = gradleContent
    return configMod
  })
}

export default withSplitsAbi
