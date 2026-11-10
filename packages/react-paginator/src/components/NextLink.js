import { jsx } from "react/jsx-runtime";
import { getStyle } from "./getStyle.js";

/**
 * @import { NextLinkProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {NextLinkProps<Payload>} props
 */
export function NextLink({
	Link,
	isDisabled,
	rootProps,
	innerProps,
	children,
}) {
	return jsx(Link, {
		...innerProps,
		className: `react-paginator__next-link ${isDisabled ? "react-paginator__next-link_disabled" : ""}`,
		style: getStyle(
			"nextLink",

			{
				$isDisabled: isDisabled,
				$rootProps: rootProps,
			},
		),
		children,
	});
}
