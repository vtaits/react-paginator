import { create } from "react-test-engine";
import { expect, test } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { Container, InnerContainer } from "../Container";

const render = create(
	Container,
	{
		rootProps,
	},
	{
		queries: {
			root: {
				component: InnerContainer,
			},
		},
	},
);

test("should provide correct props to ContainerComponent", () => {
	const engine = render({
		children: "test",
	});

	expect(engine.accessors.root.getProps().children).toBe("test");
	expect(engine.accessors.root.getProps().$rootProps).toBe(rootProps);
});
