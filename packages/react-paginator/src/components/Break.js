import { jsx } from "react/jsx-runtime";
import { getStyle } from "./getStyle.js";

/**
 * @import { BreakComponentProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {BreakComponentProps<Payload>} props
 */
export function Break({ rootProps, children }) {
	return jsx("div", {
		className: "react-paginator__break",
		style: getStyle(
			"break",

			{
				$rootProps: rootProps,
			},
		),
		children,
	});
}
