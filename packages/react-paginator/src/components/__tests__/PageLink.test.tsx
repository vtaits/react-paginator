import type { ReactElement } from "react";
import { create } from "react-test-engine";
import { expect, test } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { PageLink, PageLinkComponent } from "../PageLink";

function Link(): ReactElement {
	return <div />;
}

const render = create(
	PageLink,
	{
		children: "test",
		isCurrent: true,
		Link,

		innerProps: {
			href: "/test/",
		},

		page: 1,
		rootProps,
	},
	{
		queries: {
			root: {
				component: PageLinkComponent,
			},
		},
	},
);

test("should provide correct props to PageLinkComponent", () => {
	const engine = render({
		children: "test",
		isCurrent: true,

		innerProps: {
			href: "/test/",
		},

		page: 1,
	});

	const props = engine.accessors.root.getProps();

	expect(props.children).toBe("test");
	expect(props.$rootProps).toBe(rootProps);
	expect(props.href).toBe("/test/");
	expect(props.$isCurrent).toBe(true);
	expect(props).toHaveProperty("as", Link);
});
