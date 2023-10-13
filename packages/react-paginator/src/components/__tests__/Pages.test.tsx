import { create } from "react-test-engine";
import { expect, test } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { Pages, PagesComponent } from "../Pages";

const render = create(
	Pages,
	{
		rootProps,
	},
	{
		queries: {
			root: {
				component: PagesComponent,
			},
		},
	},
);

test("should provide correct props to PagesComponent", () => {
	const engine = render({
		children: "test",
	});

	const props = engine.accessors.root.getProps();

	expect(props.children).toBe("test");
	expect(props.$rootProps).toBe(rootProps);
});
