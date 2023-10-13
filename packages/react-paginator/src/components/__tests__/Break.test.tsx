import { create } from "react-test-engine";
import { expect, test, vi } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { Break, InnerBreak } from "../Break";

const render = create(
	Break,
	{
		previous: 0,
		next: 10,
		onPageChange: vi.fn(),
		Link: vi.fn(),
		rootProps,
	},
	{
		queries: {
			root: {
				component: InnerBreak,
			},
		},
	},
);

test("should provide correct props to BreakComponent", () => {
	const engine = render({
		children: "test",
	});

	expect(engine.accessors.root.getProps().children).toBe("test");
	expect(engine.accessors.root.getProps().$rootProps).toBe(rootProps);
});
