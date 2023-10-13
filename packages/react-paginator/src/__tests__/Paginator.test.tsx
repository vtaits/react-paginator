import type { FC, ReactElement } from "react";
import { create } from "react-test-engine";
import { expect, test, vi } from "vitest";

import { components } from "../components";

import { NextLinkWrapper } from "../NextLinkWrapper";
import { PageLinkGroupWrapper } from "../PageLinkGroupWrapper";
import type { PageLinkGroupWrapperProps } from "../PageLinkGroupWrapper";
import { PreviousLinkWrapper } from "../PreviousLinkWrapper";

import { BREAK, PAGES } from "../constants";

import { Paginator } from "../Paginator";

import type { BreakComponentProps, GetPages } from "../types";

const render = create(
	Paginator,
	{
		pageCount: 10,
		page: 3,
		onPageChange: vi.fn(),
	},
	{
		queries: {
			container: {
				component: components.Container,
			},

			previousLink: {
				component: PreviousLinkWrapper,
			},

			nextLink: {
				component: NextLinkWrapper,
			},

			pagesWrapper: {
				component: components.Pages,
			},
		},
	},
);

function getRenderedPages(engine: ReturnType<typeof render>) {
	return engine.accessors.pagesWrapper.getProps().children as ReactElement[];
}

test("should render default container", () => {
	const engine = render({});

	expect(engine.accessors.container.getProps().rootProps).toBeTruthy();
});

test("should render redefined container", () => {
	function TestComponent(): ReactElement {
		return <div />;
	}

	const engine = render({
		components: {
			Container: TestComponent,
		},
	});

	const containerNode = engine.root;

	expect(containerNode?.type).toBe(TestComponent);
	expect(containerNode?.props.rootProps).toBeTruthy();
});

test("should render PreviousLinkWrapper with default props", () => {
	const onPageChange = vi.fn();

	const engine = render({
		onPageChange,
	});

	const previousLinkProps = engine.accessors.previousLink.getProps();

	expect(previousLinkProps.Link).toBe(components.Link);
	expect(previousLinkProps.PreviousLink).toBe(components.PreviousLink);
	expect(previousLinkProps.onPageChange).toBe(onPageChange);
	expect(previousLinkProps.hrefBuilder).toBeFalsy();
	expect(previousLinkProps.previousLabel).toBe("prev");
	expect(previousLinkProps.page).toBe(3);
	expect(previousLinkProps.rootProps).toBeTruthy();
});

test("should render PreviousLinkWrapper with redefined components", () => {
	const onPageChange = vi.fn();
	const hrefBuilder = vi.fn();

	function Link(): ReactElement {
		return <div />;
	}

	function PreviousLink(): ReactElement {
		return <div />;
	}

	const engine = render({
		onPageChange,
		hrefBuilder,

		components: {
			Link,
			PreviousLink,
		},

		previousLabel: "previous",
	});

	const previousLinkProps = engine.accessors.previousLink.getProps();

	expect(previousLinkProps.Link).toBe(Link);
	expect(previousLinkProps.PreviousLink).toBe(PreviousLink);
	expect(previousLinkProps.onPageChange).toBe(onPageChange);
	expect(previousLinkProps.hrefBuilder).toBe(hrefBuilder);
	expect(previousLinkProps.previousLabel).toBe("previous");
	expect(previousLinkProps.page).toBe(3);
	expect(previousLinkProps.rootProps).toBeTruthy();
});

test("should render NextLinkWrapper with default props", () => {
	const onPageChange = vi.fn();

	const engine = render({
		onPageChange,
	});

	const nextLinkProps = engine.accessors.nextLink.getProps();

	expect(nextLinkProps.Link).toBe(components.Link);
	expect(nextLinkProps.NextLink).toBe(components.NextLink);
	expect(nextLinkProps.onPageChange).toBe(onPageChange);
	expect(nextLinkProps.hrefBuilder).toBeFalsy();
	expect(nextLinkProps.nextLabel).toBe("next");
	expect(nextLinkProps.page).toBe(3);
	expect(nextLinkProps.rootProps).toBeTruthy();
});

test("should render NextLinkWrapper with redefined components", () => {
	const onPageChange = vi.fn();
	const hrefBuilder = vi.fn();

	function Link(): ReactElement {
		return <div />;
	}

	function NextLink(): ReactElement {
		return <div />;
	}

	const engine = render({
		onPageChange,
		hrefBuilder,

		components: {
			Link,
			NextLink,
		},

		nextLabel: "nextLabel",
	});

	const nextLinkProps = engine.accessors.nextLink.getProps();

	expect(nextLinkProps.Link).toBe(Link);
	expect(nextLinkProps.NextLink).toBe(NextLink);
	expect(nextLinkProps.onPageChange).toBe(onPageChange);
	expect(nextLinkProps.hrefBuilder).toBe(hrefBuilder);
	expect(nextLinkProps.nextLabel).toBe("nextLabel");
	expect(nextLinkProps.page).toBe(3);
	expect(nextLinkProps.rootProps).toBeTruthy();
});

