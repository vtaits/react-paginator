import { create } from "react-test-engine";
import { expect, test } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { PageLinkGroup, PageLinkGroupComponent } from "../PageLinkGroup";

const render = create(
	PageLinkGroup,
	{
		start: 0,
		end: 1,
		rootProps,
	},
	{
		queries: {
			root: {
				component: PageLinkGroupComponent,
			},
		},
	},
);
test("should provide correct props to PageLinkGroupComponent", () => {
	const engine = render({
		children: "test",
		start: 0,
		end: 1,
	});

	const props = engine.accessors.root.getProps();

	expect(props.children).toBe("test");
	expect(props.$rootProps).toBe(rootProps);
});
