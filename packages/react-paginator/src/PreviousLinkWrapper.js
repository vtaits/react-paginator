import { memo } from "react";
import { jsx } from "react/jsx-runtime";

/**
 * @import { ReactNode, SyntheticEvent } from "react"
 * @import { HrefBuilder, LinkComponent, LinkInnerProps, OnPageChange, PreviousLinkComponent, RootProps } from "./types.js"
 */

/**
 * @template Payload
 * @typedef {Object} PreviousLinkWrapperProps
 * @property {LinkComponent<Payload>} Link
 * @property {PreviousLinkComponent<Payload>} PreviousLink
 * @property {OnPageChange} onPageChange
 * @property {HrefBuilder} [hrefBuilder]
 * @property {ReactNode} previousLabel
 * @property {number} page
 * @property {RootProps<Payload>} rootProps
 */

/**
 * @template Payload
 * @param {PreviousLinkWrapperProps<Payload>} props
 */
function PreviousLinkWrapperInner({
	Link,
	PreviousLink,
	onPageChange,
	hrefBuilder = undefined,
	previousLabel,
	page,
	rootProps,
}) {
	const isDisabled = page === 1;

	/**
	 * @param {SyntheticEvent} event
	 */
	const onClick = (event) => {
		event.preventDefault();
		onPageChange(page - 1);
	};

	/** @type {LinkInnerProps} */
	const innerProps = {};

	if (isDisabled) {
		innerProps.disabled = true;
	} else {
		innerProps.onClick = onClick;

		if (hrefBuilder) {
			innerProps.href = hrefBuilder(page - 1);
		}
	}

	return jsx(PreviousLink, {
		Link,
		isDisabled,
		innerProps,
		rootProps,
		children: previousLabel,
	});
}

export const PreviousLinkWrapper =
	/** @type {typeof PreviousLinkWrapperInner} */ (
		memo(PreviousLinkWrapperInner)
	);
