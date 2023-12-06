import { type ReactElement, useDebugValue } from "react";
import { create } from "react-test-engine";
import { expect, test, vi } from "vitest";

import { rootProps } from "../__fixtures__/rootProps";

import { PageLinkGroupWrapper } from "../PageLinkGroupWrapper";
import { PageLinkWrapper } from "../PageLinkWrapper";

import type { PageLinkGroupProps } from "../types";

function Link(): ReactElement {
	return <div />;
}

function PageLink(): ReactElement {
	return <div />;
}

function PageLinkGroup(props: PageLinkGroupProps<unknown>): ReactElement {
	useDebugValue(props);

	return <div />;
}

const render = create(
	PageLinkGroupWrapper,
	{
		Link,
		PageLink,
		PageLinkGroup,
		onPageChange: vi.fn(),
		start: 4,
		end: 10,
		page: 8,
		rootProps,
	},
	{
		queries: {
			pageLinkGroup: {
				component: PageLinkGroup,
			},

			pageLinkWrapper: {
				component: PageLinkWrapper,
			},
		},
	},
);

test("should render PageLinkGroup with correct props", () => {
	const engine = render({
		start: 4,
		end: 10,
	});

	const pageLinkGroupProps = engine.accessors.pageLinkGroup.getProps();

	expect(pageLinkGroupProps.start).toBe(4);
	expect(pageLinkGroupProps.end).toBe(10);
	expect(pageLinkGroupProps.rootProps).toBe(rootProps);
});

test("should render links", () => {
	const onPageChange = vi.fn();
	const hrefBuilder = vi.fn();

	const engine = render({
		onPageChange,
		hrefBuilder,
		start: 4,
		end: 10,
		page: 6,
	});

	const pageLinkNodes = engine.accessors.pageLinkWrapper.getAll();

	expect(pageLinkNodes.length).toBe(7);

	for (let index = 0; index < pageLinkNodes.length; ++index) {
		const pageLinkNode = pageLinkNodes[index];

		const { props: pageLinkProps } = pageLinkNode;

		expect(pageLinkProps.Link).toBe(Link);
		expect(pageLinkProps.PageLink).toBe(PageLink);
		expect(pageLinkProps.onPageChange).toBe(onPageChange);
		expect(pageLinkProps.hrefBuilder).toBe(hrefBuilder);
		expect(pageLinkProps.page).toBe(6);
		expect(pageLinkProps.pageForLink).toBe(4 + index);
		expect(pageLinkProps.rootProps).toBe(rootProps);
	}
});
