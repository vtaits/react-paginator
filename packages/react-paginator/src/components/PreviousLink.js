import { jsx } from "react/jsx-runtime";
import { getStyle } from "./getStyle.js";

/**
 * @import { PreviousLinkProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {PreviousLinkProps<Payload>} props
 */
export function PreviousLink({
	Link,
	isDisabled,
	rootProps,
	innerProps,
	children,
}) {
	return jsx(Link, {
		...innerProps,
		className: `react-paginator__previous-link ${isDisabled ? "react-paginator__previous-link_disabled" : ""}`,
		style: getStyle(
			"previousLink",

			{
				$isDisabled: isDisabled,
				$rootProps: rootProps,
			},
		),
		children,
	});
}
