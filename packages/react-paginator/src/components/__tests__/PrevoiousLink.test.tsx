import type { ComponentProps, FC, ReactElement } from "react";
import { expect, test } from "vitest";

import { createRenderer } from "react-test-renderer/shallow";

import { rootProps } from "../../__fixtures__/rootProps";

import { PreviousLink, PreviousLinkComponent } from "../PreviousLink";

import type { PreviousLinkProps } from "../../types";

// fix missing `as` prop
type StyledProps = ComponentProps<typeof PreviousLinkComponent> & {
	as?: string | FC<any>;
};

function Link(): ReactElement {
	return <div />;
}

type PageObject = {
	getPreviousLinkComponentProp: <Key extends keyof StyledProps>(
		propName: Key,
	) => StyledProps[Key];
};

const setup = (
	props: Omit<PreviousLinkProps<unknown>, "rootProps">,
): PageObject => {
	const renderer = createRenderer();

	renderer.render(<PreviousLink rootProps={rootProps} {...props} />);

	const result = renderer.getRenderOutput() as ReactElement<StyledProps, FC>;

	return {
		getPreviousLinkComponentProp: (propName) => result.props[propName],
	};
};

test("should provide correct props to PreviousLinkComponent", () => {
	const page = setup({
		Link,
		children: "test",
		isDisabled: true,

		innerProps: {
			href: "/test/",
		},
	});

	expect(page.getPreviousLinkComponentProp("children")).toBe("test");
	expect(page.getPreviousLinkComponentProp("$rootProps")).toBe(rootProps);
	expect(page.getPreviousLinkComponentProp("href")).toBe("/test/");
	expect(page.getPreviousLinkComponentProp("$isDisabled")).toBe(true);
	expect(page.getPreviousLinkComponentProp("as")).toBe(Link);
});
