import { jsx } from "react/jsx-runtime";
import { getStyle } from "./getStyle.js";

/**
 * @import { PagesProps } from "../types.js"
 */

/**
 * @template Payload
 * @param {PagesProps<Payload>} props
 */

export function Pages({ rootProps, children }) {
	return jsx("div", {
		className: "react-paginator__pages",
		style: getStyle(
			"pages",

			{
				$rootProps: rootProps,
			},
		),
		children,
	});
}
