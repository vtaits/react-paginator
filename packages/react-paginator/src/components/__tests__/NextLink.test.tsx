import type { ReactElement } from "react";
import { create } from "react-test-engine";
import { expect, test } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { NextLink, NextLinkComponent } from "../NextLink";

function Link(): ReactElement {
	return <div />;
}

const render = create(
	NextLink,
	{
		Link,
		children: "test",
		isDisabled: true,

		innerProps: {
			href: "/test/",
		},
		rootProps,
	},
	{
		queries: {
			root: {
				component: NextLinkComponent,
			},
		},
	},
);

test("should provide correct props to NextLinkComponent", () => {
	const engine = render({
		Link,
		children: "test",
		isDisabled: true,

		innerProps: {
			href: "/test/",
		},
	});

	const props = engine.accessors.root.getProps();

	expect(props.children).toBe("test");
	expect(props.$rootProps).toBe(rootProps);
	expect(props.href).toBe("/test/");
	expect(props.$isDisabled).toBe(true);
	expect(props.as).toBe(Link);
});
