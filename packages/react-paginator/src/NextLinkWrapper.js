import { memo } from "react";
import { jsx } from "react/jsx-runtime";

/**
 * @import { ReactNode, SyntheticEvent } from "react"
 * @import { HrefBuilder, LinkComponent, LinkInnerProps, NextLinkComponent, OnPageChange, RootProps } from "./types.js"
 */

/**
 * @template Payload
 * @typedef {Object} NextLinkWrapperProps
 * @property {LinkComponent<Payload>} Link
 * @property {NextLinkComponent<Payload>} NextLink
 * @property {OnPageChange} onPageChange
 * @property {HrefBuilder} [hrefBuilder]
 * @property {ReactNode} nextLabel
 * @property {number} page
 * @property {number} pageCount
 * @property {RootProps<Payload>} rootProps
 */

/**
 * @template Payload
 * @param {NextLinkWrapperProps<Payload>} props
 */
function NextLinkWrapperInner({
	Link,
	NextLink,
	onPageChange,
	hrefBuilder = undefined,
	nextLabel,
	page,
	pageCount,
	rootProps,
}) {
	const isDisabled = page === pageCount;

	/**
	 * @param {SyntheticEvent} event
	 */
	const onClick = (event) => {
		event.preventDefault();
		onPageChange(page + 1);
	};

	/** @type {LinkInnerProps} */
	const innerProps = {};

	if (isDisabled) {
		innerProps.disabled = true;
	} else {
		innerProps.onClick = onClick;

		if (hrefBuilder) {
			innerProps.href = hrefBuilder(page + 1);
		}
	}

	return jsx(NextLink, {
		Link,
		isDisabled,
		innerProps,
		rootProps,
		children: nextLabel,
	});
}

export const NextLinkWrapper = /** @type {typeof NextLinkWrapperInner} */ (
	memo(NextLinkWrapperInner)
);
