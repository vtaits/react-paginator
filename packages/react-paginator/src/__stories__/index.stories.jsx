import { Paginator } from "../Paginator.js";
import { CustomComponents } from "./CustomComponents.jsx";
import { CustomStyles } from "./CustomStyles.jsx";
import { FewPages } from "./FewPages.jsx";
import { Simple } from "./Simple.jsx";
import { WithLinks } from "./WithLinks.jsx";

/**
 * @import { Meta, StoryObj } from "@storybook/react-vite"
 */

/** @type {Meta<typeof Paginator>} */
const meta = {
	title: "Paginator",
	component: Paginator,
};

export default meta;

/**
 * @typedef {StoryObj<typeof Paginator>} Story
 */

/** @type {Story} */
export const SimpleStory = {
	name: "Simple",
	render: () => <Simple />,
};

/** @type {Story} */
export const WithLinksStory = {
	name: "With links",
	render: () => <WithLinks />,
};

/** @type {Story} */
export const FewPagesStory = {
	name: "Few pages",
	render: () => <FewPages />,
};

/** @type {Story} */
export const CustomStylesStory = {
	name: "Custom styles",
	render: () => <CustomStyles />,
};

/** @type {Story} */
export const CustomComponentsStory = {
	name: "Custom components",
	render: () => <CustomComponents />,
};
