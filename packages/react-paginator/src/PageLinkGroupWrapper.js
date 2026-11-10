import { memo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { PageLinkWrapper } from "./PageLinkWrapper.js";

/**
 * @import { ReactNode } from "react"
 * @import { HrefBuilder, LinkComponent, OnPageChange, PageLinkComponent, PageLinkGroupComponent, RootProps } from "./types.js"
 */

/**
 * @template Payload
 * @typedef {Object} PageLinkGroupWrapperProps
 * @property {LinkComponent<Payload>} Link
 * @property {PageLinkComponent<Payload>} PageLink
 * @property {PageLinkGroupComponent<Payload>} PageLinkGroup
 * @property {number} start
 * @property {number} end
 * @property {OnPageChange} onPageChange
 * @property {HrefBuilder} [hrefBuilder]
 * @property {number} page
 * @property {RootProps<Payload>} rootProps
 */

/**
 * @template Payload
 * @param {PageLinkGroupWrapperProps<Payload>} props
 */
function PageLinkGroupWrapperInner({
	Link,
	PageLink,
	PageLinkGroup,
	start,
	end,
	onPageChange,
	hrefBuilder = undefined,
	page,
	rootProps,
}) {
	/** @type {ReactNode[]} */
	const renderedPages = [];
	for (let pageForLink = start; pageForLink <= end; ++pageForLink) {
		renderedPages.push(
			jsx(
				PageLinkWrapper,
				{
					Link,
					PageLink,
					onPageChange,
					hrefBuilder,
					page,
					pageForLink,
					rootProps,
				},
				pageForLink,
			),
		);
	}

	return jsxs(PageLinkGroup, {
		start,
		end,
		rootProps,
		children: renderedPages,
	});
}

export const PageLinkGroupWrapper =
	/** @type {typeof PageLinkGroupWrapperInner} */ (
		memo(PageLinkGroupWrapperInner)
	);
