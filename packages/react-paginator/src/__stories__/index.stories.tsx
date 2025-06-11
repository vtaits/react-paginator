import type { Meta, StoryObj } from "@storybook/react-vite";

import { Paginator } from "../Paginator";

import { CustomComponents } from "./CustomComponents";
import { CustomStyles } from "./CustomStyles";
import { FewPages } from "./FewPages";
import { Simple } from "./Simple";
import { WithLinks } from "./WithLinks";

const meta: Meta<typeof Paginator> = {
	title: "Paginator",
	component: Paginator,
};

export default meta;
type Story = StoryObj<typeof Paginator>;

export const SimpleStory: Story = {
	name: "Simple",
	render: () => <Simple />,
};

export const WithLinksStory: Story = {
	name: "With links",
	render: () => <WithLinks />,
};

export const FewPagesStory: Story = {
	name: "Few pages",
	render: () => <FewPages />,
};

export const CustomStylesStory: Story = {
	name: "Custom styles",
	render: () => <CustomStyles />,
};

export const CustomComponentsStory: Story = {
	name: "Custom components",
	render: () => <CustomComponents />,
};
