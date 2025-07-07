"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
const withSplitsAbi = (config, props) => {
    return (0, config_plugins_1.withAppBuildGradle)(config, configMod => {
        let gradleContent = configMod.modResults.contents;
        props.enable = props.enable ?? true;
        props.reset = props.reset ?? true;
        props.universalApk = props.universalApk ?? false;
        props.include = props.include ?? [];
        const includesList = props.include.map(abi => `"${abi}"`).join(", ");
        const abiSplitsBlock = `
    splits {
        abi {
            reset()
            enable ${props.enable}
            universalApk ${props.universalApk}
            include ${includesList}
        }
    }`;
        gradleContent = gradleContent.replace(/\n\s*splits\s*\{\s*abi\s*\{[\s\S]*?\}\s*\}\s/g, "");
        if (abiSplitsBlock.trim() !== "") {
            gradleContent = gradleContent.replace(/android\s*\{/, `android {${abiSplitsBlock}\n`);
        }
        configMod.modResults.contents = gradleContent;
        return configMod;
    });
};
exports.default = withSplitsAbi;
