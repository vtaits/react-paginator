import { memo } from "react";
import { jsx } from "react/jsx-runtime";

/**
 * @import { SyntheticEvent } from "react"
 * @import { HrefBuilder, LinkComponent, LinkInnerProps, OnPageChange, PageLinkComponent, RootProps } from "./types.js"
 */

/**
 * @template Payload
 * @typedef {Object} PageLinkWrapperProps
 * @property {LinkComponent<Payload>} Link
 * @property {PageLinkComponent<Payload>} PageLink
 * @property {OnPageChange} onPageChange
 * @property {HrefBuilder} [hrefBuilder]
 * @property {number} page
 * @property {number} pageForLink
 * @property {RootProps<Payload>} rootProps
 */

/**
 * @template Payload
 * @param {PageLinkWrapperProps<Payload>} props
 */
function PageLinkWrapperInner({
	Link,
	PageLink,
	onPageChange,
	hrefBuilder = undefined,
	page,
	pageForLink,
	rootProps,
}) {
	const isCurrent = page === pageForLink;

	/**
	 * @param {SyntheticEvent} event
	 */
	const onClick = (event) => {
		event.preventDefault();
		onPageChange(pageForLink);
	};

	/** @type {LinkInnerProps} */
	const innerProps = {};

	if (isCurrent) {
		innerProps.disabled = true;
	} else {
		innerProps.onClick = onClick;

		if (hrefBuilder) {
			innerProps.href = hrefBuilder(pageForLink);
		}
	}

	return jsx(PageLink, {
		Link,
		isCurrent,
		innerProps,
		rootProps,
		page: pageForLink,
		children: pageForLink,
	});
}

export const PageLinkWrapper = /** @type {typeof PageLinkWrapperInner} */ (
	memo(PageLinkWrapperInner)
);
