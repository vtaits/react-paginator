import { create } from "react-test-engine";
import { expect, test, vi } from "vitest";

import { rootProps } from "../../__fixtures__/rootProps";

import { Link } from "../Link";

const style = {};
const className = "test-class-name";

const render = create(
	Link,
	{
		children: "test",
		rootProps,
		style: {},
	},
	{
		queries: {
			a: {
				component: "a",
			},

			button: {
				component: "button",
			},
		},
	},
);

test("should render disabled button if disabled", () => {
	const engine = render({
		className,
		style,
		disabled: true,
		href: "/test/",
		onClick: vi.fn(),
	});

	const buttonProps = engine.accessors.button.getProps();

	expect(buttonProps.className).toBe(className);
	expect(buttonProps.style).toBe(style);
	expect(buttonProps.disabled).toBe(true);
	expect(buttonProps.type).toBe("button");
	expect(buttonProps).not.toHaveProperty("href");
	expect(buttonProps.onClick).toBeFalsy();
});

test("should render enabled button if href not specified", () => {
	const onClick = vi.fn();

	const engine = render({
		className,
		style,
		onClick,
	});

	const buttonProps = engine.accessors.button.getProps();

	expect(buttonProps.className).toBe(className);
	expect(buttonProps.style).toBe(style);
	expect(buttonProps.disabled).toBeFalsy();
	expect(buttonProps.type).toBe("button");
	expect(buttonProps).not.toHaveProperty("href");
	expect(buttonProps.onClick).toBe(onClick);
});

test("should render link if href specified", () => {
	const onClick = vi.fn();

	const engine = render({
		className,
		style,
		onClick,
		href: "/test/",
	});

	const aProps = engine.accessors.a.getProps();

	expect(aProps.className).toBe(className);
	expect(aProps.style).toBe(style);
	expect(aProps).not.toHaveProperty("disabled");
	expect(aProps.href).toBe("/test/");
	expect(aProps.onClick).toBe(onClick);
});
