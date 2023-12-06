import type { ReactElement } from "react";
import { create } from "react-test-engine";
import { expect, test } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { PreviousLink, PreviousLinkComponent } from "../PreviousLink";

function Link(): ReactElement {
	return <div />;
}

const render = create(
	PreviousLink,
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
				component: PreviousLinkComponent,
			},
		},
	},
);

test("should provide correct props to PreviousLinkComponent", () => {
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
	expect(props).toHaveProperty("as", Link);
});
