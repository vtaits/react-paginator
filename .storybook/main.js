/**
 * @import { StorybookConfig } from "@storybook/react-vite"
 */

/** @type {StorybookConfig} */
const config = {
	stories: ["../packages/**/*.stories.@(js|jsx|ts|tsx)"],
	framework: "@storybook/react-vite",
};

export default config;
