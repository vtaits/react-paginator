import type { ComponentProps, FC, ReactElement } from "react";
import { expect, test } from "vitest";

import { createRenderer } from "react-test-renderer/shallow";

import { rootProps } from "../../__fixtures__/rootProps";

import { PageLink, PageLinkComponent } from "../PageLink";

import type { PageLinkProps } from "../../types";

// fix missing `as` prop
type StyledProps = ComponentProps<typeof PageLinkComponent> & {
	as?: string | FC<any>;
};

function Link(): ReactElement {
	return <div />;
}

type PageObject = {
	getPageLinkComponentProp: <Key extends keyof StyledProps>(
		propName: Key,
	) => StyledProps[Key];
};

const setup = (
	props: Omit<PageLinkProps<unknown>, "rootProps" | "Link">,
): PageObject => {
	const renderer = createRenderer();

	renderer.render(<PageLink rootProps={rootProps} Link={Link} {...props} />);

	const result = renderer.getRenderOutput() as ReactElement<StyledProps, FC>;

	return {
		getPageLinkComponentProp: (propName) => result.props[propName],
	};
};

test("should provide correct props to PageLinkComponent", () => {
	const page = setup({
		children: "test",
		isCurrent: true,

		innerProps: {
			href: "/test/",
		},

		page: 1,
	});

	expect(page.getPageLinkComponentProp("children")).toBe("test");
	expect(page.getPageLinkComponentProp("$rootProps")).toBe(rootProps);
	expect(page.getPageLinkComponentProp("href")).toBe("/test/");
	expect(page.getPageLinkComponentProp("$isCurrent")).toBe(true);
	expect(page.getPageLinkComponentProp("as")).toBe(Link);
});
