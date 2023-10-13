import type { FC, ReactElement, SyntheticEvent } from "react";
import { expect, test, vi } from "vitest";

import { createRenderer } from "react-test-renderer/shallow";

import { rootProps } from "../__fixtures__/rootProps";

import { NextLinkWrapper } from "../NextLinkWrapper";
import type { NextLinkWrapperProps } from "../NextLinkWrapper";

import type { NextLinkProps } from "../types";

function Link(): ReactElement {
	return <div />;
}

function NextLink(): ReactElement {
	return <div />;
}

type PageObject = {
	getProp: <Key extends keyof NextLinkProps<unknown>,>(
		propName: Key,
	) => NextLinkProps<unknown>[Key];
};

const defaultProps: NextLinkWrapperProps<unknown> = {
	Link,
	NextLink,
	onPageChange: (): void => undefined,
	nextLabel: "test",
	page: 3,
	pageCount: 10,
	rootProps,
};

const setup = (props: Partial<NextLinkWrapperProps<unknown>>): PageObject => {
	const renderer = createRenderer();

	renderer.render(<NextLinkWrapper {...defaultProps} {...props} />);

	const result = renderer.getRenderOutput() as ReactElement<
		NextLinkProps<unknown>,
		FC
	>;

	return {
		getProp: (propName) => result.props[propName],
	};
};

test("should render children", () => {
	const page = setup({
		nextLabel: "next",
	});

	expect(page.getProp("children")).toBe("next");
});

test("should provide rootProps", () => {
	const page = setup({});

	expect(page.getProp("rootProps")).toBe(rootProps);
});

test("should provide Link", () => {
	const page = setup({});

	expect(page.getProp("Link")).toBe(Link);
});

test("should render enabled component", () => {
	const page = setup({
		page: 3,
		pageCount: 10,
	});

	expect(page.getProp("isDisabled")).toBe(false);
	expect(page.getProp("innerProps").disabled).toBeFalsy();
});

test("should render disabled component", () => {
	const page = setup({
		page: 10,
		pageCount: 10,
	});

	expect(page.getProp("isDisabled")).toBe(true);
	expect(page.getProp("innerProps").disabled).toBe(true);
});

test("should set next page on click", () => {
	const preventDefault = vi.fn();
	const onPageChange = vi.fn();

	const page = setup({
		onPageChange,
		page: 3,
	});

	const { onClick } = page.getProp("innerProps");

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
	const page = setup({
		page: 3,
		hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
	});

	expect(page.getProp("innerProps").href).toBe("/test/4/");
});
