/**
 * @import { CSSProperties } from "react"
 * @import { Styles, StylesParams } from "../types.js"
 */

/**
 * @template Payload
 * @template {keyof Styles<Payload>} ComponentName
 * @param {ComponentName} componentName
 * @param {StylesParams<Payload>[ComponentName]} componentProps
 */
export function getStyle(componentName, componentProps) {
	const componentStyles = componentProps?.$rootProps?.styles?.[componentName];

	if (!componentStyles) {
		return {};
	}

	return componentStyles(componentProps);
}
