import { type ReactElement, type SyntheticEvent, useDebugValue } from "react";
import { create } from "react-test-engine";
import { expect, test, vi } from "vitest";

import { rootProps } from "../__fixtures__/rootProps";

import { PreviousLinkWrapper } from "../PreviousLinkWrapper";

import type { PreviousLinkProps } from "../types";

function Link(): ReactElement {
	return <div />;
}

function PreviousLink(props: PreviousLinkProps<unknown>): ReactElement {
	useDebugValue(props);

	return <div />;
}

const render = create(
	PreviousLinkWrapper,
	{
		Link,
		PreviousLink,
		onPageChange: vi.fn(),
		previousLabel: "test",
		page: 3,
		rootProps,
	},
	{
		queries: {
			root: {
				component: PreviousLink,
			},
		},
	},
);

test("should render children", () => {
	const engine = render({
		previousLabel: "prev",
	});

	expect(engine.accessors.root.getProps().children).toBe("prev");
});

test("should provide rootProps", () => {
	const engine = render({});

	expect(engine.accessors.root.getProps().rootProps).toBe(rootProps);
});

test("should provide Link", () => {
	const engine = render({});

	expect(engine.accessors.root.getProps().Link).toBe(Link);
});

test("should render enabled component", () => {
	const engine = render({
		page: 3,
	});

	expect(engine.accessors.root.getProps().isDisabled).toBe(false);
	expect(engine.accessors.root.getProps().innerProps.disabled).toBeFalsy();
});

test("should render disabled component", () => {
	const engine = render({
		page: 1,
	});

	expect(engine.accessors.root.getProps().isDisabled).toBe(true);
	expect(engine.accessors.root.getProps().innerProps.disabled).toBe(true);
});

test("should set previous page on click", () => {
	const preventDefault = vi.fn();
	const onPageChange = vi.fn();

	const engine = render({
		onPageChange,
		page: 3,
	});

	const { onClick } = engine.accessors.root.getProps().innerProps;

	if (!onClick) {
		throw new Error("`onClick` is not defined");
	}

	onClick({
		preventDefault,
	} as unknown as SyntheticEvent<Element, Event>);

	expect(preventDefault).toHaveBeenCalledTimes(1);

	expect(onPageChange).toHaveBeenCalledTimes(1);
	expect(onPageChange).toHaveBeenCalledWith(2);
});

test("should render disabled component", () => {
	const engine = render({
		page: 3,
		hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
	});

	expect(engine.accessors.root.getProps().innerProps.href).toBe("/test/2/");
});
