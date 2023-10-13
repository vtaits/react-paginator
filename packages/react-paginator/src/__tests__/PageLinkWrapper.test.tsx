import { type ReactElement, type SyntheticEvent, useDebugValue } from "react";
import { create } from "react-test-engine";
import { expect, test, vi } from "vitest";

import { rootProps } from "../__fixtures__/rootProps";

import { PageLinkWrapper } from "../PageLinkWrapper";

import type { PageLinkProps } from "../types";

function Link(): ReactElement {
	return <div />;
}

function PageLink(props: PageLinkProps<unknown>): ReactElement {
	useDebugValue(props);

	return <div />;
}

const render = create(
	PageLinkWrapper,
	{
		Link,
		PageLink,
		onPageChange: vi.fn(),
		page: 3,
		pageForLink: 5,
		rootProps,
	},
	{
		queries: {
			root: {
				component: PageLink,
			},
		},
	},
);

test("should render children", () => {
	const engine = render({
		pageForLink: 5,
	});

	expect(engine.accessors.root.getProps().children).toBe(5);
});

test("should provide current page", () => {
	const engine = render({
		pageForLink: 5,
	});

	expect(engine.accessors.root.getProps().page).toBe(5);
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
		pageForLink: 10,
	});

	expect(engine.accessors.root.getProps().isCurrent).toBe(false);
	expect(engine.accessors.root.getProps().innerProps.disabled).toBeFalsy();
});

test("should render disabled component", () => {
	const engine = render({
		page: 3,
		pageForLink: 3,
	});

	expect(engine.accessors.root.getProps().isCurrent).toBe(true);
	expect(engine.accessors.root.getProps().innerProps.disabled).toBe(true);
});

test("should set next page on click", () => {
	const preventDefault = vi.fn();
	const onPageChange = vi.fn();

	const engine = render({
		onPageChange,
		page: 3,
		pageForLink: 5,
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
	expect(onPageChange).toHaveBeenCalledWith(5);
});

test("should render disabled component", () => {
	const engine = render({
		page: 3,
		pageForLink: 5,
		hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
	});

	expect(engine.accessors.root.getProps().innerProps.href).toBe("/test/5/");
});
