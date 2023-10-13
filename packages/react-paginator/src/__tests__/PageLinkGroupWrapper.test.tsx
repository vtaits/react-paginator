import type { FC, ReactElement } from "react";
import { expect, test, vi } from "vitest";

import { createRenderer } from "react-test-renderer/shallow";

import { rootProps } from "../__fixtures__/rootProps";

import { PageLinkGroupWrapper } from "../PageLinkGroupWrapper";
import type { PageLinkWrapperProps } from "../PageLinkWrapper";

import type { PageLinkGroupProps } from "../types";

function Link(): ReactElement {
	return <div />;
}

function PageLink(): ReactElement {
	return <div />;
}

function PageLinkGroup(): ReactElement {
	return <div />;
}

type PageObject = {
	getPageLinkGroupProps: () => PageLinkGroupProps<unknown>;
	getPageLinks: () => Array<ReactElement<PageLinkWrapperProps<unknown>, FC>>;
};

const defaultProps = {
	Link,
	PageLink,
	PageLinkGroup,
	onPageChange: (): void => undefined,
	start: 4,
	end: 10,
	page: 8,
	rootProps,
};

const setup = (props: Record<string, any>): PageObject => {
	const renderer = createRenderer();

	renderer.render(<PageLinkGroupWrapper {...defaultProps} {...props} />);

	const result = renderer.getRenderOutput() as ReactElement<
		PageLinkGroupProps<unknown>,
		FC
	>;

	const getPageLinkGroupProps = () => result.props;

	const getPageLinks = () =>
		getPageLinkGroupProps().children as Array<
			ReactElement<PageLinkWrapperProps<unknown>, FC>
		>;

	return {
		getPageLinkGroupProps,
		getPageLinks,
	};
};

test("should render PageLinkGroup with correct props", () => {
	const page = setup({
		start: 4,
		end: 10,
	});

	const pageLinkGroupProps = page.getPageLinkGroupProps();

	expect(pageLinkGroupProps.start).toBe(4);
	expect(pageLinkGroupProps.end).toBe(10);
	expect(pageLinkGroupProps.rootProps).toBe(rootProps);
});

test("should render links", () => {
	const onPageChange = vi.fn();
	const hrefBuilder = vi.fn();

	const page = setup({
		onPageChange,
		hrefBuilder,
		start: 4,
		end: 10,
		page: 6,
	});

	const pageLinkNodes = page.getPageLinks();

	expect(pageLinkNodes.length).toBe(7);
	pageLinkNodes.forEach((pageLinkNode, index) => {
		const { props: pageLinkProps } = pageLinkNode;

		expect(pageLinkProps.Link).toBe(Link);
		expect(pageLinkProps.PageLink).toBe(PageLink);
		expect(pageLinkProps.onPageChange).toBe(onPageChange);
		expect(pageLinkProps.hrefBuilder).toBe(hrefBuilder);
		expect(pageLinkProps.page).toBe(6);
		expect(pageLinkProps.pageForLink).toBe(4 + index);
		expect(pageLinkProps.rootProps).toBe(rootProps);
	});
});
