import type { ReactElement } from "react";

import styled from "styled-components";
import type { NextLinkProps, StylingNextLinkComponentProps } from "../types";
import { getStyle } from "./getStyle";

export const NextLinkComponent = styled.a<StylingNextLinkComponentProps<any>>(
	(props) => {
		const { $isDisabled } = props;

		return getStyle(
			"nextLink",

			{
				boxSizing: "border-box",
				borderWidth: 0,
				fontFamily:
					"Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif",
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "20px",
				padding: "7px 0",
				textDecoration: "none",
				outline: "none",
				minWidth: "40px",
				textAlign: "center",
				cursor: $isDisabled ? "default" : "pointer",
				backgroundColor: "transparent",
				color: $isDisabled ? "#999" : "#466db5",
				paddingLeft: "10px",
			},

			props,
		);
	},
);

export function NextLink<Payload>({
	Link,
	isDisabled,
	rootProps,
	innerProps,
	children,
}: NextLinkProps<Payload>): ReactElement {
	return (
		<NextLinkComponent
			as={Link}
			{...innerProps}
			$isDisabled={isDisabled}
			$rootProps={rootProps}
			rootProps={rootProps}
		>
			{children}
		</NextLinkComponent>
	);
}