test("should render Break with default props", () => {
	const onPageChange = vi.fn();

	const getPages: GetPages = () => [
		{
			type: BREAK,
			previous: 4,
			next: 8,
		},
	];

	const engine = render({
		onPageChange,
		getPages,
	});

	const breakNode = getRenderedPages(engine)[0] as ReactElement<
		BreakComponentProps<unknown>,
		FC
	>;

	expect(breakNode.type).toBe(components.Break);

	expect(breakNode.props.previous).toBe(4);
	expect(breakNode.props.next).toBe(8);
	expect(breakNode.props.Link).toBe(components.Link);
	expect(breakNode.props.onPageChange).toBe(onPageChange);
	expect(breakNode.props.hrefBuilder).toBeFalsy();
	expect(breakNode.props.rootProps).toBeTruthy();
});

test("should render Break with redefined props", () => {
	const onPageChange = vi.fn();
	const hrefBuilder = vi.fn();

	function Break(): ReactElement {
		return <div />;
	}

	function Link(): ReactElement {
		return <div />;
	}

	const getPages: GetPages = () => [
		{
			type: BREAK,
			previous: 4,
			next: 8,
		},
	];

	const engine = render({
		onPageChange,
		hrefBuilder,
		getPages,

		components: {
			Break,
			Link,
		},
	});

	const breakNode = getRenderedPages(engine)[0] as ReactElement<
		BreakComponentProps<unknown>,
		FC
	>;

	expect(breakNode.type).toBe(Break);

	expect(breakNode.props.previous).toBe(4);
	expect(breakNode.props.next).toBe(8);
	expect(breakNode.props.Link).toBe(Link);
	expect(breakNode.props.onPageChange).toBe(onPageChange);
	expect(breakNode.props.hrefBuilder).toBe(hrefBuilder);
	expect(breakNode.props.rootProps).toBeTruthy();
});

test("should render PageLinkGroupWrapper with default props", () => {
	const onPageChange = vi.fn();

	const getPages: GetPages = () => [
		{
			type: PAGES,
			start: 4,
			end: 8,
		},
	];

	const engine = render({
		onPageChange,
		getPages,
	});

	const groupWrapperNode = getRenderedPages(engine)[0] as ReactElement<
		PageLinkGroupWrapperProps<unknown>,
		FC
	>;

	expect(groupWrapperNode.type).toBe(PageLinkGroupWrapper);

	expect(groupWrapperNode.props.start).toBe(4);
	expect(groupWrapperNode.props.end).toBe(8);
	expect(groupWrapperNode.props.page).toBe(3);
	expect(groupWrapperNode.props.Link).toBe(components.Link);
	expect(groupWrapperNode.props.PageLink).toBe(components.PageLink);
	expect(groupWrapperNode.props.PageLinkGroup).toBe(components.PageLinkGroup);
	expect(groupWrapperNode.props.onPageChange).toBe(onPageChange);
	expect(groupWrapperNode.props.hrefBuilder).toBeFalsy();
	expect(groupWrapperNode.props.rootProps).toBeTruthy();
});

test("should render PageLinkGroupWrapper with redefined props", () => {
	const onPageChange = vi.fn();
	const hrefBuilder = vi.fn();

	const getPages: GetPages = () => [
		{
			type: PAGES,
			start: 4,
			end: 8,
		},
	];

	function Link(): ReactElement {
		return <div />;
	}

	function PageLink(): ReactElement {
		return <div />;
	}

	function PageLinkGroup(): ReactElement {
		return <div />;
	}

	const engine = render({
		onPageChange,
		hrefBuilder,
		getPages,

		components: {
			Link,
			PageLink,
			PageLinkGroup,
		},
	});

	const groupWrapperNode = getRenderedPages(engine)[0] as ReactElement<
		PageLinkGroupWrapperProps<unknown>,
		FC
	>;

	expect(groupWrapperNode.type).toBe(PageLinkGroupWrapper);

	expect(groupWrapperNode.props.start).toBe(4);
	expect(groupWrapperNode.props.end).toBe(8);
	expect(groupWrapperNode.props.page).toBe(3);
	expect(groupWrapperNode.props.Link).toBe(Link);
	expect(groupWrapperNode.props.PageLink).toBe(PageLink);
	expect(groupWrapperNode.props.PageLinkGroup).toBe(PageLinkGroup);
	expect(groupWrapperNode.props.onPageChange).toBe(onPageChange);
	expect(groupWrapperNode.props.hrefBuilder).toBe(hrefBuilder);
	expect(groupWrapperNode.props.rootProps).toBeTruthy();
});

test("should render multiple page groups and breaks", () => {
	const onPageChange = vi.fn();

	const getPages: GetPages = () => [
		{
			type: PAGES,
			start: 4,
			end: 8,
		},

		{
			type: BREAK,
			previous: 8,
			next: 11,
		},

		{
			type: PAGES,
			start: 11,
			end: 16,
		},
	];

	const engine = render({
		onPageChange,
		getPages,
	});

	const renderedPages = getRenderedPages(engine);

	expect(renderedPages.length).toBe(3);

	expect(renderedPages[0].type).toBe(PageLinkGroupWrapper);
	expect(renderedPages[1].type).toBe(components.Break);
	expect(renderedPages[2].type).toBe(PageLinkGroupWrapper);
});
