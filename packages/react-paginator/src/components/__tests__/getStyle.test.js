import { expect, test, vi } from "vitest";
import { rootProps } from "../../__fixtures__/rootProps.js";
import { getStyle } from "../getStyle.js";

/**
 * @import { CSSProperties } from "react"
 */

test("should return base state if custom style not defined", () => {
	const result = getStyle("break", {
		$rootProps: {
			...rootProps,
			styles: {
				pageLink: () => ({
					color: "#0000ff",
				}),
			},
		},
	});

	expect(result).toEqual({});
});

test("should return computed style", () => {
	/** @type {CSSProperties} */
	const computedStyle = {
		color: "#00ff00",
	};
	const styleFn = vi.fn().mockReturnValue(computedStyle);

	const componentProps = {
		$rootProps: {
			...rootProps,
			styles: {
				break: styleFn,
			},
		},
	};

	const result = getStyle("break", componentProps);

	expect(styleFn).toHaveBeenCalledTimes(1);
	expect(styleFn).toHaveBeenCalledWith(componentProps);

	expect(result).toBe(computedStyle);
});
