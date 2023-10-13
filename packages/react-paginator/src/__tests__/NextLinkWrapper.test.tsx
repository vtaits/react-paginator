import { type ReactElement, type SyntheticEvent, useDebugValue } from "react";
import { create } from "react-test-engine";
import { expect, test, vi } from "vitest";

import { rootProps } from "../__fixtures__/rootProps";

import { NextLinkWrapper } from "../NextLinkWrapper";

import type { NextLinkProps } from "../types";

function Link(): ReactElement {
	return <div />;
}

function NextLink(props: NextLinkProps<unknown>): ReactElement {
	useDebugValue(props);

	return <div />;
}

const render = create(
	NextLinkWrapper,
	{
		Link,
		NextLink,
		onPageChange: vi.fn(),
		nextLabel: "test",
		page: 3,
		pageCount: 10,
		rootProps,
	},
	{
		queries: {
			root: {
				component: NextLink,
			},
		},
	},
);

test("should render children", () => {
	const engine = render({
		nextLabel: "next",
	});

	expect(engine.accessors.root.getProps().children).toBe("next");
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
		pageCount: 10,
	});

	expect(engine.accessors.root.getProps().isDisabled).toBe(false);
	expect(engine.accessors.root.getProps().innerProps.disabled).toBeFalsy();
});

test("should render disabled component", () => {
	const engine = render({
		page: 10,
		pageCount: 10,
	});

	expect(engine.accessors.root.getProps().isDisabled).toBe(true);
	expect(engine.accessors.root.getProps().innerProps.disabled).toBe(true);
});

test("should set next page on click", () => {
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
	expect(onPageChange).toHaveBeenCalledWith(4);
});

test("should render disabled component", () => {
	const engine = render({
		page: 3,
		hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
	});

	expect(engine.accessors.root.getProps().innerProps.href).toBe("/test/4/");
});
